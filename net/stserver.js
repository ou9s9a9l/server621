var PraseGps = require('./PraseGps.js')//PraseGps解析的数据不能有“丰达00”这样结尾是0的
//prasegpe.setenv('develop');
var stream = require('stream');
var fs = require('fs')
var str ;
var sockets = new Array;
var rss = new Array;
var net = require('net');
var bcastcontent = '';

module.exports = moduleout;

moduleout.prototype.sendtext = function (str){

  if(bcastcontent != str)
  {
    console.log('rss.length:'+rss.length);
    console.log(new Date());
    for(var a=0;a<rss.length;a++)
    {

    rss[a].push(str);
    bcastcontent = str;

   
  
    }
  }
}

var connect = false;
setInterval(function(){
  for(var a=0;a<rss.length;a++)
    {
      rss[a].count++;
      if(rss[a].count>6)
        {rss.splice(a,1);console.log('splice:'+a);}
    }
  }, 5000);
function moduleout(option){
var options = option||{}; 

  var client ;
  setInterval(function(){
  if(connect == false)
  { //client = creat_server({port: 7001,host:"123.57.210.193"});
  //client = creat_server({port: option.remoteport||7001,host:option.remoteip||"192.168.8.102"});
  //console.log('start connect');
  
  } 
  }, 10000);


net.createServer(function (socket) {
  // 新的连接
  
  console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
  socket.count = 0;
  sockets.push(socket);
  //console.log(sockets.length);
  new_rs(socket,client);  
//console.log(socket.id.toString());
  socket.on('data', function (data) {

	var flag = 0;
  	for(var a=0;a<rss.length;a++)
	{
		//console.log(rss[a].port);
		if(rss[a].port == socket.remotePort)
			{rss[a].count = 0;flag=1}
	}
	if(flag == 0)
	{
	new_rs(socket,client);
	}

  //  console.log(data);
  //  sockets = sockets.slice(0);
    //console.log(sockets.length);
    var str = data.toString();
    //console.log('data: '+str);
	for(var a=0;a<rss.length;a++)
	{
    
	//if(rss[a].firstcast == false)
   //  { console.log('firstcast:'+rss[a].firstcast+'port:'+rss[a].port);rss[a].push('登陆语音提示系统');rss[a].firstcast = true;}
		//console.log('rss[a].port: '+rss[a].port+' socket.remotePort: '+socket.remotePort);
    if(rss[a].port == socket.remotePort)
		    {rss[a].push(str+'ffff'+socket.remotePort);}
	} 
  //110000dd4f9a5b57536d51f7530000dd4f9a5b57533575a1520000
  //110000dd4f9a5b57536d51f75300007972d176a47fc47e0000//tejian
//rs.push(str+'ffff'+socket.remotePort);	
//console.log('rss length'+rss.length)
   // console.log(data+'\n');
  
});
   socket.on('error',function (err){
   console.log("need:"+err);
  });
}).listen(option.port, function () {
  console.log('server bound '+option.port);
});



function new_rs(socket,client){
console.log('new_rs/////////////////////////////////////////')
   var rs = new stream.Readable({ objectMode: true });
   
  rs.on('error',function (err)//必须监听  否则出event的错
	  {
		//console.log(err);//
    }
	);
    socket.on('error',function (err)
    { 
    console.log('socket error');
    }
  );

 
  socket.on('unpipe', function(err) {
    console.log('unpipe');
  for(var a=0;a<rss.length;a++)
    {
      //console.log('NUM:'+a+'port:'+rss[a].port);
      //if(rss[a].port == socket._peername.port)
      //{
      //console.log('rss port:'+rss[a].port);
      rss = rss.slice(a+1);
     // console.log('rss:'+(a+1)+' is sliced');}
    }
  
  });
  option.rsport = socket._peername.port;
  option.client = client;
  var prasegpe = new PraseGps(option)
  //{"device":"旧站车务二号机","group":"旧站车务定点防护","gps":"\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000"}
  
  rs.pipe(prasegpe).pipe(socket);
  rs.on('end',function(){console.log('message');})
  rs.port = socket.remotePort;
  rs.count = 0;
  rs.firstcast = false;
  rss.push(rs);
  console.log('rsslength:'+rss.length);
}

function creat_server(options){
options = options||{port:8080,host:"192.168.1.9"}
var net = require('net');


var client = net.connect(options,
    function() { //'connect' listener
  console.log('connected to server!');
  connect = true;

  });
  client.on('error',function(err){
  console.log(err);
  if(err.code == "ECONNRESET")
  connect = false;
  });
  client.on('data', function(data) {
    console.log(data.toString());
    //client.end();
  });
  client.on('end', function() {
    console.log('disconnected from server');
  connect = false;
});
  return client;
 };




};
