# Movie Explorer

This app is a simplified version designed to let users browse through a catalogue of
movies and save their personal favourites.

## Run application

### Server configuration

Environment variables

| Name              | Default value | Required  | Description                                   |
|-----------------  |---------------|-----------|-----------------------------------------------|
| MODE              | PRODUCTION    | false     | DEV or PRODUCTION                             |           
| PORT              | 3000          | false     | Port number on which the server should listen |
| POSTGRES_HOST     | localhost     | false     | Database host                                 |
| POSTGRES_PORT     | 5432          | false     | Database port                                 |
| POSTGRES_USER     |               | true      | Database user                                 |
| POSTGRES_PASSWORD |               | true      | User password for PostgreSQL                  |
| POSTGRES_DATABASE |               | true      | Database name                                 |

### Development
Run server:
Run database with docker-compose: `docker-compose up`

Install dependencies and run server:
`npm install`
`npm run start:dev`


### Production
`npm install`
`npm run start:prod`

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.



## Key features
- **User Management:** The app support multiple users. Each user is able to log in and manage their own list of favourite movies (this list is private to the user).
- **Movie Browsing:** Providing simple interface for users to explore a catalogue of movies. Movies are containing title, release year, genre, runtime, language, poster,
rating, etc.
- **Favourites Management:** Users are be able to add movies to their list of favourites and remove them as needed. This list is persisted across sessions.

### Web application
Web application contains pages for
- A login/signup page for authentication.
- A public page showing a list of movies and a way to favourite movies.
- A protected "Favourites" page where users can view and remove their
favourite movies.
- Movie details page with extra 1:n or n:n data (e.g. top cast, fun facts...)

## REST API

### Featch public list of movies

### Search movies by title or other attributes (e.g., genre, release year)

### Save a movie to the user's favourite list

### Retrieve the user's list of favourite movies

### Remove a movie from the user's favourite list


## Implementation

### Backend
The backend is implemented using NestJS, one of the most popular Node.js frameworks. This allows for TypeScript to be used consistently across both frontend and backend development. NestJS offers built-in support for REST APIs and seamless integration with databases, making it easy to develop robust applications. Its structured architecture promotes clean, maintainable, and organized code, adhering to industry best practices. Additionally, the framework benefits from active community support, providing access to a wealth of resources and tools.

### Database

PostgreSQL is the chosen database for this application, offering a powerful, open-source, and free solution. It supports complex queries and full-text search, making it suitable for a variety of use cases. Known for its extensibility, PostgreSQL allows custom functions and integrations to meet specific application needs. Additionally, it benefits from a strong community and excellent documentation, ensuring reliable support and continuous improvements.

### Frontend
Frontend is implemented as SPA using React
