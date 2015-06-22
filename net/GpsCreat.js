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


 
var gpsup =[{JD:"123.751536",WD:"41.869543"},{JD:"123.736805",WD:"41.866053"},//290 276
		  {JD:"123.721503",WD:"41.862398"},{JD:"123.706755",WD:"41.8588617"},//262 s
		  {JD:"123.6867883",WD:"41.8542017"},{JD:"123.676659",WD:"41.852829"},//xn 224
		  {JD:"123.661827",WD:"41.852078"},{JD:"123.648435",WD:"41.857069"},{JD:"123.635435",WD:"41.862069"}]//212 198
var gpsdown = [ {JD:"123.636216",WD:"41.860365"},{JD:"123.652824",WD:"41.855099"},//187 203
				{JD:"123.670792",WD:"41.852493"},{JD:"123.68702",WD:"41.8543183"},//219 x
				{JD:"123.7066667",WD:"41.8589017"},{JD:"123.716167",WD:"41.861159"},//sn 257
				{JD:"123.730528",WD:"41.864530"},{JD:"123.744889",WD:"41.867901"}]//271 283


/////////////////////////////////////内部执行/////////////////////////////////////////:
function creat_zone(gps1,gps2,cutnum){
var jd = (parseFloat(gps2.JD)-parseFloat(gps1.JD))/cutnum;
var wd = (parseFloat(gps2.WD)-parseFloat(gps1.WD))/cutnum;
var tempary =[];
for (var a = 0;a < cutnum;a++)
	{
	var JD = parseFloat(gps1.JD)+a*jd;
	var WD = parseFloat(gps1.WD)+a*wd;
	var temp = []
	temp.JD = JD;
	temp.WD = WD;
	tempary.push(temp);	
	}
return tempary;
}

module.exports = Creat;


function Creat(){
var gps = {};
var up = [],down = [];
for (var a = 0;a < gpsup.length-1;a++)
up[a] =creat_zone(gpsup[a],gpsup[a+1],20)
gps.up = up;
for (var a = 0;a < gpsdown.length-1;a++)
down[a] =creat_zone(gpsdown[a],gpsdown[a+1],20)
gps.down = down;
return gps;
}
//console.log(down[0][0]);
