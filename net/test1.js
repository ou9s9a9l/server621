var arr = new Array('1','2','3','4');
arr.splice(1,1);
console.log(arr);
var stream = require('stream');
var rs = new stream.Readable({ objectMode: true });
   
  rs.on('error',function (err)//必须监听  否则出event的错
	  { 
		console.log(err);//
    }
	);
rs.pipe(process.stdout);
rs.push(null);
console.log(rs);
rs.push('2');
rs.push('1');
