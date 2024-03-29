//92 防护区段和范围
var stream = require('stream');
var util = require('util');
var count=0;
var iconv = require('iconv-lite');
var assert = require('assert');
var env ;
var creat;
//var creat = require('./GpsCreat')();
var connect = false;
var client ;


function StringifyStream(option){
    stream.Transform.call(this);
    client = option.client||{};
  	creat = require('./GpsCreat')(option);
    this._readableState.objectMode = false;
    this._writableState.objectMode = true;
    

}
util.inherits(StringifyStream, stream.Transform);

StringifyStream.prototype.remoteserver = function(ip){
	

	
}
StringifyStream.prototype.get = function(key){
	
	return eval(key);
	
}
StringifyStream.prototype.setenv = function(value){
	env=value;
	
}

function convert_to_ucs2(str){
	var buffer1 = new Buffer(str,'hex');
	return buffer1.toString('ucs2');
}
function convert_to_utf8(str){
	var buffer1 = new Buffer(str,'hex');
	return buffer1.toString('utf8');
}
//in  string  1100007972d1768c4ef7533a6700007972d176a47fc47e000033382e30323336362c3131342e353332393739ffff2259
/*out gps:{ device: '特监二号机',
1100007972109579723100380000007972109579724b6dd58b0000
  	group: '特监群组',
 	gpsdate: '38.02366,114.532979',
  	port: '4285' }*/
function parse_gps(str){
	//console.log(str);
	var gps = {};

	{
	var vect = str.indexOf('0000',3);
	var str3 = str.slice(6,vect);
	var vect1 = str.indexOf('0000',vect+1);
	var str4 = str.slice(vect+4,vect1);
	var vect = str.indexOf('ffff',3);
	var gpsdate = str.slice(vect1+4,vect);
	var port = str.slice(vect+4,str.length);

	
	gps.device = convert_to_ucs2(str3);
	gps.group = convert_to_ucs2(str4);
	gps.gpsdate = convert_to_utf8(gpsdate);
	gps.port = port;
	}
	return gps;
}
//处理gps数据 播报语音
//3131303030306464346639613562353735333664353166373533303030303739373264313736613437666334376530303030ffff2176
//gps数据  1100007972d1768c4ef7533a6700007972d176a47fc47e000033382e30323336362c3131342e353332393739  测监
//         1100007972d1768c4ef7533a670000DD4F9A5B000033382e30323336362c3131342e353332393738 保定
StringifyStream.prototype._transform = function(str, encoding, cb){
	//console.log('data: '+str);console.log('index:'+str.indexOf('0000'));
	//console.log(str);
	if(typeof(str) == 'string' && str.indexOf('0000') != -1 && str.indexOf('0000') < 3)//是gps数据
	{
	//console.log('gps');
	if(env == 'develop'){console.log('gps数据分析: '+str);}	
	this.gps = parse_gps(str)
	
	
	console.log(this.gps.device+this.gps.group+this.gps.gpsdate+' '+this.gps.port);
	
/////////////////////////////////向杜工服务器发送gps	
	//console.log(client);

	if(client != undefined )
	{var length = 1;
	if(this.sendgps!=undefined)
        length = distance(divide_gps(this.gps.gpsdate),divide_gps(this.sendgps));
		if(length >= 10)
     	{
		var buffanal = Send_Gps(this.gps);
		client.write(buffanal);
		this.sendgps = this.gps.gpsdate;
     	}
	}
	//////////////////////////////////////////////////	

	}
	else if(typeof(str) == 'string' && str.indexOf('ffff') == -1)
	{
	if(env == 'develop'){console.log('播报文字: '+str);}	
	console.log(str.slice(0,2));

	if(this.gps != undefined&&this.gps.group.indexOf(str.slice(0,2)) != -1)
{	
	//console.log(this.gps.group);
	var biz_content = str;
	var gbkBytes = iconv.encode(biz_content,'gbk');
	var gbkBytes1 = iconv.encode('100000'+gbkBytes.toString('hex'),'gbk');
	var result_text = analysis_text(str);
	if(this.gps != undefined && this.gps.gpsdate.length>5 && result_text!=undefined)
	{
		//analysis_gps return {distance:10000,zone:0}
		if(result_text.road == '上行列车')
		var result_gps = analysis_gps(creat.up,this.gps.gpsdate);
		if(result_text.road == '下行列车')
		var result_gps = analysis_gps(creat.down,this.gps.gpsdate);
		if(result_gps != undefined)
			{
			console.log("result_text:"+result_text.zone);
    	    console.log("result_gps:"+result_gps.zone);
			if(result_gps.distance <50)
    	    	if((result_text.zone+3)>result_gps.zone&& (result_text.zone)<=result_gps.zone )
					{this.push(gbkBytes1);
    	    		  if(env == 'develop')console.log('条件通过');}
				else {if(env == 'develop')console.log('条件不通过');}
    	   	else {this.push(gbkBytes1);if(env == 'develop')console.log('距离过远');}
    	    }
		else  {this.push(gbkBytes1);if(env == 'develop')console.log('不是上下行列车');}
	}
	//console.log('没有gps');
  	else {this.push(gbkBytes1);
	if(env == 'develop')console.log('没有收到gps');}
}
	}	
	
	else {if(env == 'develop')console.log("error message");}
    //var json = JSON.stringify(obj);
    
    
    cb();
};
module.exports = StringifyStream;





///////////////////////////////////////////////////////////////////gps send////



function Send_Gps(gps){
	//edit :buf6,buf8
	//gps.device  gps.group  gps.gpsdate  gps.port 
	time = Math.round(new Date().getTime()/1000);
	var timebuf = new Buffer(time.toString(16),'hex')	
	var buf1 = new Buffer('8f','hex');
	var buf2 = new Buffer('21','hex');
	var buf3 = timebuf;
	var buf4 = new Buffer('03ea','hex');
	var buf6 = gps.gpsdate||'-1,-1';
	var buf7 = buf6.replace(',','|')
	var buf8 = buf7+'|'+gps.device+'|';
	var buf9 = new Buffer(buf8); 
	var font = new Buffer(gps.device,'ucs2');
	var middle = font.toString('hex');
	var imei = new Buffer(middle,'ascii');
	//console.log('imei:'+imei+'gpsdate:'+gps.gpsdate+'device'+gps.device);

	var bufgps = Buffer.concat([buf9,imei,new Buffer('7c','hex'),new Buffer('30','hex')]);
	//console.log(bufgps);
	//console.log(imei);
	//console.log(buf7);
	var bufdate = Buffer.concat([buf2,buf3,buf4,bufgps]);

	var buf = new Buffer(parseInt(bufdate.length, 10).toString(16),'hex');
	//console.log(bufdate.length);
	var buf0 = new Buffer('00','hex');
	if(buf.length == 1) var buf = Buffer.concat([buf,buf0,buf1]);
	var buffanal = Buffer.concat([buf,bufdate]);
	return buffanal;
	
}

//in  上行列车一接近，进一道停车
//返回{road:‘上行列车’ ,zone:1 }

function analysis_text(str){//返回{road: ,zone: }
	var value = {};
	if(str.indexOf('上行列车一接近') != -1)
	value.zone = 0;
	if(str.indexOf('上行列车2接近') != -1)
	value.zone =  1;
	if(str.indexOf('上行列车3接近') != -1)
	value.zone = 2;
	if(str.indexOf('上行列车进站') != -1)
	value.zone = 3;
	if(str.indexOf('上行列车一离去') != -1)
	value.zone = 4;
	if(str.indexOf('上行列车2离去') != -1)
	value.zone = 5;
	if(str.indexOf('上行列车3离去') != -1)
	value.zone = 6;

	if(str.indexOf('上行列车经过衣九八信号点') != -1)
    value.zone = 7;
	if(str.indexOf('下行列车一接近') != -1)
	value.zone = 0;
	if(str.indexOf('下行列车2接近') != -1)
	value.zone = 1;
	if(str.indexOf('下行列车3接近') != -1)
	value.zone = 2;
	if(str.indexOf('下行列车进站') != -1)
	value.zone = 3;
	if(str.indexOf('下行列车一离去') != -1)
	value.zone = 4;
	if(str.indexOf('下行列车2离去') != -1)
	value.zone = 5;
	if(str.indexOf('下行列车3离去') != -1)
	value.zone = 6||255;
	if(str.indexOf('下行列车') != -1)
	value.road = '下行列车';
	if(str.indexOf('上行列车') != -1)
	value.road = '上行列车';

	return value;
}
function analysis_gps(updown,gpsdate){
	
	var lowest={distance:10000,zone:0};
	for (var a = 0;a < updown.length;a++)
		updown[a].forEach(function(updown){
			var low = distance(divide_gps(gpsdate),updown)
			if(low<lowest.distance)
			{
			lowest.distance = low;
			lowest.zone = a;
			}
		})
	if(env == 'develop')console.log(lowest);
	return lowest;
}

function creat_server(options){
options = options||{port:8080,host:"192.168.1.9"}
var net = require('net');

console.log('creat_server');
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
}

function divide_gps(data){	
	if(typeof(data) == 'string')
{var gpsdata = {};
 gpsdata.WD = data.slice(0,data.indexOf(','));
 gpsdata.JD = data.slice(data.indexOf(',')+1,data.length);
return gpsdata;}
}
function distance(gps1,gps2){


//console.log(getDisance(gps1.WD,gps1.JD,gps2.WD,gps2.JD)); 
return getDisance(gps1.WD,gps1.JD,gps2.WD,gps2.JD)
}

function toRad(d) {  return d * Math.PI / 180; }
function getDisance(lat1, lng1, lat2, lng2) { //#lat为纬度, lng为经度, 一定不要弄错
    var dis = 0;
    var radLat1 = toRad(lat1);
    var radLat2 = toRad(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = toRad(lng1) - toRad(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378137;
} 



//console.log(down);
/////////////////////////////////////内部执行/////////////////////////////////////////
