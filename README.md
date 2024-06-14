# Course Management API for LMS
- This project is a RESTful API for a Course Management System within an LMS. The API supports functionalities for user authentication, course management (CRUD operations), and progress tracking. The project demonstrates the developer’s ability to handle databases, secure endpoints, and manage relationships between different entities.


## Technologies Used
- Node.js
- Express.js
- Sequelize (ORM)
- MySQL
- JWT (JSON Web Tokens)
- bcrypt (for password hashing)
- dotenv (for environment variables)
- body-parser (for parsing request bodies)
### Project Structure

            
            ├── config
            │   └── db.js
            ├── controller
            │   ├── userController.js
            │   ├── courseController.js
            │   ├── lessonController.js
            │   └── progressController.js
            ├── middleware
            │   ├── authenticate.js
            │   └── authorize.js
            ├── modal
            │   ├── userModal.js
            │   ├── courseModal.js
            │   ├── lessonModal.js
            │   └── progressModal.js
            ├── routes
            │   ├── userRouter.js
            │   ├── courseRouter.js
            │   ├── lessonRouter.js
            │   └── progressRouter.js
            ├── validators
            │   ├── userValidator.js
            │   ├── courseValidator.js
            │   └── lessonValidator.js
            ├── .env
            ├── index.js
            └── swagger.js

### Installation
- Clone the repository:


           git clone https://github.com/manoj7654/swanirbhar.git

            cd swanirbhar
- Install dependencies:


             npm install

- Create a .env file in the root directory and add your environment variables (see below for required variables).

- Start the server:


                    npm run server 

- Environment Variables

        dataBaseName=your_database_name
        user_name=your_database_user
        mySqlPassword=your_database_password
        host=your_database_host
        mySqlPort=your_database_port
        secret=your_jwt_secret
        port=your_server_port

### API Endpoints
#### User Routes
`Register`
 - Method : POST
 - Endpoint : /register - Register a new user.
 - Request body :
        
            {
                "name":"student"
                "email": "student@example.com",
                "password": "password123",
                "role": "student"
            }

`Login`
- Method : POST
- Endpoint : /login - Login a user.
- Response : 

        {
                "email": "student@example.com",
                "password": "password123",
            
            }

#### Course Routes
`Create Course`
- Method : POST
- Endpoint : /courses - Create a new course (teacher only).
- Request body :

            {
                "title": "Introduction to Programming",
                "description": "Learn the basics of programming.",
                "teacherId": 1
            }
`Get All Course`
- Method : GET
- Endpoint : /courses - Get all courses.
- Response : 
    
                [
            {
                "title": "Introduction to Programming",
                "description": "Learn the basics of programming.",
                "teacherId": 1
            },
            {
                "title": "Advanced Mathematics",
                "description": "Dive deep into advanced mathematical concepts.",
                "teacherId": 1
            }
        ]
 
 `Get Course by id`
- Method : GET
- Endpoint : /courses/:id 
- Response : Get course by id.

`Update course`
- Method : POST
- Endpoint : /courses/:id  Update a course by ID (teacher only).
- Response : Update a course by ID (teacher only).

`Delete Course`
- Method : DELETE
- Endpoint : /courses/:id 
- Response : Delete a course by ID (teacher only).
#### Lesson Routes
`Create lesson`
- Method : POST
- Endpoint : /courses/:courseId/lessons - Create a new lesson for a specific course (teacher only).
- Request body :
    
            {
                "title": "Variables and Data Types",
                "content": "Understanding variables and data types in programming.",
                "courseId": 1
            }

`Get all course`
- Method : GET
- Endpoint : /courses/:courseId/lessons 
- Response : Get all lessons for a specific course.

` Get lesson by id`
- Method : GET
- Endpoint : /lessons/:id 
- Response : Get a lesson by ID.

` Update lesson`
- Method : PUT
- Endpoint : /lessons/:id 
- Response : Update a lesson by ID (teacher only).

` Delete lesson`
- Method : DELETE
- Endpoint : /lessons/:id 
- Response :  Delete a lesson by ID (teacher only).
#### Progress Routes
`Create progress`
- Method : POST
- Endpoint : /users/:id/progress
- Request body : 

        {
            "userId": 1,
            "courseId": 1,
            "progress": 50.0
        }
`Get progress`
- Method : GET
- Endpoint : /users/:id/progress
- Response : 

            [
                {
                    "userId": 1,
                    "courseId": 1,
                    "progress": 50.0
                },
                {
                    "userId": 1,
                    "courseId": 2,
                    "progress": 75.0
                }
            ]


### Authentication
- Authentication is the process of verifying the identity of a user. In this course management api for lms, authentication is implemented using JWT (JSON Web Tokens).

### Authorization
- Authorization determines what an authenticated user is allowed to do. Different user roles 

