
describe('canvas-shapes', function () {

	var sandboxEl

	beforeEach(function() {
		sandboxEl = $('<div>').attr('id', 'sandbox').appendTo($('body'))
	})

	afterEach(function() {
		sandboxEl.remove()
	})

	var templates = {
		'default': {
			element: '<textarea id="te" class="form-control" rows="10"></textarea>'
		}
	}

	function compileDirective(template, locals) {
		template = templates[template]
		var element = $(template.element).appendTo(sandboxEl)
		jadeEditor.init('#te')
		return jQuery(element[0])
	}

	// Tests

	describe('basic function', function () {


	})




})
