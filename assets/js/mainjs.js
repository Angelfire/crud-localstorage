require.config({
  baseUrl: "/assets/",
  paths: {
    'jquery': 'vendor/jquery-1.10.2.min',
    'underscore': 'vendor/underscore-min',
    'backbone': 'vendor/backbone-min',
    'backbone.localStorage': 'vendor/backbone.localStorage-min'
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