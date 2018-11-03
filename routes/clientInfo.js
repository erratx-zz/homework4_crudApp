module.exports = {
    clientInformationPage: (req, res) => {
        let query = "SELECT * FROM `clientInformation` ORDER BY clientId ASC"; // Query used to get every client
        // Execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/clients');
            }
            res.render('clientInformation.ejs', {
                title: "Welcome to Fuel Co | View Clients"
                ,clients: result // Clients is used to render the table of clients
            });
        });
    }
};
