
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

		var html = jade.render(ja)

		this.body = {
			code: 0
			,html: html
		}

	}
	catch(e) {
		log.err(e, 'failed render jade template')
		this.body = {
			error: e
			,code: 1
		}
	}
	
}