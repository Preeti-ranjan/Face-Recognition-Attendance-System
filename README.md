# Face Recognition Attendance System

## 📌 Project Overview

The **Face Recognition Attendance System** is a smart, web-based attendance management application that uses **real-time face detection and facial recognition technology** to automate the process of marking attendance.

Traditional attendance systems often depend on manual registers, ID cards, or manual data entry. These methods can be time-consuming, error-prone, and may allow proxy attendance. This project provides a modern approach by using a computer's webcam to detect and recognize registered faces.

The system captures a live video stream from the webcam, detects faces, identifies facial landmarks, processes facial features, and compares the detected face with registered face information. When a recognized person is identified, the system can be used to record their attendance.

The project is developed as a browser-based application using **HTML, CSS, JavaScript, and facial recognition models**.

---

## ✨ Key Features

### 🔹 Real-Time Face Detection

The application uses the device's webcam to capture a live video stream and detect faces in real time.

The face detection model continuously analyzes the camera feed and identifies faces appearing in front of the camera.

### 🔹 Face Recognition

After detecting a face, the system processes the facial information and compares it with registered face data.

If the detected face matches a registered user, the person can be identified.

### 🔹 Automated Attendance

The system is designed to automate attendance marking after successful face recognition, reducing the need for manual attendance entry.

### 🔹 Webcam-Based System

The application uses a standard webcam for face detection and recognition, eliminating the need for dedicated biometric hardware for the basic implementation.

### 🔹 Facial Landmark Detection

The project includes a **68-point facial landmark model** that detects important points on the face, such as the eyes, nose, mouth, jaw, and other facial regions.

### 🔹 Tiny Face Detector

The project includes a lightweight **Tiny Face Detector model** for detecting faces efficiently during real-time webcam processing.

### 🔹 Contactless Attendance

Users can be recognized through the webcam without physically touching an attendance device.

### 🔹 Proxy Attendance Prevention

Since attendance can be associated with facial recognition, the system is designed to make traditional proxy attendance more difficult.

---

## 🧠 How the System Works

The overall working process of the application is:

```text
User
  ↓
Open Web Application
  ↓
Allow Webcam Permission
  ↓
Start Live Camera Feed
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
