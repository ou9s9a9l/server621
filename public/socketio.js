  
  var ip_addr = document.location.hostname;
  var socket = io.connect(ip_addr);
  var roomnumber='';
  socket.on('news', function (data) {
    setTimeout(function(){
        document.getElementById("socketstate").innerHTML="服务器已连接";
        },200);
   
  });
  socket.on('success', function (data) {
    console.log(data.dat);
  });
 var a,b=20;
  socket.on('upload', function (data) {
    console.log('data.dat');
    var chatvalue=document.getElementById("chat-window").value;
    if(chatvalue.length>0)
      if(chatvalue.match(/\n/g).length>b)  
        {var devide;
          devide=chatvalue.indexOf("\n")+1;
          chatvalue=chatvalue.slice(devide)
        }
    for(a=0;a<data.dat.length;a++)
    chatvalue+=data.dat[a]+" ";
    chatvalue+="\n";
    document.getElementById("chat-window").value=chatvalue;
    console.log(data.dat.length);
  });


socket.on('tcpstate', function(data){
  document.getElementById("tcpstate").innerHTML='tcp状态 ：'+data.dat;
  });

socket.on('disconnect', function(){
   document.getElementById("socketstate").innerHTML="服务器已断开"
  });
/////////////who in room
  socket.on('roomsin', function (data) {
    data.room[0]="已经进入的车站";
    document.getElementById("roomstate").innerHTML=data.room;
  });


  function joinroom(roomnumber){
      socket.emit('join', { room:roomnumber });
  };
  function update(){
      socket.emit('update', { room:"1" });
  };
  function update1(){
      socket.emit('update1', { dat:"0" });
  };
    function update2(){
      socket.emit('update1', { dat:"3" });
  };
  function reset(){
      socket.emit('reset', { room:"1" });
  };
  function cleartxt(){
    document.getElementById("chat-window").value="";
  };
  var x=20;
  function setrows(){
    if (x>50) x=20;x+=1;
    var y = x.toString();
    document.getElementById("chat-window").rows=y;
  };
    function clearrows(){
    if(b>50)b=20;
    b+=1;
    var y = b.toString();
    document.getElementById("clearlen").innerHTML=b;
  };
 



  //setTimeout("console.log(a);", 1000);
