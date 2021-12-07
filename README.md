# Goal-Quest-API
An API Created with express, mongoDb, mocha, gitHub actions and heroku.

### Install Dependencies 

```
npm install
```

### Run

```
#production mode
npm run start
#development mode
npm run dev
```
### Running Tests
It uses Mocha framework and supertest for integration testing.</br>
Tests are run using `mongodb-memory-server` an in-memory mongodb instance
```
npm run test
```

### Env Variables
I have set it up in such a way `config/index.js` exports our environment values based on NODE_ENV. </br>
Create a .env file in then root and add the following

```
#Local/Development Environment
MONGO_URI_DEV = Your MongoDB URI
DEV_PORT = 5000
 
#TEST ENV
MONGO_URI_TEST = //Not Needed
TEST_PORT = 5001

#production ENV
MONGO_URI = Your MongoDB URI
PORT = 6000

#General
JWT_SECRET = secret

```
### GitHub Actions
> Alternatively, you can disable github actions </br>

It uses a workflow to first run tests on our API and if all checks are passed, deploy it to heroku. </br>
You need to create Following `Action secrets` in the repo if you wish to use the same workflow
```
EMAIL = Your heroku email
HEROKU_API_KEY = 
JWT_SECRET = 
PORT = 
# The ones below may not be needed
MONGO_URI = 
NODE_ENV = 
```
Also Edit the following heroku_app_name with your app name in .github/workflows/node.js.yml

`heroku_app_name: 'goalquestapi'`

### Heroku Configuration and Config Vars
Go to setting of your heroku app and add these `Config Vars`
```
JWT_SECRET = 'Secret_used_for_encryption'
MONGO_URI = 'Uri for your hosted/ Cloud MongnDb instance'
NODE_ENV = 'production'
```

### Seed Database
You can use the following commands to seed the database with some sample users & destroy all data
Cautious!
```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
