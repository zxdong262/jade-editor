# jade-editor
jade online editor for jade users.

## demo
visit <a href='http://jade-editor.org'>http://jade-editor.org</a>

## get
```bash
bower install jade-editor
```

or

```bash
npm install jade-editor
```

## features
- auto indent
- indent can be customized
- auto close for <code>quote</code>, <code>single quote</code>, <code>bracket</code>, <code>left parenthesis</code>
- smart tab: tab selection or single line
- untab keyboard shortcuts: <code>ctrl + [</code>
- tab keyboard shortcuts: <code>ctrl + ]</code> or just <code>tab</code>
- keyboard shortcuts for <code>i</code> and <code>b</code>

## use
```html
<textarea id="je"></textarea>>
<script src="jade-editor.js"></script>
<script>
    var je = new JadeEditor('je', {
        indent: '    ' //4 space as indent
    })
</script>
```

## status
- lots of todos: smarter shortcut behavior, preview api, syntax highlighting...
- need test
- just the first release

## License
MIT