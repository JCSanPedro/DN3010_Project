var express = require('express');
var bodyParser = require('body-parser');

var app = express();


var queue = {
	data : [],
	push : function(obj) {
		return this.data.unshift(obj);
	},
	pop : function() {
		return this.data.pop();
	}
};

var id = 0;

app.use(bodyParser.json());

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('err')
})

// POST request to pop from queue
app.post('/queue/pop', function (req, res) {
   console.log("Got a POST request to pop");

   var obj = queue.pop();
   var time = new Date();
   var timestamp = time.toLocaleTimeString();
   obj["timestamp"] = timestamp;

   res.set('Content-Type', 'application/json');
   res.status(200);
   res.send(obj);

   console.log("Queue is " + JSON.stringify(queue.data));
})

// POST request to push into queue
app.post('/queue/push', function (req, res) {
   console.log("Got a POST request to push");
   console.log("Content Type of request is " + req.get('Content-Type'));

   var obj = req.body;

   console.log("JSON object to push is " + JSON.stringify(obj));

   obj["id"] = id;
   id++;

   queue.push(obj);

   res.status(200);
   res.send(obj);

   console.log("Queue is " + JSON.stringify(queue.data));
})

// GET request to get count
app.get('/queue/count', function (req, res) {
   console.log("Got a GET request to count");

   res.set('Content-Type', 'application/json');
   res.status(200);
   res.send({count : queue.data.length});
})

var server = app.listen(4000, '127.0.0.1', function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})