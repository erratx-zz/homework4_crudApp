> Project description:  This web-application allows the user to add/remove/edit
clients for a fictional fuel company, request/remove quotes for fuel delivery,
and view the data stored for clients and quotes. The packages used in this
project are stored in "package-lock.json"

> How-to-use: To use the app, in the command line navigate to the directory in
which the file "app.js" lives and use the following command:

   | *\homework4_crudApp $ node app.js

Once input, the app will log if the database connection has been established and
what port the server is running on.

> Database information:

To configure WHERE the database for this project lives, in "app.js" the
following code must be altered:
   |const db = mysql.createConnection ({
   |    host: 'localhost',
   |    user: 'root',
   |    password: 'password',
   |    database: 'CS3320'
   |});
Once the database has been connected to, the following database schema is used
to store and access data from the server:

   create database CS3320;
      CREATE TABLE IF NOT EXISTS clientInformation (
         clientId INT AUTO_INCREMENT PRIMARY KEY,
         fullName VARCHAR(255) NOT NULL,
         address VARCHAR(255) NOT NULL,
         city VARCHAR (100) NOT NULL,
         state VARCHAR (2) NOT NULL,
         zipCode VARCHAR (10) NOT NULL,
         phone VARCHAR (10) NOT NULL,
         email VARCHAR (255) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS fuelQuote (
         quoteId INT AUTO_INCREMENT PRIMARY KEY,
         clientId INT NOT NULL,
         gallonsRequested double, NEEDFORM
         requestDate datetime,
         deliveryDate datetime, NEEDFORM
         deliveryAddress VARCHAR (255) NOT NULL,
         deliveryCity VARCHAR (100) NOT NULL,
         deliveryState VARCHAR (2) NOT NULL,
         deliveryZipCode VARCHAR (10) NOT NULL,
         deliveryContactName VARCHAR (255) NOT NULL,
         deliveryContactPhone VARCHAR (10) NOT NULL,
         deliveryContactEmail VARCHAR (255) NOT NULL, NEEDFORM
         suggestedPrice double, NEEDFORM
         totalAmountDue double,
         CONSTRAINT FK_clientId FOREIGN KEY (clientId) REFERENCES clientInformation(clientId)
      );

> File Structure:

This project is structured where the application created by "app.js" uses
"routes" for all javascript methods used to handle server processes and uses
"views" for all ejs views that are rendered in the browser.  This file structure
is used to keep the components organized and is documented below:

   homework4_crudApp:
   |  app.js
   |- routes
   ---|  clientInfo.js           Stores the methods for clientInfo page
   ---|  clients.js              Stores the methods for handling clients
   ---|  index.js                Stores the methods for the index page
   ---|  quoteInfo.js            Stores the methods for quoteInfo page
   ---|  quotes.js               Stores the methods for handling quotes
   |- views
   ---|- partials
   ------|  header.ejs           Stores the header for each page
   ---|  add-client.ejs          Stores the /add page for adding clients
   ---|  clientInformation.ejs   Stores the /clients page for clientInfo
   ---|  edit-client.ejs         Stores the /edit page for editing clients
   ---|  index.ejs               Stores the /page for the homepage
   ---|  quoteHistory.ejs        Stores the /quotes page for quoteInfo
   ---|  requestQuote.ejs        Stores the /request_quote for requesting quotes
