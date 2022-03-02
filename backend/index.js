const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

var db = mysql.createConnection({
	host: '',
	user: '',
	password: '',
	database: '',
	rowsAsArray: true,
});

// table name is todos

app.get('/list', (req, res) => {
	db.query('SELECT * FROM todos', function (err, result) {
		res.send(result);
	});
});

app.post('/add', (req, res) => {
	let todo = req.body.todo;
	db.query(
		'INSERT INTO todos(todo) VALUES (?)',
		[todo],
		function (err, result) {
			if (err) throw err;
			res.sendStatus(200);
		},
	);
});

app.post('/remove', (req, res) => {
	let id = req.query.id;
	db.query(
		'DELETE FROM todos WHERE id = (?)', 
		[id], 
		function (err, result) {
			if (err) throw err;
			res.sendStatus(200);
		},
	);
})

app.listen(3001);
