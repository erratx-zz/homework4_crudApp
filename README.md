# Project description
This web-application allows the user to add/remove/edit
clients for a fictional fuel company, request/remove quotes for fuel delivery,
and view the data stored for clients and quotes. The packages used in this
project are stored in "package-lock.json"

# Prerequisites

To use this web-app it is assumed you have the following installed:
* NodeJS
* MySQL

# Instructions

In order to setup the database used, start by running the "setup.sql" file with the following command.  
```
$ mysql -u root -p < setup.sql
```

In order to make sure that the app uses the proper authentication, in the file "app.js" alter the following code with the requisite information:

``` javascript
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CS3320'
});
```
Once the database has been setup, simply input the following command:

```
$ node app.js
```

And then connect to the app at `http://127.0.0.1:<port>` using the port provided by the app.
