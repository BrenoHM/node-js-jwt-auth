const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./app/models");
const initial = require('./app/models/initial');

const app = express();

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});