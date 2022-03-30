require('dotenv').config();

const express       = require('express');
const app           = express();
const PORT          = process.env.PORT || 3000;
const cors          = require('cors');
const bodyParser    = require('body-parser');
const modules       = require('./modules');

// Load Middleware
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());

app.get('/', function (req, res) {
    res.send('Rolling Apps');
  })

Object.keys(modules).forEach((controller) => {
    app.use(modules[controller]);
})

app.use((req, res, next) => {
    let err = new Error('URL Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err)
    console.log(err.status);
    let response    = {
        status: err.status,  
        message: err.message, 
        data: null
    };

    return res.send(response);
})

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));