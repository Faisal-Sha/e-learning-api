# E-Learning API Architecture

## System Architecture

```mermaid
graph TD
    Client[Client] --> Gateway[API Gateway :3002]
    Gateway --> CourseService[Course Service :3000]
    Gateway --> AuthService[Auth Service :3001]
    CourseService --> MongoDB[(MongoDB)]
    CourseService --> Redis[(Redis Cache)]
    AuthService --> MongoDB
```

## Component Overview

### API Gateway (Port 3002)
- Routes requests to appropriate microservices
- Handles service discovery
- Load balancing
- Request/Response transformation

### Course Service (Port 3000)
- Course CRUD operations
- Data validation
- Redis caching implementation
- MongoDB integration
- Error handling

### Auth Service (Port 3001)
- User authentication
- Authorization
- JWT token management
- User management

### Data Layer
- MongoDB: Primary database
- Redis: Caching layer

## Data Flow

1. **Course Creation**
```mermaid
sequenceDiagram
    Client->>API Gateway: POST /courses
    API Gateway->>Course Service: Forward request
    Course Service->>MongoDB: Save course
    Course Service->>Redis: Invalidate cache
    Course Service->>API Gateway: Course created
    API Gateway->>Client: Success response
```

2. **Course Retrieval**
```mermaid
sequenceDiagram
    Client->>API Gateway: GET /courses
    API Gateway->>Course Service: Forward request
    Course Service->>Redis: Check cache
    alt Cache hit
        Redis->>Course Service: Return cached data
    else Cache miss
        Course Service->>MongoDB: Fetch courses
        Course Service->>Redis: Cache results
    end
    Course Service->>API Gateway: Return courses
    API Gateway->>Client: Success response
```

## Security

- Input validation using class-validator
- Global exception handling
- Rate limiting (planned)
- JWT authentication (planned)
- CORS enabled
- Environment variable configuration

## Scalability

The microservices architecture allows for:
- Independent scaling of services
- Easy addition of new services
- Load balancing
- Service redundancy
- Zero-downtime deployments
