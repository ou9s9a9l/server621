
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

var trans_server = 0;



var range1 = this;
module.exports = Server;

var boardcast = [];

    setInterval(function(){
    //console.log('sendcast');
      if(boardcast.length>0)
        {
          console.log('boardcast '+boardcast);
          sendserver.sendtext(boardcast.shift());
          
       }
    },4000);
    /*
setInterval(function(){
    //console.log('sendcast');
      if(sendflag == false && boardcast.length>0)
        {
          console.log('boardcast '+boardcast);
          sendserver.sendtext(boardcast.shift());
          sendflag = true;
          setTimeout(function(){
            sendflag = false;
          }, 4000);
       }
    },4000);
    */
var sendserver;

function Server(io,port,zm,prasegps){
  sendserver = prasegps;
 console.log(zm);
var resbdn = require('../public/date'+zm.toLowerCase())();
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
    data(io,zm,sock,port,prasegps);update(io,sock);console.log('2 server complete');

  });



//this.port = port;



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


  
  net.createServer(function (socket) {
  // 新的连接
  socket_trans=socket;
  socket.on('data', function (data) {
  });
  socket.on('error',function (err){
   console.log("err:"+err);
  });
  }).listen(port+10000, function () {
  console.log('trans server bound '+(port+10000)); 
  });

}


var socket_trans;

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
function data(io,zm,sock,port,prasegps){
  var count2=0;//心跳计数
    var count1=0;//数据计数
    
  sock.on('data', function (data) {
    if(socket_trans != undefined)
        socket_trans.write(data);
    if(data[1]!=0x11)//raw 数据
    {var str = data.toString('hex');

      var a = str.match(/ff\w{6}ff/g);
      if(a!=null)
      var temp = new Buffer(a[0],'hex');
      if(a!=null&&temp[1]!=0xff&&temp[2]!=0xff&&temp[3]!=0xff)
        {data = new Buffer(a[0],'hex');console.log('convert');
      
        }
         
      
      
    }

    if(data[0]==0x01 && data[1] == 0x12)
    {
      var str = data.toString('hex');
      if(data.length%11 !=0)
        {str = str.slice(str.indexOf('ff'));
      console.log(str);}
     
    }
    if(data[0]==0xff)//数据
    {
      //01 12 04 00 01 00 4a 8c 95 8e 03 
      //01 12 04 00 01 00 de 03 21 c6 03 
      //01 12 04 00 01 00 d6 0a 39 46 03 
      //01 12 04 00 01 00 4a 8c 95 8e 03
      //01 12 04 00 01 00 e6 83 3c 72 03 
      //01 12 04 00 01 00 e6 83 3c 72 03
      //01 12 04 00 01 00 98 8a 86 0d 03 
      //01 12 04 00 01 00 98 8a 86 0d 03 
      //01 12 04 00 01 00 60 0c ed 2b 03
      //01 12 04 00 01 00 df 03 12 f7 03 
      //01 12 04 00 01 00 df 03 12 f7 03
        count1++;
        console.log(data);
        array=new Array(4);
        array1=new Array(4);
        array[0]=count1;
        array1[0]=count1;
        for(a=1;a<4;a++)
        {
        array1[a]=data[a];
        array[a]=resbdn[data[a]];
        }
     
        var array3 = array.concat(array1);

        io.in(zm).emit('upload', { dat:array.concat(array1) });
     var str = array[3]+array[1]+array[2];
	//rss[1].push( array[3]+array[1]+array[2]);
	//rss[0].push( array[3]+array[1]+array[2]);
//	var str = array[3]+array[1]+array[2];
  if(boardcast.indexOf(str) == -1)
  boardcast.push(str);
	

	
	}
    if(data[0]==0x33)//心跳
      {
          count2++;
          io.in(zm).emit('success', { dat:count2 })
      }
///////////////////////////////////////////////////升级程序///////////////
   });
}






};//serverc