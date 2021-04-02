// First: Reference mongoose using express
let mongoose = require('mongoose');

const server = 'nodeexample.wog0u.mongodb.net';
const database = 'Example?retryWrites=true&w=majority';
const user = 'juan';
const password = 'tiger108';

mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}`);

let CustomerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Customer', CustomerSchema);