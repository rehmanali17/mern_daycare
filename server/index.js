const express = require('express');
const config = require('config');
const cors = require('cors');
const mongoose = require('mongoose')
const passport = require('passport')
const app = express()

app.use(express.json({ extended: true, limit: '5mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors());
app.use(passport.initialize())
app.use(passport.session())

const PORT = config.get('PORT') || process.env.PORT

// Database Connection
mongoose.connect(config.get('mongoURi'), {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true})
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
app.use('/auth', require('./routes/authRoutes'))
app.use('/user', require('./routes/userRoutes'))





