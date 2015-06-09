//local setting

var 
_ = require('lodash')
,packageInfo = require('./package.json')
,local = {
	siteName: packageInfo.name
	,siteDesc: packageInfo.description
	,version: packageInfo.version
}

,setting = {

}

,config = require('./config')

global.h5 = {
	setting: _.extend(setting, config.setting)
	,local: _.extend(local, config.local)
}