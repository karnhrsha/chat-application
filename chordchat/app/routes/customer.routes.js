module.exports = app =>{
    const customers = require('../controllers/customer.controller.js');

    //create a new customer
    app.post("/customers",customers.create);
};