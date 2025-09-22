# StuFin Tracker

A simple, single-page web application for tracking student finances, built with HTML, CSS, JavaScript, and Firebase.

## Table of Contents

- [StuFin Tracker](#stufin-tracker)
  - [Table of Contents](#table-of-contents)
  - [Features Implemented](#features-implemented)
  - [Technologies Used](#technologies-used)
  - [Setup and Run Instructions](#setup-and-run-instructions)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Firebase Project Setup](#2-firebase-project-setup)
    - [3. Configure Firebase in Your Project](#3-configure-firebase-in-your-project)
    - [4. Run Locally](#4-run-locally)
  - [Notes on AI Usage](#notes-on-ai-usage)

## Features Implemented

This application provides the following core functionalities:

*   **User Authentication:** Secure user login and signup using Firebase Authentication.
*   **Transaction Management:** Users can add new income and expense transactions.
*   **Transaction List View:** Displays a list of all recorded transactions.
*   **Current Balance Display:** Shows the user's current financial balance, updated in real-time.
*   **Basic Testing Suite:** Includes beginner-friendly, plain JavaScript tests for authentication and transaction functionalities.

## Technologies Used

*   **HTML5:** For structuring the web content.
*   **CSS3 (Bootstrap):** For styling and responsive design.
*   **JavaScript (ES6+):** For client-side logic and interactivity.
*   **Firebase:**
    *   **Firebase Authentication:** For user registration and login.
    *   **Cloud Firestore:** For storing and synchronizing transaction data.
*   **Coderabbit:** For code review and quality.
*   **Plain JavaScript Testing:** Custom, console-logging tests for core features.

## Setup and Run Instructions

Follow these steps to get the StuFin Tracker running on your local machine.

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/your-username/StuFin-tracker.git
cd StuFin-tracker
```

### 2. Firebase Project Setup

This application relies on Firebase for authentication and data storage. You'll need to set up your own Firebase project:

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click "Add project" and follow the steps to create a new project.
3.  Once your project is created, click on the "Web" icon (`</>`) to add a web app to your project.
4.  Register your app and copy the Firebase configuration object. It will look something like this:

    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    ```
5.  **Enable Services:**
    *   In the Firebase Console, navigate to **Authentication** and enable the "Email/Password" sign-in method.
    *   Navigate to **Firestore Database**, create a new database, and choose "Start in test mode" for quick setup (you can adjust security rules later).

### 3. Configure Firebase in Your Project

1.  Open your `index.html` file.
2.  Locate the `<script>` tags where Firebase SDKs are included. You'll need to add your `firebaseConfig` object and initialize Firebase. It should look similar to this (place it before `app.js` and `services/auth.js`):

    ```html
    <!-- Firebase SDKs -->
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>

    <script>
      // Your Firebase configuration
      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
      };

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      // Make auth and db globally accessible
      window.auth = firebase.auth();
      window.db = firebase.firestore();
    </script>
    ```
    **Replace the placeholder `firebaseConfig` with the actual configuration from your Firebase project.**

### 4. Run Locally

Since this is a static web application, you can serve it using any simple HTTP server.

**Using Python (Recommended):**

If you have Python installed, you can run a simple HTTP server from the project root directory:

```bash
python3 -m http.server 5000
```

Then, open your web browser and navigate to `http://localhost:5000`.

**To run tests:**
Once the application is running, open your browser's developer console (usually F12 or right-click -> Inspect -> Console). Click the "Run Tests" button on the page, and the test results will be logged to the console.

## Notes on AI Usage

This project was developed with the assistance of an AI coding assistant (Gemini-2.5-Flash via Trae AI). The AI played a significant role in:

*   **Code Scaffolding:** Generating initial file structures and boilerplate code.
*   **Test Generation:** Creating the `tests.js` file and implementing beginner-friendly, plain JavaScript tests for authentication and transaction functionalities, including setup, execution, and cleanup logic.
*   **Documentation:** Assisting in generating this `README.md` file, including setup instructions, feature lists, and technology overviews.
*   **Code Modification & Refinement:** Helping to modify existing HTML to integrate the test suite and remove elements as requested.
*   **Commit Message Generation:** Providing clear and concise commit messages for changes made.
