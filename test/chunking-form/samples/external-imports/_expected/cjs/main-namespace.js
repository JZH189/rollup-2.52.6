'use strict';

var foo = require('external-all');
var bar = require('external-namespace');
var quux = require('external-default-namespace');
var quux$1 = require('external-named-namespace');

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () {
						return e[k];
					}
				});
			}
		});
	}
	n['default'] = e;
	return Object.freeze(n);
}

var foo__namespace = /*#__PURE__*/_interopNamespace(foo);
var bar__namespace = /*#__PURE__*/_interopNamespace(bar);
var quux__namespace = /*#__PURE__*/_interopNamespace(quux);
var quux__namespace$1 = /*#__PURE__*/_interopNamespace(quux$1);

console.log(foo__namespace, bar__namespace, quux__namespace, quux__namespace$1);
