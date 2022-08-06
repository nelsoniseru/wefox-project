# WEFOX TECHNICAL CHALLENGE

This is A node.js express based RESTful Wefox api.

# Technologies used
-   Node.js
-   Express.js
-   Restful API
-   MongoDB & Mongoose
-   APIs Authorization GITHUB OAUTH2.O AND (JWT)
-   Docker


# How to use

## 1. Clone Project into your local machine

```
git clone git@github.com:nelsoniseru/wefox-project.git
```

## 2. Go into project folder and install project dependencies.

```
cd wefox-project && npm install
```

## 3. Connecting to Database

### Default DB URIs are as follows:

Please make sure mongoDB Server service is installed and running on your localhost:27017.
if your are using docker you can simply use the first url, otherwise use the second url
```
MONGODB_LOCAL=mongodb://nelson:mypassword@mongo/?authSource=admin
MONGODB_LOCAL=mongodb://127.0.0.1:27017/users
r
```
> Alternatively, if you would like to connect DB remotely, just change DB URIs in `.env` file.

> For more details about MongoDB, click [here](https://www.mongodb.com/).

 
## 4. Start project
This is applicable when you are running the project without docker
```
npm run dev
```
# you need to client id and client secret from github please click [here] (https://github.com/settings/apps)
Then you put the client id and client secret in the constant file inside utils folder
module.exports.GITHUB_CLIENT_ID = ""
module.exports.GITHUB_CLIENT_SECRET= ""

# we simply need to allow access thats get access token in exchange for the user
go to the browser and type the link below to allow access and generate access token after doing that a token response would be sent
```
http://localhost:4000/login/github
```
> #### Docker needs to be installed in your OS. To install Docker, please click [here](https://docs.docker.com/get-docker/) .

> #### Please make sure you have followed Step 1 ~ Step 3 as above.

### In your terminal, start Docker service

```
docker-compose up
```

# Accessing mongo-express for docker

## simply just use this url
```
http://localhost:8080/
```

# APIs Authorization

## When calling these protected APIs, make sure you add %BearerToken% in `Authorization` request Header.
```
Authorization: Bearer <accessToken>
```

## How to get accessToken ?

When user successfully grant github access a token would be generated.


# Level access

## This particular routes are accessed only by logged in users

| APIs                   | Method | Desc                                     | AccessToken |
| -----------------------| ------ |---------------------------  ------------ |             |
| /api/weather           | post   | get the weather for a certain lat and lon| Required    |


# Available APIs

## Auth


| APIs                      | Method |         Desc            |
| ------------------        | :----: | :-------------------:   |
| /login/github             |  get   | to redirect to callback |
| /login/github/callback    |  get   | to generate token       |

## map

| APIs                    | Method | Desc                                           | AccessToken |
| ------------------------| ------ |------------------------                        | ----------- |
|/api/user-address        | POST   | Create a user address details                  |             |
| /api/weather            | POST   |  create a weather of a particular address      | Required    |

# Models
## useraddress  field
| Field           | Type   | 
| --------------- | ------ |
| street          | string |
|   town          | string |       
| postalCode      | number | 
|  country        | string |               


## User model
| Field           | Type   | 
| --------------- | ------ |
| userID          | string |
| email           | string |       

  


# DEVELOPER
NAME: NELSON ISERU,
JOB-TYPE:NODEJS BACKEND ENGINEER


