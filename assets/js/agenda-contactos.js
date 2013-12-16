define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
  // variables
  var AgendaModel = AgendaModel || {},
      AgendaCollection = AgendaCollection || {},
      AgendaView = AgendaView || {};

  // Model
  AgendaModel = Backbone.Model.extend({
    initialize: function(){
      console.log('Agenda Model has been initialized');
    },
    defaults: function(){
      return{
        nombre: '',
        telefono: '',
        email: ''
      };
    }
  });

  var agendamodel = new AgendaModel();

  // Collection
  AgendaCollection = Backbone.Collection.extend({
    initialize: function(){
      console.log("Agenda Collection has been initialized");
    },
    model: AgendaModel
  });

  var agendacollection = new AgendaCollection();

  // View
  AgendaView = Backbone.View.extend({
    el: $('#container'),

    initialize: function(){
      _.bindAll(this);
    },

    tempCont: _.template($('#lista-contactos').html()),

    events: {
      'click .btn-lg': 'add',
      'click .btnEdit': 'edit',
      'click .btnDelete': 'delete'
    },

    add: function(){
      var newContact = new AgendaModel({
        nombre: $('nombre').val(),
        telefono: $('telefono').val(),
        email: $('email').val()
      });
      agendacollection.add(JSON.stringify(newContact));
    },

    edit: function(){

    },

    delete: function(){

    }


  });

  var agendaview = new AgendaView();

});
