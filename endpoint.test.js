const supertest = require('supertest');
const app = require('./app.js');
const { required } = require('joi');
const {validateUserLogin,validateClothing,UserClothing,createUserInfo} =require("./middlewares/validation.js")