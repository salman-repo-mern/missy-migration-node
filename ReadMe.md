##   Retain Coding Challenge: Task 1 - Code Refactoring
This project is a legacy user management API that requires refactoring to improve its quality, security, and maintainability. The original codebase is written in Node.js. My task is to identify and address critical issues while ensuring the API's functionality remains intact.

---

## Getting Started
Follow these steps to set up and run the application.

---

## Prerequisites
Node.js (14.x or higher is recommended)

## Setup
1. Clone or download this repository.

2. Navigate to the project directory:

   **cd messy-migration**
3. Install the required dependencies:

    **npm install**
4. Start the application:

    **npm start**
5. The API will be available at _http://localhost:5000_.

# API Endpoints
The following endpoints are available:

1. GET /: Health check

2. GET /users: Get all users

3. GET /user/<id>: Get a specific user by ID

4. POST /users: Create a new user

5. PUT /user/<id>: Update an existing user by ID

6. DELETE /user/<id>: Delete a user by ID

7. GET /search?name=<name>: Search for users by name

8. POST /login: User login

# Refactoring Goals

The primary goals of this refactoring challenge are to:

- Improve Code Organization: Separate concerns, establish a clear project structure, and use meaningful names.

- Enhance Security: Address vulnerabilities, implement robust data validation, and secure sensitive data.

- Implement Best Practices: Improve error handling, use proper HTTP status codes, and promote code reusability.

- Document Changes: Provide a CHANGES.md file detailing the issues found, the changes made, and the rationale behind them.