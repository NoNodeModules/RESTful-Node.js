let CustomerModel = require('../models/customer.models');
let express = require('express');
let router = express.Router();

// Create a new customer
// Post localhost:3000/customer
router.post('/customer', (request, response) => {
    // First we check if request has body and it exists
    if(!request.body) {
        return response.status(400).send('Request body is missing');
    }

    // If the response body does not contain a email property, then send back a 406 Not Acceptable error
    if(!request.body.email) {
        return response.status(404)
    }
    /**
     * Incoming object should be look like the following object literal
     * let user = {
     *     name: 'firstname lastname',
     *     email: 'email@example.com'
     * }
     */
    let model = new CustomerModel(request.body);
    // Take the request body object and validate and compare it to our customer model before sending it to the database
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return response.status(500).send(doc);
            }

            response.status(201).send(doc);
        })
        .catch(error => {
            response.status(500).json(error);
        })
});

router.get('/customer', (request, response) => {
    // Checking to see if email exists as one of the parameters in the HTTP request
    if(!request.query.email) {
        return response.status(400).send('Missing URL parameter: user email');
    }

    // Using the rich mongoose API to use methods that add CRUD functionality to our API
    CustomerModel.findOne({

        email: request.query.email
    }).then(doc => {

        response.json(doc)
    }).catch(error => {

        response.status(500).json(error);
    })
});

router.put('/customer', (request, response) => {
    // Checking to see if email exists as one of the parameters in the HTTP request
    if(!request.query.email) {
        return response.status(400).send('Missing URL parameter: user email');
    }

    // Using a mongoose method that finds an element and updates it
    CustomerModel.findOneAndUpdate({
        email: request.query.email
    }, request.body, {
        new: true
    }).then(doc => {

        response.json(doc);
    }).catch(error => {

        response.status(500).json(error);
    })
});

router.delete('/customer', (request, response) => {
    // Checking to see if email exists as one of the parameters in the HTTP request
    if(!request.query.email) {
        return response.status(400).send('Missing URL parameter: user email');
    }

    // Using a mongoose method that finds an element and updates it
    CustomerModel.findOneAndRemove({

        email: request.query.email
    }).then(doc => {

        response.json(doc)
    }).catch(error => {

        response.status(500).json(error);
    })
});

module.exports = router;