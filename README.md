# Movie Explorer

This app is a simplified version designed to let users browse through a catalogue of
movies and save their personal favorites.

## Application setup

### Server environment variables

| Name              | Default value | Required  | Description                                      |
|-----------------  |---------------|-----------|--------------------------------------------------|
| NODE_ENV          | production    | false     | Environment (e.g., `development` or `production` |           
| POSTGRES_HOST     | localhost     | false     | Database host                                    |
| POSTGRES_PORT     | 5432          | false     | Database port                                    |
| POSTGRES_USER     |               | true      | Database user                                    |
| POSTGRES_PASSWORD |               | true      | User password for PostgreSQL                     |
| POSTGRES_DB       |               | true      | Database name                                    |
| JWT_SECRET        |               | true      | Key used for signing JWT tokens                  |
| JWT_EXPIRATiON    | 3600000       | false     | JWT toke expiration time in milliseconds         |

### Development Setup
- Start the PostgreSQL database:
`docker-compose up -d postgres`
- Create an `.env` file to `server` folder and set the required environment variables.
- Install dependencies and start **server**. Server startup in development mode will seed test user (u/p: test-user/test), movies and actors for testing purposes.
```
cd server
npm install
npm run start:dev
```
- Install dependencies and start **client**
```
cd server
npm install
npm run dev
```

### Production Setup
Build and run the application along with the PostgreSQL database using Docker Compose:
`docker-compose up --build`
Application is available at port 80.


## Key features
- **User Management:** The app support multiple users. Each user is able to log in and manage their own list of favorite movies (this list is private to the user).
- **Movie Browsing:** Providing simple interface for users to explore a catalogue of movies. Movies are containing title, release year, genre, runtime, language, poster,
rating, etc.
- **Favorites Management:** Users are be able to add movies to their list of favorites and remove them as needed. This list is persisted across sessions.

### Web application
Web application contains pages for
- A sign in/sign up page for authentication.
- A public page showing a list of movies and a way to favorite movies.
- A protected "Favorites" page where users can view and remove their
favorite movies.
- Movie details page with extra 1:n or n:n data (e.g. top cast, fun facts...)

## REST API

### Sign up

### Sign in

### Sign out

### Get current user

### Fetch public list of movies

### Search movies by title or other attributes (e.g., genre, release year)

### Save a movie to the user's favorite list

### Retrieve the user's list of favorite movies

### Remove a movie from the user's favorite list


## Implementation

### Backend
The backend is implemented using NestJS, one of the most popular Node.js frameworks. This allows for TypeScript to be used consistently across both frontend and backend development. NestJS offers built-in support for REST APIs and seamless integration with databases, making it easy to develop robust applications. Its structured architecture promotes clean, maintainable, and organized code, adhering to industry best practices. Additionally, the framework benefits from active community support, providing access to a wealth of resources and tools.

### Database

PostgreSQL is the chosen database for this application, offering a powerful, open-source, and free solution. It supports complex queries and full-text search, making it suitable for a variety of use cases. Known for its extensibility, PostgreSQL allows custom functions and integrations to meet specific application needs. Additionally, it benefits from a strong community and excellent documentation, ensuring reliable support and continuous improvements.

### Frontend
Frontend is implemented as SPA using React
