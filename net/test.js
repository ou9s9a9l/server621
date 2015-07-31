//var PraseGps = require('./stserver.js')
//var prasegpe = new PraseGps({port:50002});
//var resbdn = require('../public/datejz').getgpsup()
//var resbdn=resourcebdn();
//console.log(resbdn);
var net = require('net');
var client = net.connect({port: 30002,host:"182.92.190.122"},
    function() { //'connect' listener
  console.log('connected to server!');

});
client.on('error',function(err){
console.log(err);
});

client.on('data', function(data) {
  var str = data.toString('hex');


 //console.log(data[1]);
if(send_socket != undefined&&data[0]==0x01&&send_socket.remotePort!=undefined)
 {	if(data[1] == 0x12)
 	{	
 		var dats = str.match(/01\w{18}03/g);
 		dats.forEach(function(dat){
 		
 			var buf = new Buffer(dat,'hex')
 			
 			send_socket.write(transfer(buf));
 		});
 	}
 	else if(data[1] == 0x11)
 	{send_socket.write(transfer(data));}

 }

  //client.end();
});
client.on('end', function() {
  console.log('disconnected from server');
  connect = false;
});
//var buffer = new Buffer('0111A901010001800040000004100008000400020004000400040004000400040004000400040004000400040004000800040002000400040004000400040004000400040004000400040004000400420821841042082184104208218410820828A01042084184104410218420420841841042082184104200000000000000880800000000AA222AA002A00A0200200000025449104014000000126116111111111111111251256622121151151111115511111111111111622212115125121222000000020000000000000000000000800008000082000808000220204400100400102901000000000000000000000000000000000000000000000000000000000000000000000000000000000000FCFFFFFF0F0000030000000000401A5882169482156442159441155481265441E5AAAA6A98442222000000000000000000000000000000000000000000000000000000A08008000008000080088080880800000000000000A02002008808000000020800000000408B02000000000C0000F0FF0540007CFBFFFFFFFFFFFFFF7FFCFFFF7FBC5F032228002C0A000080220000000400F80F000000000000000BB403','hex')
var buffertest = new Buffer('011204000100e689961203','hex')
//01 12 04 00 01 00 ca 8a ee d0 03 01 12 04 00 01 00 ca 8a ee d0 03 01 12 04 00 01 00 1d 0c 93 2e 03
var convert = function(buf1){
			var buf2=new Buffer(500);
			buf2.fill(0x00);
			var b = 0;
			for(var a = 0 ;a<buf1.length;a++)
				if(buf1[a] == 0x10)
					{buf2[b] = 0x10;b++;buf2[b] = 0x90;b++;}
				else if(buf1[a] == 0x01)
					{buf2[b] = 0x10;b++;buf2[b] = 0x81;b++;}
				else if(buf1[a] == 0x03)
					{buf2[b] = 0x10;b++;buf2[b] = 0x83;b++;}
				else
					{buf2[b] = (buf1[a]);b++;}
			var buf3 = buf2.slice(0,b).toString('hex');
			buf3 = '01'+buf3+'03';
			var buf4 = new Buffer(buf3,'hex');
			return buf4;
}
var transfer = function(buf){
	
	//if(buf.toString('hex').indexOf('ff') != -1)
	//	console.log(buf.toString('hex'));
	if(buf[0] == 0xff)
		console.log(buf);
	{if(buf[1] == 0x12)
		{
			var dat = buf.toString('hex');
			if(buf.length%11 !=0)
				{console.log(dat.slice(dat.indexOf('0333')+2));
			console.log(dat);

			console.log('///////////////////////////////////////');}
			//console.log(buf.length/11);
			//12 22  23 33
			var buf1='';
			for(var a = 0;a<buf.length/11;a++)
				 buf1 += convert(buf.slice(a*11+1,a*11+10)).toString('hex')
			return new Buffer(buf1,'hex');

		}
		
	if(buf[1] == 0x11)
		{
			
			var buf1 = buf.slice(1,buf.length-1); 
			return convert(buf1);
		}
	}
}
//console.log(transfer(buffer));

setInterval(function(){
	//console.log("message");
	 if(send_socket != undefined&&send_socket.remotePort!=undefined)
	send_socket.write(buffertest);
},2000);
var send_socket;
  net.createServer(function (socket) {
  // 新的连接
  send_socket = socket;
 console.log('port='+socket.remotePort +' host='+socket.remoteAddress );
  socket.on('data', function (data) {

  	
  });
  socket.on('error',function (err){
   console.log("err:"+err);
  });
  }).listen(8080, function () {
  console.log('trans server bound '+8080);
  });

var dat = new Buffer('011204000100968bb5230333011204000100988b962c030112040001009f8b0fbb03011204000100a18b292103011204000100cf8c71e303ff0100feff011204000100d58c9d5b03','hex')
//console.log(transfer(dat));
var str = dat.toString('hex');
var a = str.match(/ff\w{6}ff/g)
console.log(a);
var b = str.match(/01\w{18}03/g)
console.log(b);

var buf = new Buffer('1234ab','hex')
console.log(buf);

