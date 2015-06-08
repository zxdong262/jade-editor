
var _ = require('lodash')
,setting = h5.setting
,local = h5.local
,page = require('./page')
,tools = require('../lib/tools')
,ua = require('../lib/ua')
,Router = require('koa-router')

exports.init = function(app) {
	
	var routePage = new Router()

	//page
	routePage.get('/', page.index)

	app.use(tools.settingHandler)
	routePage.use(ua.ua)
	routePage.use(function* (next) {
		this.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
		yield next
	})

	app
	.use(routePage.routes())
	.use(routePage.allowedMethods())
	

	//404
	app.use(function* (next) {
		this.status =  404
		this.body = '404'
	})

	//end
}