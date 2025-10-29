// Final robust script.js for Smart Face Attendance System
// Single-init guard + model loading + camera + register + recognition + CSV
if (window.__SMART_FA_LOADED) {
  console.warn("Smart Face Attendance script already initialized. Skipping re-init.");
} else {
  window.__SMART_FA_LOADED = true;

  (function () {
    "use strict";

    // Storage keys
    const STUDENTS_KEY = "smartfa_students_v1";
    const ATT_KEY = "smartfa_attendance_v1";

    // State
    let labeledDescriptors = []; // { label, descriptors: [Array], photo, roll, name }
    let attendanceRecords = [];  // { roll, name, date, time }
    let faceMatcher = null;
    let scanningInterval = null;

    // DOM refs (set after DOMContentLoaded)
    let video, overlay, ctx, statusEl, studentListEl, attendanceListEl;

    // Utility
    function setStatus(msg) {
      if (statusEl) statusEl.innerText = msg;
      console.log("[STATUS]", msg);
    }
    function escapeCsv(v) { return `"${(v + "").replace(/"/g, '""')}"`; }

    // Init after DOM ready
    document.addEventListener("DOMContentLoaded", () => {
      video = document.getElementById("videoInput");
      overlay = document.getElementById("overlay");
      ctx = overlay && overlay.getContext ? overlay.getContext("2d") : null;
      statusEl = document.getElementById("status");
      studentListEl = document.getElementById("studentList");
      attendanceListEl = document.getElementById("attendanceList");

      // Button wiring
      const registerBtn = document.getElementById("registerBtn");
      const startBtn = document.getElementById("startBtn");
      const downloadCsvBtn = document.getElementById("downloadCsvBtn");
      if (registerBtn) registerBtn.addEventListener("click", onRegisterClick);
      if (startBtn) startBtn.addEventListener("click", onStartClick);
      if (downloadCsvBtn) downloadCsvBtn.addEventListener("click", onDownloadCsv);

      // Check faceapi loaded
      if (typeof faceapi === "undefined") {
        setStatus("Error: face-api.js not loaded. Include CDN before script.js.");
        console.error("faceapi is not defined. Ensure CDN script tag is present.");
        return;
      }

      // Load models then start camera
      loadModelsAndStart();
    });

    // Load models
    async function loadModelsAndStart() {
      setStatus("Loading face-api models...");
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("models"),
        ]);
        setStatus("Models loaded ✅");
        loadStudentsFromStorage();
        loadAttendanceFromStorage();
        await startCamera();
      } catch (err) {
        console.error("Model load error:", err);
        setStatus("Error loading models. Check models/ folder and DevTools (Network).");
      }
    }
    // Real-time Clock
setInterval(() => {
  const clock = document.getElementById("clock");
  if (clock) clock.innerText = new Date().toLocaleString();
}, 1000);

    // Start camera
    async function startCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setStatus("Camera not supported.");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (!video) { setStatus("Missing video element."); return; }
        video.srcObject = stream;
        try { await video.play(); } catch (e) { console.warn("video.play() problem", e); }
        video.addEventListener("loadedmetadata", () => {
          if (overlay) {
            overlay.width = video.videoWidth || 640;
            overlay.height = video.videoHeight || 480;
          }
          setStatus("Camera ready ✅");
          requestAnimationFrame(drawLoop);
        });
      } catch (err) {
        console.error("Camera error:", err);
        setStatus("Camera access denied or not found. Allow camera & refresh.");
        alert("Camera access required. Allow camera permission in the browser and refresh.");
      }
    }

    function drawLoop() {
      if (ctx && overlay) ctx.clearRect(0, 0, overlay.width, overlay.height);
      requestAnimationFrame(drawLoop);
    }

    function takeSnapshotDataURL() {
      if (!video) return "";
      const tmp = document.createElement("canvas");
      tmp.width = video.videoWidth || 640;
      tmp.height = video.videoHeight || 480;
      const tctx = tmp.getContext("2d");
      tctx.drawImage(video, 0, 0, tmp.width, tmp.height);
      const thumb = document.createElement("canvas");
      const size = 128;
      thumb.width = size; thumb.height = size;
      const th = thumb.getContext("2d");
      th.drawImage(tmp, 0, 0, tmp.width, tmp.height, 0, 0, size, size);
      return thumb.toDataURL("image/jpeg", 0.8);
    }

    // Register
    async function onRegisterClick() {
      const nameInp = document.getElementById("studentName");
      const rollInp = document.getElementById("studentRoll");
      const name = nameInp ? nameInp.value.trim() : "";
      const roll = rollInp ? rollInp.value.trim() : "";
      if (!name || !roll) { alert("Enter both name and roll number."); return; }

      setStatus("Detecting face for registration...");
      try {
        const detection = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.45 }))
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!detection) { setStatus("No face detected. Center your face & try again."); return; }

        const descriptor = detection.descriptor;
        const photo = takeSnapshotDataURL();
        const label = `${roll} | ${name}`;

        labeledDescriptors.push({
          label,
          descriptors: [Array.from(descriptor)],
          photo,
          roll,
          name,
        });

        saveStudentsToStorage();
        renderStudentList();
        if (nameInp) nameInp.value = "";
        if (rollInp) rollInp.value = "";
        setStatus(`Registered ${name} (${roll}) ✅`);
      } catch (err) {
        console.error("Registration error:", err);
        setStatus("Error during face detection. See console.");
      }
    }

    // Start scanning
    async function onStartClick() {
      if (!labeledDescriptors || labeledDescriptors.length === 0) {
        return alert("No registered students. Register at least one face.");
      }

      try {
        const labeled = labeledDescriptors.map((s) =>
          new faceapi.LabeledFaceDescriptors(s.label, s.descriptors.map((d) => new Float32Array(d)))
        );
        faceMatcher = new faceapi.FaceMatcher(labeled, 0.6);
      } catch (err) {
        console.error("Error creating FaceMatcher:", err);
        setStatus("Error preparing recognizer. See console.");
        return;
      }

      setStatus("Scanning for faces...");
      if (scanningInterval) clearInterval(scanningInterval);

      scanningInterval = setInterval(async () => {
        try {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.45 }))
            .withFaceLandmarks()
            .withFaceDescriptors();

          if (ctx && overlay) ctx.clearRect(0, 0, overlay.width, overlay.height);

          detections.forEach((det) => {
            const box = det.detection.box;
            if (ctx) {
              ctx.strokeStyle = "#2b7be4";
              ctx.lineWidth = 2;
              ctx.strokeRect(box.x, box.y, box.width, box.height);
            }
            const best = faceMatcher.findBestMatch(det.descriptor);
            const display = best.label === "unknown" ? "Unknown" : best.label;
            if (ctx) {
              ctx.fillStyle = "#2b7be4";
              ctx.font = "14px sans-serif";
              ctx.fillText(display, box.x, box.y > 18 ? box.y - 6 : box.y + box.height + 16);
            }
            if (best.label !== "unknown") {
              const matched = labeledDescriptors.find((ld) => ld.label === best.label);
              if (matched) markAttendanceOnce(matched.roll, matched.name);
            }
          });
        } catch (err) {
          console.error("Scanning tick error:", err);
        }
      }, 900);
    }

    // Mark attendance once per day
    function markAttendanceOnce(roll, name){
  const today = new Date().toLocaleDateString();
  const exists = attendanceRecords.some(r => r.roll === roll && r.date === today);
  if (exists) return;
  const now = new Date();
  const rec = { roll, name, date: now.toLocaleDateString(), time: now.toLocaleTimeString() };
  attendanceRecords.push(rec);
  saveAttendanceToStorage();
  renderAttendance();
  playBeep(); // ✅ play sound
  updateStats(); // ✅ update dashboard
  statusEl.innerText = `Marked ${name} (${roll}) at ${rec.time}`;
}


    // Storage functions
    function saveStudentsToStorage() {
      try { localStorage.setItem(STUDENTS_KEY, JSON.stringify(labeledDescriptors)); }
      catch (e) { console.error("saveStudentsToStorage error:", e); }
    }
    function loadStudentsFromStorage() {
      try {
        const raw = localStorage.getItem(STUDENTS_KEY);
        if (!raw) return;
        labeledDescriptors = JSON.parse(raw) || [];
        renderStudentList();
      } catch (e) { console.error("loadStudentsFromStorage error:", e); }
    }

    function saveAttendanceToStorage() {
      try { localStorage.setItem(ATT_KEY, JSON.stringify(attendanceRecords)); }
      catch (e) { console.error("saveAttendanceToStorage error:", e); }
    }
    function loadAttendanceFromStorage() {
      try {
        const raw = localStorage.getItem(ATT_KEY);
        if (!raw) return;
        attendanceRecords = JSON.parse(raw) || [];
        renderAttendance();
      } catch (e) { console.error("loadAttendanceFromStorage error:", e); }
    }

    // UI renderers
    function renderStudentList() {
      if (!studentListEl) return;
      studentListEl.innerHTML = "";
      labeledDescriptors.forEach((s, idx) => {
        const li = document.createElement("li");
        li.className = "student-item";
        li.innerHTML = `
          <div class="student-left">
            <img class="thumb" src="${s.photo || ''}" alt="thumb">
            <div class="meta">
              <div class="name">${s.name || ""}</div>
              <div class="roll">${s.roll || ""}</div>
            </div>
          </div>
          <div>
            <button class="small-btn" data-i="${idx}">Delete</button>
          </div>`;
        const btn = li.querySelector("button");
        if (btn) {
          btn.addEventListener("click", () => {
            if (!confirm(`Delete ${s.name} (${s.roll})?`)) return;
            labeledDescriptors.splice(idx, 1);
            saveStudentsToStorage();
            renderStudentList();
          });
        }
        studentListEl.appendChild(li);
      });
    }
    function renderAttendance() {
      if (!attendanceListEl) return;
      attendanceListEl.innerHTML = "";
      attendanceRecords.slice().reverse().forEach((a) => {
        const li = document.createElement("li");
        li.className = "att-item";
        li.innerHTML = `<div>${a.name} <span style="color:#6b7c93">(${a.roll})</span></div><div style="color:#6b7c93">${a.date} ${a.time}</div>`;
        attendanceListEl.appendChild(li);
      });
    }

    // CSV
    function onDownloadCsv() {
      if (!attendanceRecords || attendanceRecords.length === 0) { alert("No attendance to export."); return; }
      const today = new Date().toISOString().slice(0, 10);
      let csv = "Roll,Name,Date,Time\n";
      attendanceRecords.forEach((r) => { const properTime = `""${'"'}${r.time}${'"'}`; 
csv += `${escapeCsv(r.roll)},${escapeCsv(r.name)},${r.date},${properTime}\n`;
 });
      const blob = new Blob([csv], { type: "text/csv" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `attendance_${today}.csv`;
      a.click();
    }
    // RESET BUTTON
const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if(confirm("Are you sure? This will delete all registered faces & attendance logs.")) {
      localStorage.clear();
      location.reload();
    }
  });
}
// ✅ Play short beep when recognized
function playBeep() {
  const beep = document.getElementById("beepSound");
  if (beep) {
    beep.currentTime = 0;
    beep.play().catch(() => {});
  }
}

// ✅ Update attendance stats dynamically
function updateStats() {
  const total = labeledDescriptors.length;
  const today = new Date().toLocaleDateString();
  const present = attendanceRecords.filter(r => r.date === today).length;
  const absent = total - present;
  document.getElementById("totalStudents").innerText = total;
  document.getElementById("presentToday").innerText = present;
  document.getElementById("absentCount").innerText = absent >= 0 ? absent : 0;
}

// ✅ Add Reset Button Handler
document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Are you sure you want to delete all local data?")) return;
  localStorage.clear();
  labeledDescriptors = [];
  attendanceRecords = [];
  renderStudentList();
  renderAttendance();
  updateStats();
  alert("All local data cleared.");
});


    

    // Shutdown helper
    function stopAll() {
      if (scanningInterval) clearInterval(scanningInterval);
      scanningInterval = null;
      try {
        const stream = video && video.srcObject;
        if (stream && stream.getTracks) stream.getTracks().forEach((t) => t.stop());
      } catch (e) { /* ignore */ }
      if (video) video.srcObject = null;
    }

    // Expose debug
    window.smartFaceAttendance = { stopAll, getState: () => ({ labeledDescriptors, attendanceRecords }) };

    // Initialize storage data
    loadStudentsFromStorage();
    loadAttendanceFromStorage();
  })(); // end IIFE
} // end guard
