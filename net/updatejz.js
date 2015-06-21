
var net = require('net');
var fs = require('fs');
  var ch,cl;
function crc16(buf)
{
  
  var crc=0;
  for(var j = 129; j > 1; j--)
  {
    //累加和校验
    crc += parseInt(buf[j]);
    
  }
  
  ch = parseInt(crc / 256);
  cl = crc % 256;
}

var resource = require('../public/datejz')
var res=resource.returndatres();

  var resetflag=0;//是否写程序开关  主动

  var buflen=128;
var buf=new Buffer(buflen+4);
var buf1=new Buffer(buflen+4);
var len,len1;
var datlen;
  var count=1;//升级包计数

  
  var rewrite=1;//第写几个包
  var filearray=new Array()
     filearray[1]='public/package.bin';
     filearray[2]='public/adc.bin';





var range1 = this;
module.exports = Server;


function Server(io,port,zm){

var EventEmitter = require('events').EventEmitter;  
var ee = new EventEmitter();
this.ZM=zm;
var range=this;
//var sock;
var socktemp;
    creatserver(io,port,range,ee);

  ee.on('complete', function(socket) {
    console.log(socket.socket.remotePort );
    sock=socket.socket;
    //this.sock=socket.socket;
    data(io,zm,sock,port);update(io,sock);console.log('2 server complete');

  });



//this.port = port;
};//serverc


Server.prototype.setflag = function (io,dat){
  //console.log('setflag');
if(resetflag==1)resetflag=0;
  else {resetflag=1;
io.emit('success', { dat:"writedat:"+dat });
  this.sock.write(dat);}
//console.log(range==this);
  console.log("port "+this.sock.remotePort+this.ZM);
   io.emit('success', { dat:"resetflag = "+resetflag });
   
};


Server.prototype.greet = function() {
     console.log("Hi, I'm " + this.name);
    };

function creatserver(io,port,range,ee){
var tcpsendserver1 = net.createServer(function (socket) {
  // 新的连接

  console.log('port='+socket.remotePort +' host='+socket.remoteAddress );
 // sock=socket;
  if(socket!=undefined)
  range.sock=socket;
  console.log("this sock: "+ range.sock.remotePort);
  ee.emit('complete',{socket:socket});
 
  io.emit('success', { dat:"connected" })
    //soc=socket;
   /*

    console.log('timer');
var timer = setInterval(function(){
          if(resetflag==1&&write1<1)
          {soc.write("2");console.log("write");write1++;}
          },4000);*/

socket.on('close', function (socket) {
  console.log('socket end' );
   });
 socket.on('error', function (err) {
    var errorMsg
      = 
       err.stack || err.message || 'unknow error'
      + '\n'
      ;
    console.error(errorMsg);
 });
////////////////////////////////////////

//////////////////////////
});
  
tcpsendserver1.listen(port, function () {
  console.log('server '+port+' bound');
});

}






/////////////////////////////////////gengxin
function update(io,sock) {
var writeable=0;//是否可以向下传输升级程序  被动





 sock.on('data', function (data,err) {
if(resetflag){
     if(data[0]==0x43)
    {
        
        var buftemp=new Buffer(1);
        buftemp[0]=0x01;
        //console.log("buftemp is "+buftemp);
        sock.write(buftemp);
        count=1;
        if(writeable==0)writeable=1;
        //console.log("rewrite = "+rewrite);
    }
    if(data[0]==0x06)//send success .  next pack
    {
   // if(count<len)
   // {
      //console.log("0x06");
      if(count>1&&count<len+1)
      {
        var buftemp=new Buffer(1);
        buftemp[0]=0x01;
        sock.write(buftemp);
       // console.log(buftemp);
      }
      if(count==len+1)//结束
      {
        var buftemp=new Buffer(1);
        buftemp[0]=0x04;
        sock.write(buftemp);
        resetflag=1;
        count=1;
        if(rewrite==1) rewrite=2;
        else if(rewrite==2) rewrite=1;
            console.log("message="+rewrite);
           io.emit('success', { dat:"升级成功" })
         writeable=0;
      }
    
      if((rewrite==1||rewrite==2)&&writeable==1)
        {
        
           fs.readFile(filearray[rewrite], function(err,data){

            datlen=data.length;
            len1=parseInt(datlen/buflen+1)
            len= parseInt(datlen/buflen/2+1)*2;//求出需要的包 总长度/256（每个扇区大小）
              console.log(count+' / '+(len)+' len1= '+len1);
              var lentemp=0;
              if((count)*buflen>datlen)
                lentemp=datlen+1;
              else
                lentemp=(count)*buflen;
              data.copy(buf, 2 , (count-1)*buflen, lentemp);

              if (count==len1) {
                for(var i=datlen-(count-1)*buflen+2;i<buflen+2;i++)
                buf[i]=0xff;
                }
              if (count!=len1&&count==len) {
                for(var i=2;i<130;i++)
                buf[i]=0xff;
                }
            buf[0]=count;
            buf[1]=255-count;
            crc16(buf);
            buf[130]=ch;
            buf[131]=cl;

            setTimeout(function(){
             
            if(count<len+1) {sock.write(buf);/*console.log(buf);*/}
           
           
         //    console.log(buf);
             io.emit('success', { dat:count+"/"+len });
             count++;
             },200);
                
            });
          }
   
    }
  }
   });

}









////////////////////////////////////////shuju
function data(io,zm,sock,port){
  var count2=0;//心跳计数
    var count1=0;//数据计数

  sock.on('data', function (data) {
 // console.log(data);
    if(data[0]==0xff)//数据
    {
        count1++;
        console.log(data);
        array=new Array(data.length-1);
        array1=new Array(data.length-1);
        array[0]=count1;
        array1[0]=count1;
        for(a=1;a<4;a++)
        {
        array1[a]=data[a];
        array[a]=res[data[a]];
        }

        console.log(zm);
        var array3 = array.concat(array1);
        console.log(array3);
        io.in(zm).emit('upload', { dat:array.concat(array1) });
        rss.forEach(function(rs){
        console.log(rs.port);
	var str = array[3]+array[1]+array[2];
	console.log('sendtext: '+str);
       // rs.push(array[3]+array[1]+array[2]);
        });
	//rss[1].push( array[3]+array[1]+array[2]);
	//rss[0].push( array[3]+array[1]+array[2]);
	var str = array[3]+array[1]+array[2];
	if(bcastcontent != str &&sendflag ==false)
	{
  console.log('rss.length:'+rss.length);
	console.log(new Date());
	 for(var a=0;a<rss.length;a++)
        {
	console.log('port:'+port);
	if(port == 21111)
        {rss[a].push(array[3]+array[1]+array[2]);console.log('content');}
	if(port == 21112)
	{rss[a].push(array[3]+array[1]+array[2]);console.log('content');}
	bcastcontent = str;
	
	setTimeout(function(){
        sendflag = true;
        }, 100);	

	setTimeout(function(){
	sendflag = false;
        }, 5000);
        
	setTimeout(function(){
  	bcastcontent = '';
	},10000);
	}
	}
	if(sendflag == true&&bcastcontent != str)
   	setTimeout(function(){
        
	 for(var a=0;a<rss.length;a++)
        {
        
        if(port == 21111)
        {rss[a].push(array[3]+array[1]+array[2]);}
        if(port == 21112)
        {rss[a].push(array[3]+array[1]+array[2]);}
        bcastcontent = str;
        setTimeout(function(){
        sendflag = true;
        }, 100);
	setTimeout(function(){
        sendflag = false;
        }, 5000);
        setTimeout(function(){
        bcastcontent = '';
        },10000);
        }
	
	}, 5000);
	
	}
    if(data[0]==0x33)//心跳
      {
          count2++;
          console.log(count2);
          console.log(sock.remotePort);
           if(resetflag==1)
          {sock.write("2");console.log("write");}
          io.in(zm).emit('success', { dat:count2 })
      }
///////////////////////////////////////////////////升级程序///////////////
 

   
  
   });
}
var bcastcontent = '';
var sendflag = false;

var PraseGps = require('./PraseGps.js')//PraseGps解析的数据不能有“丰达00”这样结尾是0的
var prasegpe = new PraseGps();
prasegpe.setenv('develop');
var stream = require('stream');
var fs = require('fs')
var str ;
var sockets = new Array;
var rss = new Array;
/*setInterval(function(){
  if(rss.length>0)
{
  for(var a=0;a<rss.length;a++)
  {
    //console.log(rss[a].count);
    rss[a].count++;
    if(rss[a].count>20)
      {
	console.log('rss port:'+rss[a].port);
	rss = rss.slice(a+1);
    console.log('rss:'+(a+1)+' is sliced');}
  }
}
},1000);*/

var net = require('net');
net.createServer(function (socket) {
  // 新的连接
  console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
  socket.count = 0;
  sockets.push(socket);
  //console.log(sockets.length);
  new_rs(socket);  
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
	new_rs(socket);
	}

  //  console.log(data);
  //  sockets = sockets.slice(0);
    //console.log(sockets.length);
    var str = data.toString();
	for(var a=0;a<rss.length;a++)
	{
	if(rss[a].firstcast == false)
   //  { console.log('firstcast:'+rss[a].firstcast+'port:'+rss[a].port);rss[a].push('登陆语音提示系统');rss[a].firstcast = true;}
		if(rss[a].port == socket.remotePort)
		    {rss[a].push(str+'ffff'+socket.remotePort);}
	} 
//rs.push(str+'ffff'+socket.remotePort);	
//console.log('rss length'+rss.length)
   // console.log(data+'\n');
  
});
   socket.on('error',function (err){
   console.log("need:"+err);
  });
}).listen(50001, function () {
  console.log('server bound 50001  ');
});

function new_rs(socket){
console.log('new_rs/////////////////////////////////////////')
   var rs = new stream.Readable({ objectMode: true });

  rs.on('error',function (err)
	  { 
		//console.log(err);
      }
	);

  socket.on('unpipe', function(err) {
  for(var a=0;a<rss.length;a++)
    {
      if(rss[a].port == socket._peername.port)
      {
      //console.log('rss port:'+rss[a].port);
      rss = rss.slice(a+1);
      console.log('rss:'+(a+1)+' is sliced');}
    }
  
  });

  var prasegpe = new PraseGps()
  //{"device":"旧站车务二号机","group":"旧站车务定点防护","gps":"\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000"}
  
  rs.pipe(prasegpe).pipe(socket);
  rs.on('end',function(){console.log('message');})
  rs.port = socket.remotePort;
  rs.count = 0;
  rs.firstcast = false;
  rss.push(rs);
  console.log('rsslength:'+rss.length);
}
