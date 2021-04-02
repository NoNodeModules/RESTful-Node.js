/*
 * Creates an Express application. The express() function is a top-level
 * function exported by the express module.
 */
let express = require('express');
let app = express();
let personRoute = require('./routes/person'); // Setting custom endpoint using express route
let customerRoute = require('./routes/customer');
let path = require('path');
let bodyParser = require('body-parser');

// Allows use to parse the body of any http requests and convert it to JSON as long as the context of the body is set to application/json
app.use(bodyParser.json());

// We are essentially creating a logger here but will be console.log() the information
// will log the following: Wed Mar 31 2021 21:27:31 GMT-0700 (Pacific Daylight Time) => /person
app.use((request, response, next) => {
    console.log(`${new Date().toString()} => ${request.originalUrl}`, request.body);

    next();
});
// Path is relative to the root of the project

app.use(personRoute);
app.use(customerRoute);
app.use(express.static('public'));

// Handler for 404 - Resource Not Found error
app.use((request, response, next) => {
    response.status(404).send('We think you are lost');
});

// Handler for 500 - Server error
app.use((err, request, response, next) => {
    console.error(err.stack);

    response.sendFile(path.join(__dirname, '../public/500.html'));
});
// Setting server port to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));