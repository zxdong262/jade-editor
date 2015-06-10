
var _ = require('lodash')
,setting = h5.setting
,local = h5.local
,page = require('./page')
,tools = require('../lib/tools')
,ua = require('../lib/ua')
,Router = require('koa-router')
,api = require('./api')

exports.init = function(app) {
	
	var routePage = new Router()

	var routeApi = new Router()

	//api
	routeApi.post('/preview-jade', api.previewJade)

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
	
	app
	.use(routeApi.routes())
	.use(routeApi.allowedMethods())

	//404
	app.use(function* (next) {
		this.status =  404
		this.body = '404'
	})

	//end
}