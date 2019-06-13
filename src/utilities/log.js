// Javascript log Function
// https://gist.github.com/bgrins/5108712
//
// Full version of `log` that:
//  * Prevents errors on console methods when no console present.
//  * Exposes a global 'log' function that preserves line numbering and formatting.
//  * Respects debug mode set in localStorage

const isDebug = localStorage.debug ? JSON.parse(localStorage.debug) : false
const noop = function() { };

if (!isDebug) {
  window.log = noop
} else {
  let method;
  const methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
  ];
  let length = methods.length;
  let console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
        console[method] = noop;
    }
  }

  if (Function.prototype.bind) {
    window.log = Function.prototype.bind.call(console.log, console);
  }
  else {
    window.log = function() {
      Function.prototype.apply.call(console.log, console, arguments);
    };
  }
}
