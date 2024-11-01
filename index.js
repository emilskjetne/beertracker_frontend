var http = require("http");
var fs = require("fs").promises;

const requestListener = function(req, res){
	console.log(req.url)
	if(req.url === "/"){
		fs.readFile(__dirname + "/public/index.html")
			.then(contents =>{
				res.setHeader("Content-Type", "text/html");
				res.writeHead(200);
				res.end(contents);
			})
			.catch(err => {
				res.writeHead(500);
				res.end(err);
				return;
			});
			return;
	}
	
	if(req.url == "/public/sorrybro.jpg"){
		fs.readFile(__dirname + req.url)
			.then(data => {
				res.writeHead(200, {"Content-Type": "image/jpeg"});
				res.end(data);
			})
			.catch(err=>{
				res.writeHead(500);
				res.end(err);
				console.log(err);
				return;
			})
		return;
	}

	res.writeHead(500);
	res.end();
	return;
};

const server = http.createServer(requestListener);
server.listen("8000", "localhost", ()=>{
	console.log("server is running" + __dirname);
});
