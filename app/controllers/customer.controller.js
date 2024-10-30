const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    feedback: req.body.feedback
  });

  // Save Customer in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

