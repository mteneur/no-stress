var system = require('system'),
    address = system.args[1],
    fs = require("fs");

    var launch = 0;
	
	var Client = function(address){

		var startLoadTime, endLoadTime;
		var page = require('webpage').create();
		this.nbResourcesRequested = 0;
		this.nbResourcesReceiveed = 0;
		var that = this;
		page.onLoadStarted = function () {
			startLoadTime = Date.now();
			var open = '{ "loadStart" : "true" }';
			console.log(open);
		};

		page.onLoadFinished = function (status) {
			endLoadTime    = Date.now();
			var loadedTime = endLoadTime-startLoadTime;
			var time = '{ "loadEnd" : '+loadedTime+' }';
			console.log(time);

		};

		page.onResourceRequested = function(request) {
  			that.nbResourcesRequested++;
		};
		page.onResourceReceived = function(response) {
  			that.nbResourcesReceived++;
		};
		
		page.open(address, function(status){
			
		});
		
	}



new Client(address);


