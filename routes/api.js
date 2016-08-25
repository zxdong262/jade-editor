
/*
 * page
 */
var _ = require('lodash')
,setting = h5.setting
,local = h5.local
,tools = require('../lib/tools')
,log = tools.log
,jade = require('jade')

exports.previewJade = function* (next) {

	try {

		var body = this.request.body
		,ja = body.jade

		if(/^\- |\n\s*- /.test(ja)) throw new Error('not valid jade')

		var html = jade.render(ja)

		this.body = {
			code: 0
			,html: html
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