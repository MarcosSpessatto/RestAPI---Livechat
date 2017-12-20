# RestAPI - Livechat [![Build Status](https://travis-ci.org/MarcosSpessatto/RestAPI-Livechat.svg?branch=master)](https://travis-ci.org/MarcosSpessatto/RestAPI-Livechat) [![Coverage Status](https://coveralls.io/repos/github/MarcosSpessatto/RestAPI-Livechat/badge.svg?branch=master)](https://coveralls.io/github/MarcosSpessatto/RestAPI-Livechat?branch=master)
<p align="center">
  <img width="200" height="200" src="https://d14xs1qewsqjcd.cloudfront.net/assets/logo.svg">
</p>

This is a little example of an RestAPI using [MeteorJS](https://www.meteor.com/) And [Iron Router](http://iron-meteor.github.io/iron-router/)

### Features:
* CRUD Departments

### Requirements
- [Git](https://git-scm.com/downloads)
- [MeteorJS 1.6](https://www.meteor.com/install)  
- [NodeJS LTS](https://nodejs.org/en/download/)

### Getting Started

    # Get the repo
    git clone https://github.com/MarcosSpessatto/apirestmeteor.git
    
    # Change directory
    cd restapi-livechat
    
    # Install Meteor dependencies(with admin roles)
    meteor npm install
    
    # Install NPM dependencies
    npm install
    
    # Run the API
    npm start
    
    # Run unit tests
    npm run test - Single run
    npm run test:watch - Live mode
    npm run coverage - Coverage - Html Reporter at ./tests/coverage-unit
    
    # Run integration tests (* Important, you should be running the project in one tab to run integration tests *)
    npm run test:integration - Single run
   
   ### Documentation
  - [RestAPI - Livechat](https://marcosspessatto.github.io/RestAPI-Livechat/)


   ### License
  - [MIT](https://opensource.org/licenses/MIT)
