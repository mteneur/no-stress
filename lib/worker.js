/**
 * worker run phantom js process
 * @TODO: manage time of process / phantom client session time
 * @return {[type]} [description]
 */

(function() {
	
	var path = require('path'),
		events = require('events'),
		phantomjs = require('phantomjs'),
		binPath = phantomjs.path;

	var Worker = function(url, ee, id, keepAlive)
	{

		this.url = url;
		this.ee  = ee;
		this.id  = id;
		this.keepAlive = keepAlive;
		this.phantomInstances = new Array();
		this.currentProcess;
		var that = this;
		this.stop = function(){

			setTimeout(function(){
				
				var phantom = that.phantomInstances.shift();
				phantom.kill('SIGHUP');		
				
			}, that.keepAlive);
			
		}
		/**
		 * 
		 * Run %n phantom clients
		 * @param  {[type]} nbClients [description]
		 * @return {[type]}           [description]
		 */
		 this.run = function(nbClients)
		 {
			var childProcess = require('child_process');

		 	var childArgs = [
			 	path.join(__dirname, '/client.js'),
			 	that.url,
		 	];
		 	var index = that.phantomInstances.push(childProcess.spawn(binPath, childArgs));

		 	var phantom = that.phantomInstances[index-1];
		 	phantom.stdout.on('data', function (data) {
		 		that.responseHandler(data);
		 	});

			var index = (phantom);
		 	
		 }
		 /**
		  * [responseHandler description]
		  * @param  {[type]} data [description]
		  * @return {[type]}      [description]
		  */
		 this.responseHandler = function(data)
		 {
	 		try{
		 		mess = JSON.parse(data);

		 		if(mess.loadEnd)
		 		{	
			 		that.ee.emit('pageLoaded', mess.loadEnd); 
			 		if(that.keepAlive)
				 	{
				 		that.stop();
				 	}
			 		that.ee.emit('workerEnded', that.id); 
				}
				if(mess.loadStart)
				{
					that.ee.emit('workerStarted', that.id); 
				
				}
			 		
	 		}
			catch(e){
				console.log("Exception detected ... PhantomJs returns unexpected values",e, data);
			} 		
		}

	};


	module.exports = Worker;

})();
