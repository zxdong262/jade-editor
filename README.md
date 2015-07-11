# jade-editor
jade online editor for jade users.[!only support webkit browsers for now]

## demo & doc
visit <a href='http://jade-editor.org'>http://jade-editor.org</a>

## get
```bash
bower install jade-editor
```

or

```bash
npm install jade-editor
```

all the file are in <code>dist</code> folder, other code are just for jade-editor.org.

## features
- auto indent
- indent can be customized
- auto close for <code>quote</code>, <code>single quote</code>, <code>bracket</code>, <code>left parenthesis</code>
- smart tab: tab selection or single line
- untab keyboard shortcuts: <code>ctrl + [</code>
- tab keyboard shortcuts: <code>ctrl + ]</code> or just <code>tab</code>
- keyboard shortcuts for <code>i</code> and <code>b</code>
- syntax highlighting by google code prettify

## shortcuts
- <code>ctrl + ]</code>, <code>ctrl + ]</code>: more indent
- <code>ctrl + [</code>: less indent
- <code>ctrl + i</code>: '&lt;i>[selection]&lt;/i>'
- <code>ctrl + b</code>: '&lt;b>[selection]&lt;/b>'

## use
```html
<link rel="stylesheet" href="dist/jade-editor.css?0.1.0">
<div class="jade-editor">
    <textarea id="je"></textarea>
    <pre lang="jade" class="jade-editor-syntax prettyprint"></pre>
</div>
<script src="dist/vender/prettify.js"></script>
<script src="dist/jade-editor.min.js"></script>
<script>
    var je = new JadeEditor('je', {
        indent: '    ' //4 space as indent
    })
</script>
```

## todo
test

## License
MIT

## changelog
- 0.2.5 fix 'enter' function