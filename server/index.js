const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const config = require('./config/config');

app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use('/api/users', require('./routes/user'))
app.use('/api/board', require('./routes/board'))

mongoose.connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('DB Connected!'));


const port = 5000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

