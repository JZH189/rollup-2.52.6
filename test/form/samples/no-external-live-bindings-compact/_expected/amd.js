define(['require','exports','external1','external2'],function(require,exports,external1,external2){'use strict';function _interopNamespace(e){if(e&&e.__esModule)return e;var n=Object.create(null);if(e){Object.keys(e).forEach(function(k){n[k]=e[k];});}n['default']=e;return Object.freeze(n);}const dynamic = new Promise(function(c,e){require(['external3'],function(m){c(/*#__PURE__*/_interopNamespace(m));},e)});exports.external1=external1.external1;exports.dynamic=dynamic;Object.keys(external2).forEach(function(k){if(k!=='default'&&!exports.hasOwnProperty(k))exports[k]=external2[k];});Object.defineProperty(exports,'__esModule',{value:true});});