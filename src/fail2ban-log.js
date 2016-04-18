var grep=require("./simple-grep");
var geoip=require("./geoip");
var async=require("async");
var request=require("request");
var extend=require("extend");

function file2geojson(file, done){
	async.waterfall(
		[
			function(callback){
				callback(undefined, file);
			},
			findInFile,
			geoipAll,
			data2GeoJSON
		],
		done
	);
}

function findInFile(file, done){
	var data = [];
	var parts;
	grep("' Ban '", file, function(list){
		try {
			for (var i in list){
				for (var j in list[i].results){
					parts = list[i].results[j].line.split(" ");
					data.push({date: parts[0], time: parts[1], ip: parts[6]});
				}
			}
			done(undefined,data)
		} catch (e){
			done(e);
		}
	});
}

function geoipAll(data,done){
	async.map(
		data,
		function(item, callback){
			geoip(item.ip,function(err,geodata){
				callback(err,extend(null,item,geodata));
			})
		},
		done
	);
}

function data2GeoJSON(data,done){
	async.map(
		data,
		function(item, callback){
			callback(null,{type: "Feature",geometry: {type: "Point", coordinates: [item.longitude, item.latitude]}, properties: item});
		},
		function(err, features){
			done(null, {type: "FeatureCollection", features: features});
		}
	);
}

module.exports = file2geojson;