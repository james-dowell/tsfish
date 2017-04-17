var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var jsdom = require('jsdom').jsdom;

global.document = jsdom('<html><body><div id="app"></div></body></html>');
global.window = global.document.defaultView;
global.location = window.location;
global.navigator = window.navigator = { userAgent: 'node' };
global.Node = window.Node;
// global.fetch = window.fetch = sinon.stub();

chai.use(sinonChai);

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;