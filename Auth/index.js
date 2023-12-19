const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Safe Code
const userCodes = {};

// Middleware
