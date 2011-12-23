var forever = require('forever');
var child = forever.start([ 'socketstream', 'start' ], {
  max : 1,
  silent : true
});

forever.startServer(child);
