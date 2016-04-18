var request = require('request');
var extend = require('extend');

function geoip(ip,callback){
	console.error("Geoip:"+ip);
	request.get("http://freegeoip.io/json/"+ip, function(err, resp, body){
		if (err){
			callback(err)
		} else if (resp.statusCode != 200){
			callback(ip+" : "+resp.body);
		} else {
			try {
				callback(undefined, JSON.parse(body));
			} catch (e){
				callback(e);
			}
		}
	})
	
}
module.exports = geoip;