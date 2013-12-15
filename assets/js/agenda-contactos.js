define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
  // Modelo
  AgendaModel = Backbone.Model.extend({
    initialize: function(){
      console.log('this model has been initializing');
    },
    defaults: {
      nombre: '',
      telefono: '',
      email: ''
    }

  });

  var agendamodel = new AgendaModel();

  AgendaView = Backbone.View.extend({
    el: $('#container'),

    tempCont = _.template($('#lista-contactos').html()),

    events: {
      'click button': 'add',
      'click .btnEdit': 'edit',
      'click .btnDelete': 'delete'
    }

    add: function() {

    },

    edit: function() {

    },

    delete: function(){

    }


  });

  var agendaview = new AgendaView();

});
