const fs = require('fs');

module.exports = {
   // method to render quote page
    requestQuotePage: (req, res) => {
        res.render('requestQuote.ejs', {
            title: "Welcome to Fuel Co | Request a Quote"
            ,message: ''
        });
    },
    // method to process requestQuote page
    requestQuote: (req, res) => {
        let message = '';
        let deliveryEmail = req.body.deliveryEmail;
        let gallonsRequested = req.body.gallonsRequested;
        let suggestedPrice = req.body.suggestedPrice;
        let deliveryDate = req.body.deliveryDate;
        let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        deliveryDate += " 00:00:00";
        let usernameQuery = "SELECT * FROM `clientInformation` WHERE email = '" + deliveryEmail + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length == 0) {
                message = 'You are not a client -- please fill out client information first.';
                res.render('add-client.ejs', {
                    message,
                    title: "Welcome to Fuel Co | Add a new client"
                });
            } else {
               let insertQuery = "INSERT INTO fuelQuote (clientId, gallonsRequested, requestDate, deliveryDate, deliveryAddress, deliveryCity, deliveryState, deliveryZipCode, deliveryContactName, deliveryContactPhone, deliveryContactEmail, suggestedPrice, totalAmountDue)" +
                                 "VALUES ('" + result[0].clientId + "', '" + gallonsRequested +"', '" + currentDate +"', '" + deliveryDate + "', '" + result[0].address + "', '" + result[0].city + "', '" + result[0].state + "', '" + result[0].zipCode +
                                 "', '" + result[0].fullName + "', '" + result[0].phone + "', '" + deliveryEmail + "', '" + suggestedPrice + "', '" + suggestedPrice*gallonsRequested + "')"
                db.query(insertQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/quotes');
                });
            }
        });
    },
    // Method to delete a quote
    deleteQuote: (req, res) => {
      let quoteId = req.params.id;
      let deleteUserQuery = 'DELETE FROM fuelQuote WHERE quoteId = "' + quoteId + '"';
      db.query(deleteUserQuery, (err, result) => {
         if (err) {
            return res.status(500).send(err);
         }
         res.redirect('/quotes');
      });
    }
};
