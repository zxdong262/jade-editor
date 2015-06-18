/**
 * jade-editor
 * @version v0.2.5 - 2015-06-18
 * @link http://jade-editor.org
 * @author ZHAO Xudong (zxdong@gmail.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
;(function(window, document, undefined) {


//class
function JadeEditor(id, options) {

	this.init(id, options)

}

//global
JadeEditor.keycodes = {

	keyup: {
		13: 'enter'
		,73: 'i'
		,66: 'b'
	}

	,keydown: {
		9: 'tab'
		,8: 'backspace'
		,222: 'single_quote'
		,57: 'left_bracket'
		,219: 'open_bracket'
		,221: 'close_bracket'
	}

}

JadeEditor.prototype.init = function(id, _options) {

	var defaults = {
		indent: '    '
	}
	,options = _options || {}

	,th = this

	this.dom = document.getElementById(id)
	this.pre = this.dom.nextSibling || this.dom.nextElementSibling

	this.options = {}
	this.options.indent = options.indent || defaults.indent
	this.inited = true

	this.evt()

	//end
}

JadeEditor.prototype.evt = function() {

	var th = this
	,dom = th.dom

	dom.addEventListener('keydown', function(event, cb) {

		var keycode = event.keyCode

		,kf = JadeEditor.keycodes.keydown[keycode]

		if(!kf) return

		th['handleKeyEvt_' + kf](event, th.updateSyntax)

		//dom.focus()

	}, false)

	dom.addEventListener('keyup', function(event, cb) {

		var keycode = event.keyCode

		,kf = JadeEditor.keycodes.keyup[keycode]

		if(!kf) return th.updateSyntax()

		th['handleKeyEvt_' + kf](event, th.updateSyntax)

		//dom.focus()

	}, false)


	th.autoGrow()

	//end
}

JadeEditor.prototype.updateSyntax = function() {
	var th = this
	,dom = th.dom
	,pre = th.pre

	if(!pre) return
	pre.innerHTML = dom.value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
	pre.classList.remove('prettyprinted')
	prettyPrint()

}

JadeEditor.prototype.autoGrow = function() {

	var dom = this.dom

  if (dom.scrollHeight > dom.clientHeight) {
    dom.style.height = dom.scrollHeight + 'px'
  }
  //end
}

JadeEditor.prototype.handleKeyEvt_tab = function(event, cb) {

	event.preventDefault()

	var th = this
	,opts = th.options
	,dom = th.dom
	,nSelStart = dom.selectionStart
	,nSelEnd = dom.selectionEnd
	,sOldText = dom.value

	,targetText = sOldText.substring(nSelStart, nSelEnd)
	,formerChar = sOldText.substring(nSelStart - 1, nSelStart)

	//press tab with no selection
	if(formerChar !== '\n' && formerChar !== '') {
		dom.value = sOldText.substring(0, nSelStart) + opts.indent + sOldText.substring(nSelEnd)
	}

	else {
		targetText = opts.indent + targetText.replace(/\n/g, '\n' + opts.indent)
		dom.value = sOldText.substring(0, nSelStart) + targetText + sOldText.substring(nSelEnd)
		dom.selectionStart = nSelStart === nSelEnd?nSelStart + opts.indent.length:nSelStart
		dom.selectionEnd = nSelStart === nSelEnd?nSelStart + opts.indent.length:nSelStart + targetText.length
	}

	cb.call(th)
	//end
}

JadeEditor.prototype.handleKeyEvt_enter = function(event, cb) {

	var th = this
	,opts = th.options
	,dom = th.dom
	,nSelStart = dom.selectionStart
	,nSelEnd = dom.selectionEnd
	,sOldText = dom.value

	,targetTextArr = sOldText.substring(0, nSelStart).split('\n')
	,len = targetTextArr.length
	,currentLine = targetTextArr[len - 2]
	,spaceReg = /^( *)/
	,matchArr = currentLine.match(spaceReg)
	,spaces = matchArr[1]

	dom.value = sOldText.substring(0, nSelStart) + spaces + opts.indent + sOldText.substring(nSelEnd)
	dom.selectionStart = nSelStart + spaces.length + opts.indent.length
	dom.selectionEnd = dom.selectionStart
	

	cb.call(th)
	//end
}

JadeEditor.prototype.handleKeyEvt_backspace = function(event, cb) {

	var th = this
	,opts = th.options
	,indent = opts.indent
	,indentLength = indent.length
	,dom = th.dom
	,nSelStart = dom.selectionStart
	,nSelEnd = dom.selectionEnd
	,sOldText = dom.value
	,targetText = sOldText.substring(0, nSelStart)
	,targetTextArr = targetText.split('\n')
	,len = targetTextArr.length
	,currentLine = targetTextArr[len - 1]
	,isEmptyLine = /^ *$/.test(currentLine)
	,currentLineStart = nSelStart - currentLine.length
	,currentLineToSelStartText = sOldText.substring(currentLineStart, nSelStart)
	,currentLineToSelStartTextLen = currentLineToSelStartText.length

	if(!isEmptyLine || currentLineToSelStartTextLen < indentLength) return

	event.preventDefault()

	dom.value = 
		sOldText.substring(0, currentLineStart) + 
		currentLineToSelStartText.replace(indent, '') + 
		sOldText.substring(nSelEnd)

	cb.call(th)
	//end
}

JadeEditor.prototype.handleKeyEvt_open_bracket = function(event, cb) {

	var th = this
	,opts = th.options
	,dom = th.dom
	,nSelStart = dom.selectionStart
	,nSelEnd = dom.selectionEnd
	,sOldText = dom.value
	,targetText = sOldText.substring(nSelStart, nSelEnd)

	,charOpen = event.shiftKey?'{':"["
	,charClose = event.shiftKey?'}':"]"

	event.preventDefault()

	if(!event.ctrlKey) {
		dom.value = 
			sOldText.substring(0, nSelStart) +
			charOpen + 
			targetText + 
			charClose +
			sOldText.substring(nSelEnd)
		dom.selectionStart = nSelStart === nSelEnd?nSelStart + 1:nSelStart
		dom.selectionEnd = nSelEnd + (nSelStart === nSelEnd?1:2)
		return cb.call(th)
	}

	var noSel = !targetText.length

	if(noSel) {
		var tarr = sOldText.substring(0, nSelStart).split('\n')
		,lent = tarr.length
		targetText = tarr[lent - 1]
		var startp = nSelStart - targetText.length
		,btext = sOldText.substring(0, startp)
	}

	var targetTextArr = targetText.split('\n')
	,len = targetTextArr.length
	,res = []
	,reg = new RegExp('^' + opts.indent)
	for(var i = 0;i < len;i ++) {
		res.push(targetTextArr[i].replace(reg, ''))
	}
	targetText = res.join('\n')

	if(noSel) {
		dom.value = 
			btext +
			targetText + 
			sOldText.substring(nSelEnd)

		dom.selectionStart = btext.length
		dom.selectionEnd = btext.length
	}


	else {
		dom.value = 
			sOldText.substring(0, nSelStart) +
			targetText + 
			sOldText.substring(nSelEnd)


		dom.selectionStart = nSelStart
		dom.selectionEnd = nSelStart + (nSelStart === nSelEnd?0:targetText.length + 1)
	}


	cb.call(th)
	//end
}

JadeEditor.prototype.handleKeyEvt_close_bracket = function(event, cb) {

	if(event.ctrlKey) return this.handleKeyEvt_tab(event, cb)

}

JadeEditor.prototype.handleKeyEvt_single_quote = function(event, cb) {

	var th = this
	,opts = th.options
	,dom = th.dom
	,nSelStart = dom.selectionStart
	,nSelEnd = dom.selectionEnd
	,sOldText = dom.value

	,char = event.shiftKey?'"':"'"

	event.preventDefault()

	dom.value = 
		sOldText.substring(0, nSelStart) +
		char + 
		sOldText.substring(nSelStart, nSelEnd) + 
		char +
		sOldText.substring(nSelEnd)

	dom.selectionStart = nSelStart === nSelEnd?nSelStart + 1:nSelStart
	dom.selectionEnd = nSelEnd + (nSelStart === nSelEnd?1:2)
	cb.call(th)
	//end

}

JadeEditor.prototype.handleKeyEvt_left_bracket = function(event, cb) {

	var th = this
	,opts = th.options
	,dom = th.dom
	,nSelStart = dom.selectionStart
	,nSelEnd = dom.selectionEnd
	,sOldText = dom.value

	,char = event.shiftKey?'"':"'"

	if(!event.shiftKey) return cb.call(th)

	event.preventDefault()

	dom.value = 
		sOldText.substring(0, nSelStart) +
		'(' + 
		sOldText.substring(nSelStart, nSelEnd) + 
		')' +
		sOldText.substring(nSelEnd)

	dom.selectionStart = nSelStart === nSelEnd?nSelStart + 1:nSelStart
	dom.selectionEnd = nSelEnd + (nSelStart === nSelEnd?1:2)
	cb.call(th)
	//end

}

JadeEditor.prototype.handleKeyEvt_i = function(event, cb) {

	var th = this
	,opts = th.options
	,dom = th.dom
	,nSelStart = dom.selectionStart
	,nSelEnd = dom.selectionEnd
	,sOldText = dom.value

	

	if(!event.ctrlKey) return cb.call(th)

	event.preventDefault()

		dom.value = 
			sOldText.substring(0, nSelStart) + 
			'<i>' + 
			sOldText.substring(nSelStart, nSelEnd) + 
			'</i>' + 
			sOldText.substring(nSelEnd)

		dom.selectionStart = nSelStart === nSelEnd?nSelStart + 3:nSelStart
		dom.selectionEnd = nSelEnd + (nSelStart === nSelEnd?3:7)
		cb.call(th)

	//end
}

JadeEditor.prototype.handleKeyEvt_b = function(event, cb) {

	var th = this
	,opts = th.options
	,dom = th.dom
	,nSelStart = dom.selectionStart
	,nSelEnd = dom.selectionEnd
	,sOldText = dom.value

	if(!event.ctrlKey) return cb.call(th)
		
	event.preventDefault()

	dom.value = 
		sOldText.substring(0, nSelStart) + 
		'<b>' + 
		sOldText.substring(nSelStart, nSelEnd) + 
		'</b>' + 
		sOldText.substring(nSelEnd)

	dom.selectionStart = nSelStart === nSelEnd?(nSelStart + 3):nSelStart
	dom.selectionEnd = nSelEnd + (nSelStart === nSelEnd?3:7)
	cb.call(th)

	//end
}

window.JadeEditor = JadeEditor

})(window, document);
