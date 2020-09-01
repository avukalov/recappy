const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const busboyBodyParser = require('busboy-body-parser');

const app = express();

// Connect Database
connectDB();
require('./config/redis');

require('./models');

const routes = require('./routes');

// Init Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(busboyBodyParser());

// Define Routes
app.use('/api', routes);

// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..//client/build/index.html'));
// });

const PORT = 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
