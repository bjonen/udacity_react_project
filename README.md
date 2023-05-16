This repository implements the final project of the Udacity React course.

# Project: Employee Polls Web App

The app allows users to add "Would you rather" polls which can be answered
by others.

Users can

1. Add new polls
2. Answer existing polls
3. View their rank in terms of creating and answering polls on a leaderboard

User authentication is implemented in the most basic form. When the app launches the user is logged out.
Throught the dropdown in the navigation bar, the user is able to select the userid he/she wants to impersonate
with.

The project uses createSlice as recommended in the Redux docs. Also the directory structure
follows the current recommendation in the Redux docs.

## Running the app

npm install
npm start

npm start launches a backend server which serves the avatars as well as the actual app.

## Testin the app

npm test

There are two test files

- api.test.js -> Tests interaction with fake API
- App.test.js -> Tests app components and creates screenshots

Finally added css to jest (especially for jest-preview)
npx jest-preview config-cra
