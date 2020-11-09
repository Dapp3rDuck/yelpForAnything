const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dao = require('./dao.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
});

app.get('/admin', (req, res)  => {
    res.status(200).sendFile('admin.html', {
        root: path.resolve('../public')
    });
})

app.get('/insertRating', (request, response)  => {
    
    var ratee = request.query.ratee;
    var stars = request.query.stars;
    var comment = request.query.comment;
    
    dao.insertRating(ratee, stars, comment);

    response.status(200).send( {});
})

app.get('/getRatings', (request, response)  => {
    //TODO: connect to the database, select all ratings, and return them in an HTML table or similar
    var array = dao.getAllRatings();
    var send = "<table id='ratings'><tr class='first-row'><td>Ratee</td><td>Stars</td><td>Comment</td></tr>";
    for(var i = 0; i < array.length; i++) {
        send += "<tr><td>" + array[i].ratee + "</td><td>" + array[i].stars + "</td><td>" + array[i].comment + "</td></tr>";
    }
    send += "</table>";
    response.status(200).send(send);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
