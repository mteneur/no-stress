/**
 * worker run phantom js process
 * @TODO: manage time of process / phantom client session time
 * @return {[type]} [description]
 */

(function() {
	
	var path = require('path'),
		events = require('events'),
		childProcess = require('child_process'),
		phantomjs = require('phantomjs'),
		binPath = phantomjs.path;

	var Worker = function(url, ee, id)
	{
		
		this.url = url;
		this.ee  = ee;
		this.id  = id;
		var that = this;
		/**
		 * 
		 * Run %n phantom clients
		 * @param  {[type]} nbClients [description]
		 * @return {[type]}           [description]
		 */
		 this.run = function(nbClients)
		 {
		 	var childArgs = [
			 	path.join(__dirname, '/client.js'),
			 	that.url,
		 	];
		 	var phantom  = childProcess.spawn(binPath, childArgs);

		 	phantom.stdout.on('data', function (data) {
		 		that.responseHandler(data);
		 	});
		 }
		 /**
		  * [responseHandler description]
		  * @param  {[type]} data [description]
		  * @return {[type]}      [description]
		  */
		 this.responseHandler = function(data)
		 {
	 		mess = JSON.parse(data);
	 		if(mess.loadEnd)
	 		{	
		 		that.ee.emit('pageLoaded', mess.loadEnd); 
		 		that.ee.emit('workerEnded', that.id); 
			}
			if(mess.loadStart)
			{
				that.ee.emit('workerStarted', that.id); 
			
			}
		 	
		}

	};


	module.exports = Worker;

})();
