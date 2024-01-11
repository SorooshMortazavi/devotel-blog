# Blog Web Application

This project implements a blog REST-API web application using NestJS with a service oriented architecture. 

## Key Features

- Monolithic application structure
- CRUD operations for blog posts using Postgres database
- Authentication with Firebase
  - User registration 
  - Login functionality in client side
  - passport-firebase strategy authentication
- Blog post creation, viewing, editing and deletion
- Input validation using DTOs
- Error handling with proper HTTP status codes  
- Image uploads with Multer
- HTTP request and error logging with Pino
- Role based access control for users and admins

## Authentication

Users can register by providing basic profile information like email and name. Registered users are assigned a 'USER' role by default. The role can be updated to 'ADMIN' in the database after registration if elevated permissions are needed.

The login functionality returns a JWT token that should be attached as a Bearer token to authenticate subsequent API requests. An example HTML page is provided in `client-example` folder to demonstrate getting this token with the Firebase library.

## Running Locally

To run this app on your local machine, follow these steps:

1. Install dependencies with `pnpm install`
2. Configure environment variables in a `.env` file with database credentials 
3. Start the server with `pnpm run start:dev`

## Potential Improvements

While core features were implemented, there is a lot of room for additional features and improvements:

- Migrate to microservices architecture
- Additional CRUD operations for comments, categories etc 
- Advanced filtering/search functionality
- Support for tagging posts
- User profiles and account management
- Admin dashboard 
- etc
