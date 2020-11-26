const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors");

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'candidateDB'
})

app.post('/create', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const dateOfBirth = req.body.dateOfBirth
    const workHistory = req.body.workHistory
    const experience = req.body.experience

    db.query("INSERT INTO candidates (firstName, lastName, dateOfBirth, workHistory, experience) VALUES (?,?,?,?,?)",
        [firstName, lastName, dateOfBirth, workHistory, experience], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values Inserted")
        }
    })
})

app.get('/candidates', (req, res) => {
    db.query("SELECT * FROM candidates", (err, result) =>{
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
})

app.put('/update', (req, res) => {
    const id = req.body.id
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const dateOfBirth = req.body.dateOfBirth
    const workHistory = req.body.workHistory
    const experience = req.body.experience
    db.query("UPDATE candidates SET firstName = ?, lastName = ?, dateOfBirth = ?, workHistory = ?, experience = ? WHERE id = ?",
        [firstName, lastName, dateOfBirth, workHistory, experience, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM candidates WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(5000, ()=> {
    console.log("Running on 5000")
})

