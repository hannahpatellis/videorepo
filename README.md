![VideoRepo Logo](videorepo.png)

# VideoRepo Server + Frontend v.1.0.0

## What is VideoRepo?

I am technical bootcamp instructor and have been in the classroom for about 2.5 years. I have amassed quite a collection of lectures and supplementary videos and wanted a way to share them all with current and former students. So in turn, I built this online video repository where videos are stored in a Mongo database and displayed easily and with filter capabilities. All protected by a password, so only valid students and faculty can get access.

### VideoRepo Frontend

Written in React, Frontend is the main user interface for accessing the video repository. It has the following features:

- Password authentication with Server
- Token-based authentication for requests with Server
- Retrieves all videos from Server
- Displays all videos and allows a user to filter by class, curriculum, lesson, and subcategory

### VideoRepo Server

Written in JavaScript and powered by Express.js, the server backend powers VideoRepo Frontend and VideoRepo Uploader. It includes the following routes:

`POST /api/new` Retrieves a new video entry along with an API key, validates the API key with the Mongo database and upon successful validation, writes the new entry to the database. (Route accessed by the VideoRepo Uploader.)

`POST /api/data` Retrieves the class video repo, list of classes, list of lessons, list of subcategories, and list of curricula from a Mongo database and returns it to the client upon a successful token validation.

`POST /api/auth` Retrieves a password and validates it with the system password. If the password is correct, create a token, stores it in the Mongo database, and send it back to the client. (This is weak and will eventually change.)

`GET *` Sends the user to VideoRepo Frontend.

#### .env File Template

Here is the template for the .env file, on which Server relies heavily.

```
MONGODB_URI=mongodb://user:password@domain:port/database
PASSWORD=passwordhere
```

#### API Token Generation

I used [passwordsgenerator.net](https://passwordsgenerator.net/) to generate API tokens. These are the paramaters I set.

![passwordsgenerator.net token template](token.png)

### Run Instructions

To run the application, simply run `yarn start:prod` to run in production mode (only the Express server runs) or `yarn start:dev` to run in development mode (Express server runs along with the React dev server).

## VideoRepo Uploader

Uploader is the backend application for adding new videos to the database. It is written using Electron and currently packaged for macOS. You can find it [here (hannahvideos_uploader)](https://github.com/hannahpatellis/hannahvideos_uploader).