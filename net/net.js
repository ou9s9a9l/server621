
var soc; 
var net = require('net');
var dat,a;
var firstdat = false;
var tcpstate;
var buf1=new Buffer(1);
var soa,sob;
arr=new Array();//可以10个链接
module.exports.resocket = function (){
  return soa;
}
module.exports.set7070 = function (){
net.createServer(function (socket) {
  if(arr.length>10)
    arr.length=0;
  arr.push(socket);
  socket.on('close', function (data) {
  for (var i = 0; i < arr.length; i++) 
  if(socket == arr[i])
      arr.splice(i,1);
  });
}).listen(7070, function () {
  console.log('send server bound '+7070);
});
}

module.exports.set23 = function (io,port,zm){
net.createServer(function (socket) {
  // 新的连接

 soa=socket;
  //\tcpsendserver.socket.write(0x31);
 


  tcpstate='open';
  io.emit('tcpstate', { dat:tcpstate});
 
  console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
  //console.log(socket.id.toString());
   socket.on('close', function(err) {
    tcpstate='close';
    io.emit('tcpstate', { dat:tcpstate});
    });
  socket.on('data', function (data) {
   
    
    soa.write("1");

  for (var i = 0; i < arr.length ; i++) {
      console.log(arr);
      console.log(arr.length);
      arr[i].write(data);
  }; 

   array=new Array(data.length);
   for(a=0;a<data.length;a++)
    {
      array[a]=data[a];
      array[a]=array[a].toString(16);
       if(array[a].length==1)
        array[a]="0"+ array[a];
    }

    io.in(zm).emit('data', { dat:array });
  });
}).listen(port, function () {
  console.log('server bound '+port+' at '+zm);
});

/////////////////////////////////////////////////////////////////////////////////




}
