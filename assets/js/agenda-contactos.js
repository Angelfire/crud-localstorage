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
    defaults: {
      nombre: '',
      telefono: '',
      email: ''
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

  var agendacollection = new AgendaCollection(agendamodel);

  // View
  AgendaView = Backbone.View.extend({
    el: $('#container'),

    tempCont: _.template($('#lista-contactos').html()),

    events: {
      'click button': 'add',
      'click .btnEdit': 'edit',
      'click .btnDelete': 'delete'
    },

    add: function() {

    },

    edit: function() {

    },

    delete: function(){

    }


  });

  var agendaview = new AgendaView();

});
