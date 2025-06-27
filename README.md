# LiveLoop Code Editor

_COMPANY_: CODTECH IT SOLUTIONS

_NAME_: Parth Patel

_INTERN ID_: CT06DM179

_DOMAIN_: MERN STACK WEB DEVELOPMENT

_DURATION_: 6 WEEKS

_MENTOR_: NEELA SANTOSH

Welcome to **LiveLoop Code Editor** – a real-time collaborative code editor featuring live code synchronization, multi-language code compilation, and a modern UI. This project consists of a React-based client and an Express/Socket.IO-powered server.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Technologies Used](#technologies-used)

---

## Features

- **Real-Time Collaboration:**  
  Multiple users can join the same room and work on code simultaneously.

- **Live Code Synchronization:**  
  Code updates are instantly broadcasted amongst all connected clients.

- **Multi-Language Compilation:**  
  Compile code in various supported languages using JDoodle API.

- **Clean & Modern UI:**  
  Responsive design using React and Bootstrap elements.

- **Socket.IO Integration:**  
  Real-time communication between clients and server.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- npm (comes with Node.js)

### Steps

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd LiveLoop
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Copy `.env.example` to `.env` in the server directory and update the values as needed.

4. **Run the application:**

   - In one terminal, start the server:

     ```bash
     cd server
     npm start
     ```

   - In another terminal, start the client:

     ```bash
     cd client
     npm start
     ```

---

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Create or join a room using the provided interface.
3. Start coding!

---

## Configuration

- The server listens on port `5000` by default. To change this, update the `PORT` variable in the server's `.env` file.
- The client and server must have the same room ID format. Ensure consistency in your implementation.

---

## Technologies Used

- **Frontend:** React, Redux, Axios, Bootstrap
- **Backend:** Node.js, Express, Socket.IO
- **Others:** JDoodle API, dotenv, cors

---

## Output

![Image](https://github.com/user-attachments/assets/3402fd92-391a-4a55-8e7a-c812644e4a37)
_Home Page: Generating unique id_

![Image](https://github.com/user-attachments/assets/cd145ae7-d532-47f1-a08f-5108257f8e35)
_Editor Page: Other user joining the same room_

![Image](https://github.com/user-attachments/assets/c9308699-0e1b-4295-a6cf-cee5c8fcbc83)
_Editor Page: Both coding togehter_
