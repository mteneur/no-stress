(function() {

	var worker = require('./worker.js')
		events = require("events");
		
	var Workbench = function(amountCount, workerCount, keepAlive, url){

		var eventEmitter = new events.EventEmitter();

		this.nbClientPerWorker = amountCount/workerCount;

		console.log('Running '+this.nbClientPerWorker+' clients on '+workerCount+' workers');

		this.workerCount = workerCount;
		this.amountCount = amountCount;
		this.keepAlive   = keepAlive;

		this.meanLoadedTime = 0;
		this.sumLoadedTime  = 0;
		this.workerEndedTime = 0;
		this.currentTestCount = 0;
		this.workers = Array();
	
		var that=this;

		/**
		 * [description]
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		eventEmitter.on('pageLoaded', function(data){
			that.sumLoadedTime += data;		
		});

		/**
		 * [description]
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		eventEmitter.on('workerEnded', function(data){

			that.workerEndedTime++;
			if( that.currentTestCount < that.amountCount )
			{
					that.workers[data].run();
					that.currentTestCount++;
					if(that.currentTestCount%5 == 0)
					{
						console.log(that.currentTestCount+ " tests launched");
					}
			}
			if( that.workerEndedTime == that.amountCount )
			{
				meanLoadedTime = that.sumLoadedTime/that.amountCount;
				console.log("Load Time (Mean) ",meanLoadedTime," mseconds (",that.currentTestCount,' tests )');
			}
		});
		
		/**
		 * [description]
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		eventEmitter.on('workerStarted', function(data){
			
				
		});

		/**
		 * [x description]
		 * @type {Number}
		 */
		for(var x = 0; x<=workerCount; x++){
			that.workers.push(new worker(url, eventEmitter, x, keepAlive));
			that.workers[x].run();
			that.currentTestCount++;
		}


	
	}
	module.exports = Workbench;

})();
