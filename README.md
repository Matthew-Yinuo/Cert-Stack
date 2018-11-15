# Certifikit-kat

A Fullstack GraphQL Certification Generator

- Branches are in the order they were coded.
- There is a mass migration in progress to a cleaner codebase using modern react

## Packages

This project is made up of 2 main packages that share code using Yarn Workspaces.

- web (React.js website)
- server (GraphQL Typescript server)

## Installation

1. Clone project

```
git clone https://github.com/matthew-yinuo/certifikit-kat.git
```

2. cd into folder

```
cd certifikit-kat
```

3. Download dependencies

```
yarn install
```
4. Install and start Redis

5. In `packages/server` create a file called `.env` and add the following line inside: `FRONTEND_HOST=http://localhost:3000 SENDGRID_API_KEY={your api key}`


## Usage

1. Start server `yarn dev` in `packages/server`

2. Now you can run `yarn dev` in `packages/web` to start the website

## Deploy

## Features

1. Website register/login
2. Deploy backend and frontend
3. Permission based cert
4. Website and App create cert
5. Website and App view cert
6. Website publish cert
7. Logout
