# Hospital Management System (HMS)

## Overview
The **Hospital Management System (HMS)** is a comprehensive web application built with **TypeScript** and running on **Node.js**. It is designed to manage various hospital operations, including user roles, appointments, and patient management. The system follows a **role-based access control (RBAC)** model, ensuring that hospital staff (doctors, nurses, pharmacists, administrative staff, and hospital managers) can perform their respective duties efficiently.

### Key Features
- **Role-Based Access Control (RBAC)**: Different roles with varying access permissions for doctors, nurses, pharmacists, administrative staff, and hospital managers.
- **Patient Appointment Management**: Appointments are managed by hospital staff (patients do not interact directly with the system).
- **User Management**: Admins can manage hospital staff, assigning roles and permissions.
- **Secure Authentication**: Users authenticate via secure login mechanisms using **JWT** (JSON Web Tokens).
- **Comprehensive Reporting**: Hospital staff can view and manage reports related to appointments and patient history.
- **Database**: The system uses **MySQL** for storing user data, appointments, and reports.

## Project Structure

Memory updated
Thank you for the clarification! Below is the updated README.md that reflects that the project is written in TypeScript and uses Node.js as a runtime, and I’ve linked all the previous sections together:

markdown
Copy code
# Hospital Management System (HMS)

## Overview
The **Hospital Management System (HMS)** is a comprehensive web application built with **TypeScript** and running on **Node.js**. It is designed to manage various hospital operations, including user roles, appointments, and patient management. The system follows a **role-based access control (RBAC)** model, ensuring that hospital staff (doctors, nurses, pharmacists, administrative staff, and hospital managers) can perform their respective duties efficiently.

### Key Features
- **Role-Based Access Control (RBAC)**: Different roles with varying access permissions for doctors, nurses, pharmacists, administrative staff, and hospital managers.
- **Patient Appointment Management**: Appointments are managed by hospital staff (patients do not interact directly with the system).
- **User Management**: Admins can manage hospital staff, assigning roles and permissions.
- **Secure Authentication**: Users authenticate via secure login mechanisms using **JWT** (JSON Web Tokens).
- **Comprehensive Reporting**: Hospital staff can view and manage reports related to appointments and patient history.
- **Database**: The system uses **MySQL** for storing user data, appointments, and reports.

## Project Structure
src/ ├── controllers/ # Business logic for routes ├── middlewares/ # Middleware functions (e.g., JWT validation) ├── models/ # Sequelize models (e.g., User, Appointment) ├── routes/ # Route definitions (e.g., userRoutes, appointmentRoutes) ├── services/ # Logic for business processes (e.g., sending emails, generating reports) └── utils/ # Helper utilities (e.g., error handling)
