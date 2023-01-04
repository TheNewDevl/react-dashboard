# react-dashboard
This repo contains the source code for the front-end of the dashboard.

## Table of contents

- [1 - Prerequisites](#1-prerequisites)
  - [1.1 - Env](#11-env)
  - [1.2 - Back](#12-back-api)
- [2 - Project](#2-project)
  - [2.1 - Build with](#21-built-with)
  - [2.2 - Installation](#22-installation)
  - [2.3 - Routes](#23-routes)
  - [2.4 - Next Steps](#24-next-steps)
- [Author](#author)
## 1. Prerequisites

### 1.1 Env

Make sure you have the following installed on your computer:
- NodeJS (V16+)
- NPM (V8+)

### 1.2 Back api

Make sure you have the back api deployed or running on your computer. You can find the repo [here](
https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard
). Follow the instructions in the README.md file to run the back api.

Front end will make the call using this base url : "http://localhost:3000". You can change it if needed in the Store class in the file src/api/Api.ts

## 2. Project

### 2.1 Built with

- Vite
- ReactJS
- SASS (modules)
- Recharts
- React Router
- JSDoc
- TypeScript

### 2.2 Installation

- Clone the repo
- Move to the root folder
- Run `npm install`
- Run `npm run dev`
- Open your browser and go to http://localhost:5173/ or the given url by Vite
- Enter a user ID, if the user id is invalid you will see and error and will not be able to navigate in the app
- You can also choose to see demo data by clicking on the button "Données d'exemple"
- Enjoy!

You can also run `npm run build` to build the project

### 2.3 Routes

These routes are protected, you will be redirected to the id selector page if you try to access them without selecting a valid ID or not passing an ID in the url.
- `/` - Home page : display a link to the profile page
- `/user/:id` - Profile page : Display the profile of the user and all the graphs
- `/user/:id/activity` - Activity page : Display only the activity graph
- `/user/:id/average` - Average sessions page : Display only the average sessions graph
- `/user/:id/performance` - Performance page : Display only the performance graph
- `/user/:id/score` - Score sessions page : Display only the score graph

- `*` - Error page : Display an error message and a link to the home page

### 2.4 Next steps

- Tests with Vitest
- Implement de missing pages

## Author

- GitHub - [Carl Dev](https://github.com/TheNewDevl)

