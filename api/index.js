require('dotenv').config()
require('./config/passport/passport')

const db = require('./models/index');
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user');
const real_estateRoutes = require('./routes/real_estate');
const cookieSession = require('cookie-session')
const passport = require('passport')

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY],
    maxAge: 3600
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/user', userRoutes);
app.use('/real_estate', real_estateRoutes);

//force: true  =  DROP TABLE IF EXISTS
db.sequelize.sync( {force: false} ).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at port ${process.env.PORT}`);
    })
});