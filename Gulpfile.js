var requireDir = require('require-dir');
require('coffee-react/register');
requireDir('./gulp/tasks', { recurse: true });
