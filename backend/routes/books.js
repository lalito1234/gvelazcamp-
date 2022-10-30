var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display books page
router.get('/', function(req, res, next) {
    console.log();
    if(req.query.char_id !== undefined){
        dbConn.query('SELECT * FROM comments Where char_id='+req.query.char_id+' ORDER BY id desc',function(err,rows)     {
 
            if(err) {
                req.flash('error', err);
                // render to views/books/index.ejs
                res.send({data:'hello world'});   
            } else {
                // render to views/books/index.ejs
                res.send({data:rows});
            }
        });
    }else{
    dbConn.query('SELECT * FROM comments ORDER BY id desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.send({data:'hello world'});   
        } else {
            // render to views/books/index.ejs
            res.send({data:rows});
        }
    });
}
});


// add a new book
router.post('/add', function(req, res, next) {    

    let comment = req.body.comment;
    let name = req.body.name;
    let char_id = req.body.char_id;
    let errors = false;

    // if no error
    if(!errors) {

        var form_data = {
            name: name,
            comment:comment,
            char_id:char_id
        }
        
        // insert query
        dbConn.query('INSERT INTO comments SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                res.send({'error':err})
            } else {                
                res.send({status:200 , msg:'comment add successfully'})
            }
        })
    }
})

module.exports = router;