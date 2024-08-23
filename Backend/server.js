const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors
app.use(cors());

const sequelize = require('./utils/database');

const Routes = require('./routes/routes');

app.use('/', Routes);

// Automatic table creation if already no table present
sequelize
    // .sync({force:true})
    .sync()
.then(book => {
    app.listen(3000);    
})
.catch(err=>{
    console.log(err)
});