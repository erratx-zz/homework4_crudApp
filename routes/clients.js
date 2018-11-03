const fs = require('fs');

module.exports = {
   // Method for rendering add client information page
    addClientPage: (req, res) => {
        res.render('add-client.ejs', {
            title: "Welcome to Fuel Co | Add a new client"
            ,message: ''
        });
    },
    // Method for adding a client using the add client information page
    addClient: (req, res) => {
        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let address = req.body.address;
        let city = req.body.city;
        let state = req.body.state;
        let zipCode = req.body.zipCode;
        let phone = req.body.phone;
        let email = req.body.email;
        let usernameQuery = "SELECT * FROM `clientInformation` WHERE fullName = '" + first_name + " " + last_name + "' AND email = '" + email + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Client already exists';
                res.render('add-client.ejs', {
                    message,
                    title: "Welcome to Fuel Co | Add a new client"
                });
            } else {
                let query = "INSERT INTO `clientInformation` (fullName, address, city, state, zipCode, phone, email) VALUES ('" +
                    first_name + " " + last_name + "', '" + address + "', '" + city + "', '" + state + "', '" + zipCode + "', '" + phone + "', '" + email + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/clients');
                });
             }
        });
    },
    // Method for rendering the edit client information page
    editClientPage: (req, res) => {
        let clientID = req.params.id;
        let query = "SELECT * FROM `clientInformation` WHERE clientId = '" + clientID + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-client.ejs', {
                title: "Edit  Client"
                ,client: result[0]
                ,message: ''
            });
        });
    },
    // Method for editing a client using the edit client information page
    editClient: (req, res) => {
        let clientID = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let address = req.body.address;
        let city = req.body.city;
        let state = req.body.state;
        let zipCode = req.body.zipCode;
        let phone = req.body.phone;
        let email = req.body.email;

        let query = "UPDATE `clientInformation` SET `fullName` = '" + first_name + " " + last_name +
                    "', `address` = '" + address +
                    "', `city` = '" + city +
                    "', `state` = '" + state +
                    "', `zipCode` = '" + zipCode +
                    "', `phone` = '" + phone +
                    "', `email` = '" + email +
                    "' WHERE `clientInformation`.`clientId` = '" + clientID + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/clients');
        });
    },
    // Method for deleting a client
    deleteClient: (req, res) => {
      let clientID = req.params.id;
      let deleteUserQuery = 'DELETE FROM clientInformation WHERE clientId = "' + clientID + '"';
      db.query(deleteUserQuery, (err, result) => {
         if (err) {
            return res.status(500).send(err);
         }
         res.redirect('/clients');
      });
    }
};
