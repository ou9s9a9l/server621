var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var subform = require('./routes/subform');
var usecookies = require('./routes/usecookies');
var test = require('./routes/test');
var tcpserver = require('./net/net');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var multer = require('multer');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){ 
    console.log("%s %s",req.method,req.url);
    next();
});
app.use(multer({
  dest:'./public',
  rename: function (fieldname, filename) {
  return 'adc'
  }
 }));
app.use('/', routes);
app.use('/subform', subform);
app.use('/usecookies', usecookies);
app.use('/test', test);
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
     var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
server.listen(80);
//module.exports = app;
var a=0;
var socketflag;
var tcpstate='close';
io.on('connection', function (socket) {
  console.log("socketid is:"+socket.id+" joined");
  socket.emit('news', { hello: 'world' });
  socket.emit('tcpstate', { dat:tcpstate });


  
 socket.on('join', function (data) {
    socketflag=0;
    for(a=0;a<socket.rooms.length;a++)
      if(socket.rooms[a]==data.room)socketflag=1;
   if(socketflag)
     socket.leave(data.room,function(){
       socket.emit('roomsin',{room:socket.rooms});
       console.log(socket.id+" leaved "+data.room);
    });
   else
    socket.join(data.room,function (err){
       console.log(socket.id+" joined "+socket.rooms[socket.rooms.length-1]);
       socket.emit('roomsin',{room:socket.rooms});
    });
  });



  socket.on('disconnect', function(){
    console.log("socketid is:"+socket.id+" disconnect");
  });
  socket.on('reset', function(){
    if(resetflag)resetflag=0;
    else resetflag=1;
   // console.log("reset is "+resetflag);
    io.emit('success', { dat:"reset is "+resetflag })
  });
  socket.on('update1', function(dat){
   // UpdateServer.creatserver(io);
  // socket.write("0");
   if (socket.rooms[1]!=undefined)
   eval("Server"+socket.rooms[1]+".setflag(io,'"+dat.dat+"')");
  });
});
var UpdateServer = require('./net/updatejz');
//var ServerPNZ = new UpdateServer(io,25252,'PNZ');
//var ServerSJZ = new UpdateServer(io,30000,'SJZ');
var ServerJZ1 = new UpdateServer(io,21111,'JZ1');
var ServerJZ2 = new UpdateServer(io,21112,'JZ2');
var ServerBDN = new UpdateServer(io,20001,'BDN');


