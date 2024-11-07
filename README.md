## Task Management API
## Table of Contents
- [Description] - [Installation] - [Usage] - [Features] - [Approach] - [API Documentation] - [Contributing]
## Description
This project is a task management system that allows users to manage their tasks with full authentication features. The API is built using Node.js and Express.js, with MongoDB for data storage and JWT for user authentication. The application allows users to create, edit, and delete tasks, as well as manage their user accounts.
## Installation
## Follow the steps below to set up the project locally. 
### Prerequisites 
- Node.js and npm installed on your machine.
- MongoDB instance running locally or use a cloud database like MongoDB Atlas.
### Steps to set up 
1. Clone the repository: `git clone https://github.com/yourusername/your-project-name.git`
2. Navigate to the project directory: `cd your-project-name`
3. Install the required dependencies: `npm install`
4. Create a `.env` file in the root of your project with the following variables:
      - JWT_SECRET=your_jwt_secret_key
      - DATABASE=your_mongodb_connection_string
      - DATABASE_PASSWORD=database_password
      - PORT=port_number
5. Run the development server: ` npm start`
The server should now be running at `http://localhost:3000`.
## Usage
## User Routes 
1. **Sign Up**: `POST /api/user/signup` - Registers a new user. - Body parameters: `username`, `email`, `password`, `phoneNumber`, `fullName` (optional).
2. **Login**: `POST /api/user/login` - Authenticates a user and returns a JWT token. - Body parameters: `username`, `password`.
### Task Routes (Protected) 
1. **Get All Tasks**: `GET /api/task` - Retrieves a list of tasks for the authenticated user. - Requires `Authorization` header with `Bearer <JWT_token>`.
2. **Create a Task**: `POST /api/task` - Creates a new task for the authenticated user. - Requires `Authorization` header with `Bearer <JWT_token>`. - Body parameters: `title`, `description`, `status` (optional).
3. **Edit Task**: `PATCH /api/task/:id` - Edits a task by its ID for the authenticated user. - Requires `Authorization` header with `Bearer <JWT_token>`. - Body parameters: `title`, `description`, `status` (optional), `startDate` (optional).
4. **Delete Task**: `DELETE /api/task/:id` - Deletes a task by its ID for the authenticated user. - Requires `Authorization` header with `Bearer <JWT_token>`.
Features
- **JWT Authentication**: Secure user login and task management.
- **Task Management**: CRUD functionality for tasks.
- **Input Validation**: Data validation for creating and editing tasks (using libraries like `AJV`).
- **Role-based access control**: Only the user who created the task can modify or delete it.

Approach
- **User Authentication**: Implemented JWT authentication to allow secure access to task routes. The user is required to authenticate with their email and password before accessing the task-related endpoints.
- **Task Management**: Designed RESTful API routes to handle task creation, viewing, editing, and deletion. The task schema was designed with fields like `title`, `description`, `status`, and `startDate`.
- **Validation**: Implemented input validation for user registration and task creation using JSON schema validation (AJV).
- **Error Handling**: Structured error responses to inform the user about incorrect inputs, missing authentication tokens, or missing tasks.
API Documentation
For detailed information about the API, refer to the [API Documentation](./API_Documentation.pdf).
## Contributing
We welcome contributions to improve the project. If you would like to contribute, follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`). 5. Open a pull request.

