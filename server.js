const express = require('express');
const path = require('path')
const app = express();
const db = require('./models');
const port = process.env.PORT || 3000;
const apiRoutes = require('./routes/apiRouttes')

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use('/api', apiRoutes)
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
})