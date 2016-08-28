
/*
 * page
 */
const _ = require('lodash')
,setting = h5.setting
,local = h5.local
,tools = require('../lib/tools')
,log = tools.log
,jade = require('pug')
,serialize = require('serialize-javascript')

exports.previewJade = function* (next) {

	try {

		var body = this.request.body
		,ja = body.jade

		var fn = jade.compile(ja)

		this.body = {
			code: 0
			,fn: serialize(fn)
		}

	}
	catch(e) {
		log.err(e.stack || e, 'failed render jade template')
		this.body = {
			error: e.message
			,code: 1
		}
	}
	
}