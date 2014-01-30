(function() {

	var fs = require('fs'),
		program = require('commander');
	    workbench = require('./lib/workbench.js'),

	program
	  .version('0.0.1')
	  .usage('[options] <url>')
	  .option('-a, --amount <n>', 'Total number of persistent connection, Default to 100', parseInt)
	  .option('-w, --worker <n>', 'Total number of worker (thread), Default to 4', parseInt)
	  .option('-k, --keep-alive <n>', 'Time to keep alive connection, default is "infinity"', parseInt)
	  .parse(process.argv);

	if (program.args.length < 1) {
		program.help();
	}

	var url = program.args[0];

	if (!program.amount) {
		program.amount = 100;
	}
	if (!program.keepAlive) {
		program.keepAlive = false;
	}
	if (!program.worker) {
		program.worker = 2;
	}
	new workbench(program.amount, program.worker, program.keepAlive, url);

})();
