![VideoRepo Logo](videorepo.png)

# VideoRepo Server + Frontend v.1.0.0

## What is VideoRepo?

I am technical bootcamp instructor and have been in the classroom for about 2.5 years. I have amassed quite a collection of lectures and supplementary videos and wanted a way to share them all with current and former students. So in turn, I build this online video repository where videos are stored in a Mongo databased and displayed easily and with filter abilities. All protected by a password, so only valid students and faculty can get access.

### VideoRepo Frontend

Written in React, Frontend is the main user interface for accessing the video repository. It has the following features:

- Password authentication with a server
- Token-based authentication for requests with server
- Retrieves all videos from a server
- Displays all videos and allows a user to filter by class, curriculum, lesson, and subcategory

### VideoRepo Server

The server backend that powers VideoRepo Frontend and VideoRepo Uploader. It includes the following routes:

`POST /api/data`: Retrieves the class video repo, list of classes, list of lessons, list of subcategories, and list of curricula and returns it to the client upon a successful token validation.

`POST /api/auth`: Retrieves a password and validates it with the system password. If the password is correct, create a token and send it back to the client. (This is weak and will eventually change.)

`GET *`: Sends the user to VideoRepo Frontend for `react-router-dom` to frontend handle routing.

#### .env File Template

Here is the template for the .env file, which Server relies on heavily.

```
MONGODB_URI=mongodb://user:password@domain:port/database
PASSWORD=passwordhere
```

#### API Token Generation

I used [passwordsgenerator.net](https://passwordsgenerator.net/) to generate API tokens. These are the paramaters I set.

![passwordsgenerator.net token template](token.png)