var mysql = require('mysql');
var array = [];

var con = mysql.createConnection({
  host: "localhost",
  user: "sqluser",
  password: "sqluserpw",
  database: "yelp"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var createTable = "CREATE TABLE IF NOT EXISTS rating (ratee VARCHAR(256), stars TINYINT, comment VARCHAR(1024));";
  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

module.exports = {
  deleteRating: function (ratee, stars, comment) {
    con.query("remove * from rating;", [[ratee, stars, comment]], 
    function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });   
  },
    
  getAllRatings: function() {
    con.query("Select * from rating;", function(err, result, fields) {
      if(err) throw err;
      array = [];
      for(var n=0; n < result.length; n++) {
        array.push(result[n]);
        console.log(array);
      }
    }
    );
    return(array);
  },
  
  insertRating: function (ratee, stars, comment) {
    con.query("INSERT INTO rating VALUES ( ? )", [[ratee, stars, comment]], 
    function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });    
  }
};
