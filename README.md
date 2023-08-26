# Saulter Fullstack Application

Fullstack application that allows users to manage hiking routes. The application should consist of a front-end using React and a back-end using Nest.js

## Run Locally

Clone the project

```bash
  git clone git@github.com:SalIin/saulter.git
```

Go to the API project directory

```bash
  cd server
```

Run docker to start the application

```bash
  docker compose up -d
```

Go to the frontend project directory

```bash
  cd ../client
```

Run client application

```bash
  yarn start
```

## Description

- Authorization - to use an application you need to be authorized. I have implemented the JWT based authorization for this purpose. But I have skipped the refresh token part as this is just a simple demo application. For now, you will just have an access token after sign in. It is neccessary to implement refresh token feature in real app. To do this we should put one more token into http-only cookie. This token will "live" much longer than regular access token. After that we can check the expiration date of access token on each request and if this timestamp is lower than actual date timestamp we will use the refresh token from the cookie to sign new access token again and send it back to the server.

- State management - there is no need to use any state manager such as Redux, Recoil or any others. React Query cache is enough to store and access the data from backend. Also I have used context API to access the user info accross the app.

- Data fetching - I have used React Query to fetch the data from the backend. This approach let me use the cache and deduplicate requests to the server.

- UI framework - Chakra UI was used for styling. This tool allows to make responsive layouts very fast and easy.

-
