
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

	this.options = {}
	this.options.indent = options.indent || defaults.indent
	this.inited = true

	this.evt()

	//end
}

JadeEditor.prototype.evt = function() {

	var th = this
	,dom = th.dom

	dom.addEventListener('keyup', function(event) {

		var keycode = event.keyCode

		,kf = JadeEditor.keycodes.keyup[keycode]

		if(!kf) return

		th['handleKeyEvt_' + kf](event)

		//dom.focus()

	}, false)

	dom.addEventListener('keydown', function(event) {

		var keycode = event.keyCode

		,kf = JadeEditor.keycodes.keydown[keycode]

		if(!kf) return

		th['handleKeyEvt_' + kf](event)

		//dom.focus()

	}, false)

	th.autoGrow()

	//end
}


JadeEditor.prototype.autoGrow = function() {

	var dom = this.dom

  if (dom.scrollHeight > dom.clientHeight) {
    dom.style.height = dom.scrollHeight + 'px'
  }
  //end
}

JadeEditor.prototype.handleKeyEvt_tab = function(event) {

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
	}

	//end
}

JadeEditor.prototype.handleKeyEvt_enter = function(event) {

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

	//end
}

JadeEditor.prototype.handleKeyEvt_backspace = function(event) {

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


	//end
}

JadeEditor.prototype.handleKeyEvt_open_bracket = function(event) {

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

	if(!event.ctrlKey) return dom.value = 
		sOldText.substring(0, nSelStart) +
		charOpen + 
		targetText + 
		charClose +
		sOldText.substring(nSelEnd)

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

	if(noSel) return dom.value = 
		btext +
		targetText + 
		sOldText.substring(nSelEnd)

	dom.value = 
		sOldText.substring(0, nSelStart) +
		targetText + 
		sOldText.substring(nSelEnd)



}

JadeEditor.prototype.handleKeyEvt_close_bracket = function(event) {

	if(event.ctrlKey) return this.handleKeyEvt_tab(event)

}

JadeEditor.prototype.handleKeyEvt_single_quote = function(event) {

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

}

JadeEditor.prototype.handleKeyEvt_left_bracket = function(event) {

	var th = this
	,opts = th.options
	,dom = th.dom
	,nSelStart = dom.selectionStart
	,nSelEnd = dom.selectionEnd
	,sOldText = dom.value

	,char = event.shiftKey?'"':"'"

	if(!event.shiftKey) return

	event.preventDefault()

	dom.value = 
		sOldText.substring(0, nSelStart) +
		'(' + 
		sOldText.substring(nSelStart, nSelEnd) + 
		')' +
		sOldText.substring(nSelEnd)

}

JadeEditor.prototype.handleKeyEvt_i = function(event) {

	var th = this
	,opts = th.options
	,dom = th.dom
	,nSelStart = dom.selectionStart
	,nSelEnd = dom.selectionEnd
	,sOldText = dom.value

	if(!event.ctrlKey) return

	event.preventDefault()

	dom.value = 
		sOldText.substring(0, nSelStart) + 
		'<i>' + 
		sOldText.substring(nSelStart, nSelEnd) + 
		'</i>' + 
		sOldText.substring(nSelEnd)


}

JadeEditor.prototype.handleKeyEvt_b = function(event) {

	var th = this
	,opts = th.options
	,dom = th.dom
	,nSelStart = dom.selectionStart
	,nSelEnd = dom.selectionEnd
	,sOldText = dom.value

	if(!event.ctrlKey) return
		
	event.preventDefault()

	dom.value = 
		sOldText.substring(0, nSelStart) + 
		'<b>' + 
		sOldText.substring(nSelStart, nSelEnd) + 
		'</b>' + 
		sOldText.substring(nSelEnd)

}

window.JadeEditor = JadeEditor