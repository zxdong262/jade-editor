
/*
 * tools
**/

var
_ = require('lodash')
,request = require('request')
,setting = h5.setting
,local = h5.local

exports.log = function(_err) {

	//arguments to array
	var len = arguments.length + 1
	var args = new Array(len)
	var err = _err || ''

	args[0] = new Date()
	args[1] = err

	for(var i = 2;i < len; i++) {
		args[i] = arguments[i-1]
	}

	console.log(args.join(' '))
}

exports.log.err = function(_err) {

	//arguments to array
	var len = arguments.length + 1
	var args = new Array(len)
	var err = _err || ''

	args[0] = new Date()
	args[1] = err.stack || err

	for(var i = 2;i < len; i++) {
		args[i] = arguments[i-1]
	}

	console.error(args.join(' '))

}

exports.settingHandler = function* (next) {

	var arr = this.href.split('/')
	,host = arr[0] + '//' + arr[2]

	this.local = _.extend({}, local, {
		host: host
		,href: this.href
	})

	return yield next
}
