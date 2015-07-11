
describe('jade-editor', function () {

	var sandboxEl

	beforeEach(function() {
		sandboxEl = $('<div>').attr('id', 'sandbox').appendTo($('body'))
	})

	afterEach(function() {
		sandboxEl.remove()
	})

	var templates = {
		'default': {
			element: '<div class="jade-editor"><textarea id="je" class="form-control" rows="10"></textarea><pre  lang="jade" class="jade-editor-syntax prettyprint"></pre>'
		}
	}

	function compileDirective(template, locals) {
		template = templates[template]
		var element = $(template.element).appendTo(sandboxEl)
		return jQuery(element[0])
	}

	// Tests

	describe('basic function', function () {

		it('init', function() {
			var tmp = compileDirective('default')
			var je = new JadeEditor('je')
			//console.log(sendEvent)
			console.log(window.opener)
			expect(!!(je && je.options && je.dom)).to.equal(true)

		})

		// it('press tab', function(done) {
		// 	var tmp = compileDirective('default')
		// 	var je = new JadeEditor('je')

		// 	je.dom.selectionStart = 0
		// 	je.dom.selectionEnd = 0
		// 	var event = jQuery.Event('keydown')
		// 	event.which = 9
		// 	event.keyCode = 9
		// 	$('#je').on('keydown', function(e) {
		// 		console.log('keydowned')
		// 		console.log(e.keyCode)
		// 	})
		// 	//$('#je').trigger('focus')
		// 	$('#je').trigger(event)

		// 	setTimeout(function() {
		// 		expect(je.dom.value).to.equal('    ')
		// 		expect(/</.test(je.pre.innerHTML)).to.equal(true)
		// 		done()
		// 	}, 200)

		// })

		// it('press tab on selection', function() {
		// 	var tmp = compileDirective('default')
		// 	var je = new JadeEditor('je')

		// 	$('#je').focus()
		// 	je.dom.value = 'sdsd\n    hdfhgjfd\nsdfsdf'
		// 	var v = je.dom.value
		// 	,len = v.length
		// 	je.dom.selectionStart = 0
		// 	je.dom.selectionEnd = len

		// 	var event = jQuery.Event('keypress')
		// 	event.which = 9
		// 	event.keyCode = 9
		// 	$('#je').trigger(event)

		// 	expect(je.dom.value).to.equal('    sdsd\n        hdfhgjfd\n    sdfsdf')
		// 	expect(/</.test(je.pre.innerHTML)).to.equal(true)
		// })

	})




})
