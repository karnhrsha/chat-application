const sql = require('./db.js');

const Customer = function(customer){
    this.name = customer.name;
    this.email = customer.email;
    this.feedback = customer.feedback;
};

Customer.create = (newCustomer,result) => {
    sql.query('Insert into customers set ?',newCustomer,(err,res) =>{
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        console.log("Created Customer : ",{id:res.insertedId,...newCustomer});
        return (null,{id:res.insertedId,...newCustomer});
    }) 
};



module.exports = Customer;