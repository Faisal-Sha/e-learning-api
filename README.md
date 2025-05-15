# E-Learning API Platform

A modern, scalable e-learning platform built with NestJS, implementing a microservices architecture. This platform provides a robust API for managing online courses with features like caching and proper error handling.

## Architecture Overview

The platform is built using a microservices architecture with the following components:

1. **Course Service** (Port 3000)
   - Handles course management operations
   - Implements CRUD operations
   - Uses MongoDB for data persistence
   - Implements Redis caching for improved performance

2. **Auth Service** (Port 3001)
   - Manages authentication and authorization

3. **API Gateway** (Port 3002)
   - Routes requests to appropriate services
   - Handles service discovery

## Technical Stack

- **Framework**: NestJS
- **Database**: MongoDB
- **Caching**: Redis
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker
- **Validation**: class-validator
- **Testing**: Jest

## Features

1. **RESTful API Endpoints**
   - Create Course
   - List All Courses
   - Get Course by ID
   - Update Course
   - Delete Course

2. **Data Validation**
   - Input validation using class-validator
   - Proper error handling and messages

3. **Caching**
   - Redis implementation for improved performance
   - Cached course listings

4. **Error Handling**
   - Global exception filter
   - Standardized error responses

## API Documentation

### Course Endpoints

#### Create Course
```http
POST /courses
Content-Type: application/json

{
  "title": "Course Title",
  "description": "Course Description",
  "price": 99.99
}
```

#### Get All Courses
```http
GET /courses
```

#### Get Course by ID
```http
GET /courses/:id
```

#### Update Course
```http
PUT /courses/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated Description",
  "price": 129.99
}
```

#### Delete Course
```http
DELETE /courses/:id
```

## Setup and Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd e-learning-api
   ```

2. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update environment variables as needed

3. **Run with Docker**
   ```bash
   docker compose up -d
   ```

4. **Access Services**
   - Course Service: http://localhost:3000
   - Auth Service: http://localhost:3001
   - API Gateway: http://localhost:3002
   - Swagger Documentation: http://localhost:3000/api/docs

## Testing

The project includes comprehensive unit tests:

```bash
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
npm run test:cov    # Generate test coverage
```

## Architecture Decisions

1. **Microservices Architecture**
   - Improved scalability and maintenance
   - Service isolation
   - Independent deployment capability

2. **MongoDB**
   - Flexible schema for course data
   - Scalable document storage
   - Efficient querying

3. **Redis Caching**
   - Improved read performance
   - Reduced database load
   - Configurable cache duration

4. **Docker Containerization**
   - Consistent development environment
   - Easy deployment
   - Service isolation

## Future Enhancements

1. Implement user authentication and authorization
2. Add course categories and tags
3. Implement file upload for course materials
4. Add user ratings and reviews
5. Implement payment integration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
