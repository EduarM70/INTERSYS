const mix = require('laravel-mix');

//var gulp = require('gulp');

var filesToCreate = {

	'appStyle': [
		'./node_modules/reset-css/reset.css',
		'./node_modules/jgrowl/jquery.jgrowl.css',	
		'./node_modules/izimodal/css/iziModal.css',
		'./node_modules/@fortawesome/fontawesome-free/css/all.css',
		'./node_modules/bootstrap/dist/css/bootstrap.css',

		'resources/css/animate.css',
		'resources/css/jquery.floatingscroll.css',	
		'resources/css/animate_tab.css',
		'resources/css/style_tab.css',
		'resources/css/jstree-themes/style.css',
		'resources/css/infinite.css',
		
		// Estilo Intersys
		'resources/css/intersys.css',

		// NUEVOS ESTILOS DE MARKSTYLES
		'resources/css/main.css',

		// jquery UI 
		'./node_modules/jquery-ui-dist/jquery-ui.min.css',
		'./node_modules/jquery-ui-dist/jquery-ui.theme.min',
		// './node_modules/datatables.net-dt/css/jquery.dataTables.css',

		'./node_modules/selectize/dist/css/selectize.css',
		'./node_modules/selectize/dist/css/selectize.default.css',

	],
	'exDepends': [
		'./node_modules/jquery-ui-dist/jquery-ui.min.js',
		'resources/js/timePropio.js',
		'resources/js/depends/jquery.idle.min.js',
		'resources/js/depends/jquery.floatingscroll.min.js',
		'resources/js/depends/jquery.floatThead.min.js',
		'resources/js/depends/jquery.multipurpose_tabcontent',
		'resources/js/depends/jquery.serializeObject.min.js',

	]
}

mix.sourceMaps(false);

// Crear Style App
mix.combine(['resources/css/Intersys-Style/*.css'], 'resources/css/intersys.css');

mix.combine(['resources/css/markstyles/**/*.css'],  'resources/css/main.css');

// App.js
mix.js('resources/js/app.js', 'public/dist/app.js');

// Crear archivo de dependencias conectado jQuery > Vue
mix.js('resources/js/dependencias.js', 'public/dist/depends.js');

// Combinador de dependencias adicionales y de terceros
mix.combine(filesToCreate.exDepends, 'public/dist/exDepends.js')/*.version()*/;

// Crear app.css
mix.styles(filesToCreate.appStyle, 'public/css/app.css')/*.version()*/;
var 
	browserSync = require("browser-sync").create()
;

    /*
mix.minify('public/css/app.css');

mix.version();*/

browserSync.init({
    watch: true,
    opened: false,
    files: [
        {
            match: ["resources/css/*.css"],
            fn: function (event, file) {
            	this.reload();
            }
        }
    ],
});
browserSync.watch(['./resources/css/*.css']);

