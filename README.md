**HIGHLY EXPERIMENTAL** This plugin provides very basic visualization features for [gremlin-console-js](https://github.com/PommeVerte/gremlin-console-js)

[![npm](https://img.shields.io/npm/v/gc-cytoscape-plugin.svg)]() [![GitHub license](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://raw.githubusercontent.com/PommeVerte/gc-cytoscape-plugin/master/LICENSE.txt)

## Preview
![Screen Shot](http://pommeverte.github.io/images/Screenshot-cytoscape.png)

## Install
```
npm install gc-cytoscape-plugin
```

## Getting started

##### Using ES2015/2016
```javascript
import GremlinConsole from 'gremlin-console';
import GCCytoscapePlugin from 'gc-cytoscape-plugin';

//create a console + input combo by passing css selectors to GremlinConsole
//Load http://localhost:80/my/path
const gc = GremlinConsole('#console-window', '#console-input', {
  visualizerOptions: {container: "#visualization-window"}
});
gc.register(GCCytoscapePlugin()); //register the plugin
```

##### In browser
```html
<head>
  <!-- ... -->
  <link rel="stylesheet" type="text/css" href="umd/css/default.css">
  <script src="path-to-umd/gremlin-console.min.js"></script>
  <script src="path-to-umd/gc-cytoscape-plugin.min.js"></script>
</head>
```
```javascript
//create a console + input combo by passing css selectors to GremlinConsole
//Load http://localhost:80/my/path
var gc = GremlinConsole.create('#console-window', '#console-input', {
  visualizerOptions: {container: "#visualization-window"}
});
gc.register(GCCytoscapePlugin.init()); //register the plugin
```

## Keep in mind
This is a very basic plugin. It only supports the `container` option and will choke on larger datasets.
