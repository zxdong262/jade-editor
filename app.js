/*!
 * main entrance
**/

var glob = require('./glob')
,setting = h5.setting
,local = h5.local
,tools = require('./lib/tools')
,log = tools.log
,_ = require('lodash')

try {
	require('./index.js')
}
catch(e) {
	log(e, 'error', 'init failed')
}