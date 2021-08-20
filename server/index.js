const express = require('express');
const config = require('config');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true, limit: '5mb' }))
app.use(cors());


const PORT = config.get('PORT') || process.env.PORT

// Database Connection
mongoose.connect(config.get('mongoURi'), {useNewUrlParser:true, useUnifiedTopology:true})
    .then(result => {
        console.log("DB Connected");
        app.listen(PORT, ()=> console.log(`Server Running at PORT ${PORT}`))
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    })

// Routes    
app.use('/', require('./routes/unauthRoutes'))


