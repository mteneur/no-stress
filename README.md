No-stress
=========

Some server load testing tests with phantoms JS - Experimental
ad testing with phantom Js.


This test run many phantomjs instance on specified URL.

Why this script ?
===============
* We just want to simulate some *realistic* audience on website (no
metrics)
* Load testing tools like JMeter, Tsung do the job (better)... but too
complicated for our simple usage. By the way, they do not provide
websocket support...
* Use of phantomJS which is really nice to test entire webpage loading
(contening webscocket connectios)


Largely inspired from:
=====================

* http://tech.m6web.fr/benchmarking-websockets-avec-nodejs
  * https://github.com/M6Web/websocket-bench


Install and Launch
=================

npm install
node index.js [URL] [OPTIONS]
