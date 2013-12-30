require.config({
  baseUrl: "/assets/",
  paths: {
    'jquery': 'js/vendor/jquery-1.10.2.min',
    'underscore': 'js/vendor/underscore-min',
    'backbone': 'js/vendor/backbone-min',
    'backbone.localStorage': 'js/vendor/backbone.localStorage-min'
  },
  shim: {
    'underscore': {
      exports: "_"
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    }
  }
});