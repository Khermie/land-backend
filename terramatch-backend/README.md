# TerraMatch AI

TerraMatch AI is a Spring Boot 3 backend for a land bidding and AI-powered contractor recommendation platform.

## Features
- User registration and login with JWT-based authentication
- Land listing and bidding APIs
- AI contractor recommendations based on skill match, rating, and experience
- PostgreSQL persistence with Hibernate auto-schema updates

## Prerequisites
- Java 17 or newer
- Maven 3.8+
- PostgreSQL 12+
- pgAdmin 4 (recommended)

## 1. Create the PostgreSQL database
Open pgAdmin and create a database named `terramatch_db`:

1. Open pgAdmin 4.
2. Right-click Servers > PostgreSQL > Databases.
3. Choose Create > Database.
4. Set the name to `terramatch_db`.
5. Click Save.

## 2. Update the database password
Edit [src/main/resources/application.properties](src/main/resources/application.properties) and update the PostgreSQL password if needed:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/terramatch_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_POSTGRES_PASSWORD
```

## 3. Build the project
From the project root, run:

```powershell
mvn clean install
```

## 4. Run the application
```powershell
mvn spring-boot:run
```

The backend will start on:
- http://localhost:8082

## API notes
- Public authentication endpoints:
  - POST `/api/auth/register`
  - POST `/api/auth/login`
- Protected endpoints require a JWT token in the `Authorization` header.
