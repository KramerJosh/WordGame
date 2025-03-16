//server.js is where I'll start the server, and serve my routes.  
// right now I'm really only using it to make a call to Rommel's gitub and pull the list of words.

const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/routes'); // Import the routes

const app = express();
const port = 5000;

// I installed cors so that i could make calls from the front end using routes in my back end/ pass info back and forth
app.use(cors({
  origin: 'http://localhost:5173'  // Allow only this origin
}));

// this lets me definte my routes in routes/routes.js and use them here.
app.use(routes);

// starts the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
