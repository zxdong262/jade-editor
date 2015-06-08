
/*
 * page
 */
var _ = require('lodash')
,setting = h5.setting
,local = h5.local
,tools = require('../lib/tools')
,ua = require('../lib/ua')
,log = tools.log

exports.index = function* (next) {

	try {
		this.render('index', this.local)
	}
	catch(e) {
		log.err(e, 'failed render index')
		this.status = 500
		this.body = 'failed render index: ' + e.stack || e
	}
	
}