const serverless = require('serverless-http');
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express();

const router = require('./routes');

app
.use(express.json())
.use(cors())    
.use('/api/', router) 
app.use((err, req, res, next) => {
    console.error('error in api login', err.stack); // Log the error
    res.status(err.status || 500).json({
        status: false,
        message: err.message || 'Internal Server Error',
    });
});
// const server = app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
module.exports.handler = serverless(app);
