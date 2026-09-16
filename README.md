# Smart Face Recognition Attendance System

## 📌 Project Overview

The **Smart Face Recognition Attendance System** is a web-based application designed to automate the attendance marking process using **real-time face detection and facial recognition technology**.

Traditional attendance systems often depend on manual registers, ID cards, or manual data entry. These approaches can be time-consuming and may result in incorrect entries or proxy attendance. This project provides an automated and contactless approach where a webcam is used to detect and recognize registered faces.

The system captures a live video stream from the user's webcam, detects faces, identifies facial landmarks, processes facial features, and compares the detected face with registered face information. When a recognized person is identified, the system can be used to mark their attendance.

The project is built using **HTML, CSS, JavaScript, and browser-based facial recognition models**, making it a useful demonstration of how computer vision and machine learning can be integrated into a web application.

---

## 🎯 Project Objectives

The main objectives of this project are:

- Automate the attendance marking process.
- Reduce manual attendance work.
- Use facial recognition for user identification.
- Provide a contactless attendance mechanism.
- Reduce errors associated with manual attendance.
- Help make proxy attendance more difficult.
- Use real-time webcam processing.
- Demonstrate practical computer vision concepts.
- Build a browser-based face recognition application.
- Provide a foundation for developing a complete attendance management system.

---

## ✨ Key Features

### 🤖 Real-Time Face Detection

The application uses the device's webcam to capture a live video stream and detect faces in real time.

The face detection model continuously analyzes the camera feed and identifies faces appearing in front of the camera.

### 👤 Face Recognition

After detecting a face, the application processes the facial information and compares it with registered face information.

If a suitable match is found, the corresponding user can be identified.

### 📷 Webcam Integration

The application works with a standard webcam and does not require dedicated biometric hardware for the basic implementation.

### 🧠 Facial Landmark Detection

The project includes a **68-point facial landmark model** for identifying important points on a detected face.

These landmarks can represent areas such as:

- Eyes
- Nose
- Mouth
- Jaw
- Facial outline

### ⚡ Lightweight Face Detection

The project includes the **Tiny Face Detector model**, which is suitable for real-time face detection in a browser environment.

### 📝 Automated Attendance

After successful face recognition, the system can be used to record the user's attendance, reducing repetitive manual work.

### 🔒 Contactless Attendance

Users can be recognized through the webcam without touching an attendance machine.

### 🛡️ Proxy Attendance Prevention

By associating attendance with facial recognition, the system is designed to make conventional proxy attendance more difficult.

---

# 🔄 How the System Works

The complete workflow of the system can be represented as:

```text
User
  ↓
Open Web Application
  ↓
Allow Camera Permission
  ↓
Start Webcam
  ↓
Capture Live Video
  ↓
Detect Face
  ↓
Detect Facial Landmarks
  ↓
Process Facial Features
  ↓
Compare With Registered Face
  ↓
Recognize User
  ↓
Mark Attendance
```

---

# 🧠 Face Recognition Process

## Step 1 — Camera Access

When the application starts, the browser requests permission to access the user's webcam.

The user must allow camera access for real-time face recognition.

## Step 2 — Live Video Capture

After permission is granted, the application receives the live video stream from the webcam.

## Step 3 — Face Detection

The Tiny Face Detector searches the live video feed for human faces.

When a face is detected, the system identifies its location in the video frame.

## Step 4 — Facial Landmark Detection

The 68-point facial landmark model identifies important points on the detected face.

## Step 5 — Facial Feature Processing

The facial information is processed by the face recognition model to generate a representation suitable for comparison.

## Step 6 — Face Matching

The detected facial representation is compared with registered facial information.

## Step 7 — User Identification

If a suitable match is found, the system identifies the corresponding registered user.

## Step 8 — Attendance

After successful identification, attendance can be recorded for the recognized user.

---

# 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure of the web application |
| CSS3 | Styling and user interface |
| JavaScript | Application logic and face recognition functionality |
| Webcam API | Capturing real-time camera input |
| Face Detection Model | Detecting faces |
| Face Landmark Model | Detecting facial landmark points |
| Face Recognition Model | Recognizing faces |
| Browser | Running the application |

---

# 📂 Project Structure

```text
Face-Recognition-Attendance-System/
│
├── Index.html
├── script.js
├── style.css
│
├── README.md
├── README.txt
│
├── download_models.ps1
│
├── face_landmark_68_model-shard1
├── face_landmark_68_model-weights_manifest.json
│
├── face_recognition_model-shard1
├── face_recognition_model-shard2
├── face_recognition_model-weights_manifest.json
│
├── tiny_face_detector_model-shard1
└── tiny_face_detector_model-weights_manifest.json
```

---

# 📄 File Description

## `Index.html`

The main HTML file of the application.

It defines the structure of the web page and contains the interface elements required by the attendance system.

---

## `script.js`

The main JavaScript file responsible for the functionality of the application.

It handles functionality related to:

- Webcam access
- Video processing
- Face detection
- Facial landmark detection
- Face recognition
- User interaction
- Dynamic interface updates

---

## `style.css`

Contains the styling and visual design of the application.

It controls:

- Page layout
- Fonts
- Buttons
- Webcam area
- Spacing
- Text appearance
- Overall user interface

---

## `download_models.ps1`

A PowerShell script included in the repository for downloading or preparing the required facial recognition model files.

---

# 🤖 Machine Learning Models

The repository contains model files required for different stages of face processing.

## Face Landmark 68 Model

```text
face_landmark_68_model-shard1
face_landmark_68_model-weights_manifest.json
```

This model detects 68 facial landmark points on a detected face.

These points provide information about the structure and position of facial features.

---

## Face Recognition Model

```text
face_recognition_model-shard1
face_recognition_model-shard2
face_recognition_model-weights_manifest.json
```

These files contain the model configuration and weights used for facial recognition.

The model processes facial information and generates a representation that can be compared with registered faces.

---

## Tiny Face Detector Model

```text
tiny_face_detector_model-shard1
tiny_face_detector_model-weights_manifest.json
```

This model is responsible for detecting faces in the webcam stream.

Its lightweight design makes it suitable for real-time browser-based processing.

---

# 💻 System Requirements

To run this project, you should have:

- Windows, Linux, or macOS
- Computer or laptop
- Working webcam
- Modern web browser
- JavaScript enabled
- Required model files
- Local web server
- Camera permission

Recommended browsers:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Preeti-ranjan/Face-Recognition-Attendance-System.git
```

## 2. Navigate to the Project

```bash
cd Face-Recognition-Attendance-System
```

## 3. Verify Model Files

Make sure the following model files are available:

```text
face_landmark_68_model-shard1
face_landmark_68_model-weights_manifest.json

face_recognition_model-shard1
face_recognition_model-shard2
face_recognition_model-weights_manifest.json

tiny_face_detector_model-shard1
tiny_face_detector_model-weights_manifest.json
```

---

# ▶️ How to Run

Because this project requires webcam access, it is recommended to run it through a local web server rather than directly opening the HTML file.

## Option 1 — Python HTTP Server

If Python is installed, open the project directory in Command Prompt or Terminal and run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

in your browser.

---

## Option 2 — VS Code Live Server

You can also run the project using the Live Server extension in Visual Studio Code.

### Steps

1. Open the project in Visual Studio Code.
2. Install the Live Server extension.
3. Open `Index.html`.
4. Right-click inside the file.
5. Select **Open with Live Server**.
6. The application will open in your browser.
7. Allow camera access when prompted.

---

# 📷 Camera Permission

The application requires webcam access.

When the browser displays the camera permission request, select:

```text
Allow
```

If the camera does not work:

1. Open the browser site settings.
2. Find Camera permissions.
3. Allow camera access.
4. Reload the application.

---

# 🔄 Complete System Workflow

```text
                 ┌──────────────────────┐
                 │      Start App       │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Request Camera       │
                 │ Permission           │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Start Webcam         │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Detect Face          │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Detect Facial        │
                 │ Landmarks            │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Process Facial       │
                 │ Features             │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Compare Registered   │
                 │ Face Information     │
                 └──────────┬───────────┘
                            │
                       ┌────┴────┐
                       │         │
                       ▼         ▼
                    Match     No Match
                       │         │
                       ▼         ▼
                 Identify User  Unknown
                       │
                       ▼
                 Mark Attendance
```

---

# 🎯 Project Objectives in Detail

### 1. Attendance Automation

Reduce the need for manually recording attendance.

### 2. Face-Based Identification

Use facial recognition as the method for identifying registered users.

### 3. Real-Time Processing

Process the webcam feed continuously to detect faces.

### 4. Contactless Operation

Allow users to interact with the system without touching a physical biometric device.

### 5. Reduce Manual Errors

Automated identification can reduce errors associated with manually entering attendance information.

### 6. Prevent Proxy Attendance

Facial identification can make it more difficult for someone else to mark attendance on behalf of a registered user.

---

# 📊 Attendance Process

## Traditional Attendance

```text
Teacher / Administrator
        ↓
Check User
        ↓
Find Name
        ↓
Mark Attendance
        ↓
Repeat for Every User
```

## Automated Attendance

```text
User
  ↓
Stand in Front of Camera
  ↓
Face Detected
  ↓
Face Recognized
  ↓
User Identified
  ↓
Attendance Recorded
```

---

# 🌟 Advantages

## ⏱️ Time Saving

Automated face recognition can reduce the time required for manual attendance.

## 🤖 Automated

The system can automate user identification and attendance recording.

## 📷 Webcam Based

A standard webcam can be used for the basic system.

## 🤝 Contactless

No physical interaction with an attendance device is required.

## 🧠 AI and Computer Vision

The project demonstrates the practical application of facial recognition and computer vision.

## 🌐 Web Based

The application can be accessed through a modern web browser.

## 🔧 Expandable

The project can be extended with databases, authentication, dashboards, reporting, and analytics.

---

# ⚠️ Limitations

The current implementation may require additional development before being used as a production-level attendance system.

Potential limitations include:

- Webcam quality can affect detection and recognition.
- Poor lighting may affect face detection.
- Face angle can affect recognition.
- Camera permission is required.
- Recognition performance depends on the quality of registered face data.
- Large-scale deployments may require optimized data storage and processing.
- Production deployments require stronger authentication and authorization.
- Biometric data requires appropriate privacy and security controls.

---

# 🔐 Security and Privacy

Facial recognition involves biometric information, so privacy and security should be considered carefully.

For a production deployment, it is recommended to:

- Obtain appropriate user consent.
- Protect facial information from unauthorized access.
- Use HTTPS.
- Implement authentication.
- Implement role-based authorization.
- Secure attendance records.
- Avoid unnecessary storage of raw images.
- Encrypt sensitive information where appropriate.
- Define data retention and deletion policies.
- Follow applicable privacy and data-protection requirements.

This project should be considered a development/educational project unless additional production-level security and privacy controls are implemented.

---

# 🧪 Testing

The application should be tested under different conditions.

## Functional Testing

Test:

- Application loading
- Webcam initialization
- Camera permission
- Face detection
- Facial landmark detection
- Face recognition
- Registered user recognition
- Unknown face handling
- Attendance marking
- Multiple faces
- Application responsiveness

## Camera Testing

Test the application under:

- Good lighting
- Low lighting
- Different camera resolutions
- Different distances
- Different face angles
- Multiple people in the camera frame

## Browser Testing

Test using:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

---

# 🏫 Possible Use Cases

## Schools

Automated student attendance in classrooms.

## Colleges and Universities

Attendance management for students and faculty.

## Corporate Offices

Employee attendance tracking.

## Training Centers

Attendance tracking for trainees and participants.

## Workshops and Events

Participant attendance management.

## Organizations

Automated staff attendance systems.

---

# 🔮 Future Enhancements

## 👤 User Registration

Create a dedicated registration module for adding users and their facial information.

## 🔐 Authentication

Add secure login functionality for:

- Administrator
- Teacher
- Staff
- Student

## 🗄️ Database Integration

Integrate databases such as:

- MySQL
- PostgreSQL
- MongoDB

for storing users and attendance records.

## 📊 Admin Dashboard

Create an administrative dashboard for:

- User management
- Attendance management
- Reports
- Analytics
- System settings

## 📅 Attendance Reports

Generate:

- Daily reports
- Weekly reports
- Monthly reports
- User-wise reports
- Department-wise reports

## 📥 Export Reports

Allow attendance information to be exported as:

- Excel
- CSV
- PDF

## 🛡️ Liveness Detection

Implement liveness detection to help distinguish a real person from photographs or displayed images.

## 🔔 Notifications

Add email or application notifications for attendance-related events.

## ☁️ Cloud Deployment

Deploy the application to a cloud platform for remote access.

## 📱 Mobile Application

Develop a mobile-friendly version or dedicated mobile application.

## 📈 Attendance Analytics

Add dashboards showing:

- Attendance percentage
- Present/absent statistics
- Monthly trends
- User attendance history

---

# 📚 Learning Outcomes

This project provides practical experience with:

- HTML
- CSS
- JavaScript
- Webcam integration
- Browser APIs
- Face detection
- Face recognition
- Facial landmark detection
- Computer vision
- Real-time video processing
- Machine learning models
- Web application development

---

# 💡 Project Vision

The long-term goal of this project is to develop a complete, secure, and intelligent attendance management platform using facial recognition technology.

The future system can combine:

```text
Face Recognition
       +
User Management
       +
Authentication
       +
Database
       +
Attendance Records
       +
Reports
       +
Analytics
       +
Admin Dashboard
       +
Security
       ↓
Smart Attendance Management System
```

---

# 🚀 Future System Architecture

```text
             User
               ↓
          Web Interface
               ↓
          Webcam Input
               ↓
        Face Detection
               ↓
      Facial Recognition
               ↓
       User Identification
               ↓
        Attendance System
               ↓
            Database
               ↓
       Reports & Analytics
               ↓
        Admin Dashboard
```

---

# 📸 Screenshots

Add screenshots of the application here.

Example:

```markdown
## Application Interface

![Application Screenshot](screenshots/home.png)
```

You can create a `screenshots` folder:

```text
screenshots/
├── home.png
├── webcam.png
├── face-detection.png
├── recognition.png
└── attendance.png
```

---

# 📦 Repository

GitHub Repository:

https://github.com/Preeti-ranjan/Face-Recognition-Attendance-System

---

# 👨‍💻 Author

**Preeti Ranjan Sarangi**

GitHub:

https://github.com/Preeti-ranjan

---

# ⭐ Support

If you find this project useful for learning or experimentation, consider giving the repository a **Star ⭐** on GitHub.

Feedback, suggestions, and contributions are welcome.

---

# 📄 License

This project is intended for educational and learning purposes.

If you want to distribute this project as open-source software, you can add an appropriate open-source license such as the MIT License.

---

# 🔖 Keywords

Face Recognition, Face Detection, Attendance System, Face Recognition Attendance System, Facial Recognition, Computer Vision, Artificial Intelligence, Machine Learning, Python, JavaScript, HTML, CSS, Webcam, Real-Time Face Detection, Automated Attendance, Smart Attendance System, Biometric Attendance, AI Attendance System, Face Landmark Detection, Tiny Face Detector, Web Application
