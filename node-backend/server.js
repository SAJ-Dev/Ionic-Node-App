const express = require('express');
const app = express();
// const moment = require('moment');
const db = require('./server/config/connections');
const http = require('http');
const https = require('https');
const cors = require('cors'); 
const bodyParser = require("body-parser");
const moment = require('moment');

app.use(cors());


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());



//login

app.post('/login', (req, res) => {
  
  var data = req.body;
  console.log(data,"data....")
  
  let sql = 'SELECT * FROM user WHERE email_id=? AND password=?';
  let query = db.query(sql, [data.email_id, data.password], (err, result, fields) => {
      if (err) throw err;
      console.log(result.length);
      if (!result.length) {
          res.json({ msg: 'error' });
      }
      else if(result.length === 1) {
        res.json({ 
          msg: 'success' ,
          user_id:result.user_id,
          user_name:result.name,
          });
        
      } else {
          res.json({ msg: 'error' });
      }
  });
});


//register user

app.post('/register/user', (req, res) => {
  
  var data = req.body;
  
  let sql = 'SELECT * FROM user WHERE email_id=?';
  let query = db.query(sql, [data.email_id], (err, result, fields) => {
      if (err) throw err;
      console.log(result.length);
      if (result.length!=0) {
          res.json({ msg: 'Email already exsits! please sign_in to proceed' });
      }
      else {
        let sql2 = "INSERT INTO user(name,email_id,password) values(?,?,?)";
        let query2 = db.query(sql2, [data.name, data.email_id, data.password], function (err, data) {

        res.json({ 
          success: true,
          user_id: data.insertId,
          user_name: req.body.name,
          msg: 'User registered successfully' });
        });
      }
  });
});



//get employee details



//get all employee details
app.get('/employee/all/get', (req, res) => {
  
  let sql = 'SELECT * FROM employee';
  let query = db.query(sql,(err, result, fields) => {
    // res.send({ success: true, todolist: result });
    res.send({ 
      success: true,
      data: result,
      msg: 'Details on its way...' });
  });
});


//ADD Employee
app.post('/employeelist/add', (req, res) => {
  
  data = req.body
  var CurrentTimestamp = moment().format('DD-MM-YYYY');

  let sql = "INSERT INTO employee(name,mobile,email,created_at) values(?,?,?,?)";
  let query = db.query(sql, [data.name,data.mobile,data.email,CurrentTimestamp],(err, results, fields) => {
    res.json({ success: true, employee_id: results.insertId });
  });
});

//Update
app.put('/employee/update/:employee_id', (req, res) => {
  
  data = req.body

  let sql = "UPDATE employee SET  email= ?, name = ?, mobile = ?  WHERE employee_id = ?"
  let query = db.query(sql, [data.email,data.name,data.mobile,req.params.id],(err, results, fields) => {
    res.send({ success: true, employee_id: req.params.id});
  });
});


//Delete

app.delete('/employee/delete/:id', (req, res) => {
  
  let sql = 'DELETE FROM employee WHERE employee_id = ? ; ';
  let query = db.query(sql,[req.params.id], (err, result, fields) => {
    res.send({ success: true });
  });
});



const port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Listening on port${port}.....`));
