require.config({
	'baseUrl': 'assets/js',
	'paths': {
    // define vendor paths
		'jquery': '//code.jquery.com/jquery-1.10.2.min',
    'underscore': 'vendor/underscore-min',
    'backbone': 'vendor/backbone-min'    
	},

  // shim declaration
  shim: {
    'underscore': {
      'exports': '_'  
    },
    'backbone': {
      'deps': ['jquery', 'underscore'],
      'exports': 'Backbone'
    }
  }

});

requirejs(["agenda-contactos"]);