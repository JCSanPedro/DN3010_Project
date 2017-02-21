var queue_server = require('../queue_server'),
	assert = require('assert'),
	http = require('http'),
	should = require('should'),
	request = require('supertest');;

describe('queue_server', function () {

  before(function () {
    queue_server.listen(4000);
  });

  after(function () {
    queue_server.close();
  });

});

request = request('http://localhost:4000');

/**
*	Test that the push method will return a response with status 200 when posting a correct JSON object
*
**/
describe('/queue/push', function () {
  it('should return 200', function (done) {

  	request.
	post('/queue/push').
	send({ "var1" : "val1" }).
	expect(200).
	end(function(err, res) {
		if (err) done(err);
	    done(err);
	});
      
  })
});

/**
*	Test that the get count method will return a response the correct object and the correct amount of elements
*
**/
describe('/queue/count', function () {
  it('should return obj with property count=1', function (done) {

  	request.
	get('/queue/count').
	send().
	expect(200).
	end(function(err, res) {
		if (err) done(err);

		res.body.should.have.property('count');
		res.body.count.should.equal(1);

	    done(err);
	});
      
  })
});

/**
*	Test that the pop method will return a response the correct JSON object
*
**/
describe('/queue/pop', function () {
  it('should return obj with property var1, id, and timestamp', function (done) {

  	request.
	post('/queue/pop').
	send().
	expect(200).
	end(function(err, res) {
		if (err) done(err);

		console.log("Return obj " + JSON.stringify(res.body));


		res.body.should.have.property('var1');
		res.body.should.have.property('id');
		res.body.should.have.property('timestamp');
		res.body.id.should.equal(0);

	    done(err);
	});
      
  })
});

/**
*	Test that the pop method will return a response the first JSON object in queue
*
**/
describe('/queue/pop with multiple elements in queue', function () {
  it('should return first obj in queue', function (done) {

  	//First send two requests to push two JSON objects then a request to pop

  	request.post('/queue/push').send({ "var1" : "val1" }).end(function() {
  		request.post('/queue/push').send({ "var2" : "val2" }).end(function() {
  			request.post('/queue/pop').send({ "var1" : "val1" }).end(function(err, res) {
  				res.body.should.have.property('var1');
  				done();
  			});
  		});
  	});
  })
});

/**
*	Test that the push method will return a response with status 200 when posting a correct JSON object
*
**/
describe('/queue/push', function () {
  it('should return 500 due to incorrect req body', function (done) {

  	request.
	post('/queue/push').
	send("a").
	expect(500).
	end(function(err, res) {
	    done();
	});
      
  })
});
