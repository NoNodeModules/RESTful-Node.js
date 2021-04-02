let express = require('express');
let router = express.Router();

// QueryString => query, property on the request object
router.get('/person', (request, response) => {
    //localhost:3030/person?name
    if(request.query.name) {
        response.send(`You have requested a person ${request.query.name}`);
    } else {
        response.send('You have requested a person');
    }
});

// Params property on the request object
router.get('/person/:name', (request, response) => {
    response.send(`You have requested a person ${request.params.name}`);
});

router.get('/error', (request, response) => {
    throw new Error('This is a forced error.');
});

// Allows for the export of router for GET requests
module.exports = router;