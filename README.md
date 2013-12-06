Gridline
===========

This simple and light-weight JavaScript allows for more control over grid systems in any Twitter Bootstrap 3 project.
Simply include the file and then use data attributes to control the number of columns in any row, the gutter width, and more.

```
<div class="row" data-columns="16">
	<div class="col-md-8"></div>
	<div class="col-md-8"></div>
</div>
```

```
<div class="row" data-columns="24" data-gutter-width="10">
	<div class="col-md-8"></div>
	<div class="col-md-8"></div>
	<div class="col-md-4"></div>
	<div class="col-md-4"></div>
</div>
```

Open the ```dist/example/index.html``` file for more examples.

### Installing

I'd use Bower if I were you. Simply run ```bower install gridline-bootstrap``` and include the minified JavaScript in the ```<head>``` 
section of your web pages. Something like: ```<script type="text/javascript" src="/bower_components/dist/gridline.min.js"></script>```

### Building

I simply use Node.js to minify using minify. ```npm install -g minify``` if you don't have it already and then    
```minify src/gridline.js dist/gridline.min.js```