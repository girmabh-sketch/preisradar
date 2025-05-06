## Spritpreis Radar Backend Application

+ Backend System

> Developed with NestJS - a framework for building efficient, scalable Node.js server-side applications.
> The project uses node.js version 20.17.0.

+ Database System

> It uses `postgreSQL Server` [PostgreSQL app(https://www.postgresql.org/download/macosx/) ] version PostgreSQL 16 for database.

## Database Setup

+ Database Setup:- in app.module.ts file, section (TypeOrmModule.forRoot({})  provide the following information:
+ > type: 'postgres'
+ > host: "[hostname]"
+ > port: "[port number]"
+ > username: "[user name]"
+ > password: "[password]"
+ > database: "[database name]"

## Running Database Server

+ Using Postgres App
+ > Open postgres App, click the start button

Using terminal with the PostgreSQL app

```bash
$ /Applications/Postgres.app/Contents/Versions/latest/bin/[Tool Name][Options and/or Arguments]
```

## Running Backend System

```bash
# go to the backend directory
$ cd backend

# install all packages
$ npm install

# run in development mode
$ npm run start

# run in watch mode
$ npm run start:dev

# run in production mode
$ npm run start:prod
```

## Test Backend Application with Swagger

+ Open browser and provide the url - `http://localhost:3000/api`
