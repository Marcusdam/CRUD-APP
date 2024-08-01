const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(express.urlencoded({extended:true}))
 app.use(express.json())

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "",
    database: "crud"

});

app.get('/', (req, res) =>{
 const  sql = "SELECT * FROM students ";
 db.query(sql, (err, data) =>{
    if(err) return res.json('Error')
    return res.json(data)
 })
});

app.post('/create', (req, res) =>{
 const  sql = "INSERT INTO  students (`name`, `email`) VALUES (?)";
 const values = [
    req.body.name,
    req.body.email
 ]
 
 db.query(sql, [values], (err, data) =>{
    if(err) return res.json('Error')
    return res.json(data)

 })
});
app.put('/update/:id', (req, res) =>{
 const  sql = "UPDATE students  SET  `name` = ?, `email` = ? WHERE ID = ? "
 const values = [
    req.body.name,
    req.body.email
 ]
 const id = req.params.id
 
 db.query(sql, [...values, id], (err, data) =>{
    if(err) return res.json('Error')
    return res.json(data)

 })
});
app.delete('/students/:id', (req, res) =>{
 const  sql = "DELETE FROM  students  WHERE ID = ? "
 const id = req.params.id
 
 db.query(sql, [id], (err, data) =>{
    if(err) return res.json('Error')
    return res.json(data)

 })
});


const port = 8000
app.listen(port, () =>{
    console.log(`server is listening on ${port}`)
})