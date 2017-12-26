const http = require('http');
const fs = require('fs');
const queryString = require('querystring');


http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	let str = '';
	req.on('data',function(data){
		str += data;
	})
	req.on('end',function(err){
		if(err) throw err;
		let json = queryString.parse(str);  //将前台传过来的字符串变为对象
		fs.readFile('./date.txt','utf8',function(err,data){
			if(err) throw err;
		 	let json1 = JSON.parse(data);
			if(json1[json.user]){
				res.write('账号已注册');
				res.end();
			}else{
				json1[json.user] = json.pass;  //json对象赋值{"xiebin":"123456"}
				fs.writeFile('./date.txt',JSON.stringify(json1),function(err){
						if(err) throw err;
						res.write('注册成功');
						res.end();
					})			
			}			
		})
	 })

}).listen(8888)
//登陆
http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	let str = '';
	req.on('data',function(data){
		str += data;
	})
	req.on('end',function(err){
		if(err) throw err;
		let json = queryString.parse(str);
		fs.readFile('./date.txt','utf8',function(err,data){
			if(err) throw err;
			let json1 = JSON.parse(data); //object
			//json1['xiebin']   123456
			// json.pass   123456
			if(json1[json.user] == json.pass){ // 123456 == 123456
				res.write('登陆成功');
				res.end();
			}else{
				res.write('账号密码错误');
				res.end();
			}
		})
	})
}).listen(8004)

http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	let str = '';
	req.on('data',function(data){
		str += data;
	})
	req.on('end',function(err){
		if(err) throw err;
		let json = queryString.parse(str);  //将前台传过来的字符串变为对象
		fs.readFile('./content.txt','utf8',function(err,data){
			if(err) throw err;
		 	let json1 = JSON.parse(data);
			if(json1[json.user]){
				res.write(data);
				res.end();
			}else{
				json1[json.user] = json.pass;  //json对象赋值{"xiebin":"123456"}
				fs.writeFile('./content.txt',JSON.stringify(json1),function(err){
						if(err) throw err;
						res.write(data);
						res.end();
					})			
			}			
		})
	 })

}).listen(3000)