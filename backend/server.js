// import modules
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
// create an express application
const app = express();
// create a path, saved in 'uploads' variable
const uploads = path.join(`${__dirname}/../frontend/assets/`);

// express fileupload's default options (uploaded file is accessible from 'req.files.')
app.use(fileUpload());
// serve images, CSS files, and JavaScript files in a directory named 'assets'
app.use('/assets', express.static(`${__dirname}/../frontend/assets`));

// requesting data with GET method
app.get('/', (req, res) => {
	// as response, the index.html is sended
	res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.get('/admin', (req, res) => {
	// as response, the index.html is sended
	res.sendFile(path.join(`${__dirname}/../frontend/admin.html`));
});


app.get('/admin-order', (req, res) => {
	// as response, the index.html is sended
	res.sendFile(path.join(`${__dirname}/../frontend/assets/order.json`));
});

// prepare two empty arrays, for data
let order = [];
let jsonData = [];
// requesting data with POST method
app.post('/', (req, res) => {
	// save the formData's data from the body (data sent to the server with POST is stored in the request body of the HTTP request)
	const pizzaData = req.body;
	const formData = req.body;
	// push the formData to the jsonData's array (it's the data from the input fields)
	jsonData.order.push(formData);
	// if pizzaData exists (got any data)
	if (pizzaData) {
		// push the data to the order's array (it's the data of the ordered pizzas)
		order.pizza.push(pizzaData);
		// with the fs modul's writeFile method, the sringified order's data is writed to the order.json file.
		fs.writeFile(`${uploads}order.json`, JSON.stringify(order), (error) => {
			// if an error occurs
			if (error) {
				// console log that error
				console.log(error);
			};
		});
	}
	// with the same method, the sringified jsonData's data is writed to the order.json file.
	fs.writeFile(`${uploads}order.json`, JSON.stringify(jsonData), (error) => {
		// if an error occurs
		if (error) {
			// console log that error
			console.log(error);
		};
	});
});



// save the port in 'port' variable
const port = 9000;
// listens for connections on the specified host and port.
app.listen(port, () => {
	// log the used IP address, and port
	console.log(`http://127.0.0.1:${port}`);
});