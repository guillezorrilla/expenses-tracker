const express = require('express');
const app = express();
const cors = require('cors');
// mongodb connection
const connectionDb = require('./db/connection.js');
require('dotenv').config({ path: './config.env' });

const routes = require('./routes/route');

const port = process.env.PORT || 6000;

// use middlewares

app.use(cors());
app.use(express.json());
app.use(routes);

connectionDb
  .then((db) => {
    if (!db) return process.exit(1);

    // listen to the http server
    app.listen(port, () => console.log(`Server started on port ${port}`));

    app.on('error', (err) =>
      console.log(`Failed To Connect with HTTP Server: ${err}`)
    );
    // error in mongodb connection
  })
  .catch((err) => {
    console.log('Connection Failed ${err}');
  });
