module.exports = {
    getQuotesPage: (req, res) => {
        let query = "SELECT * FROM `fuelQuote` ORDER BY clientId ASC"; // SQL statement to query all quotes
        // Execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/quotes');
            }
            res.render('quoteHistory.ejs', {
                title: "Welcome to Fuel Co | View Quotes"
                ,quotes: result // Quotes result used in quoteHistory.ejs to render table
            });
        });
    }
};
