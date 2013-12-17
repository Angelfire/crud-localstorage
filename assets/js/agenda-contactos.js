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
    },

    validate: function(attributes){
      console.log(attributes);
      if (!_.isString(attributes.nombre) || !attributes.name){
        return "Solo se permiten letras";
      }
      if (!_.isNumber(attributes.telefono)){
        return "Solo se permiten números";
      }
    }
  });

  // Collection
  AgendaCollection = Backbone.Collection.extend({
    initialize: function(){
      console.log("Agenda Collection has been initialized");
    },
    model: AgendaModel
  });

  // View
  AgendaView = Backbone.View.extend({
    el: $('#container'),

    tempCont: _.template($('#lista-contactos').html()),

    events: {
      'click .btn-lg': 'add',
      'click .btnEdit': 'edit',
      'click .btnDelete': 'delete'
    },

    render: function(){

    },

/*    initialize: function() {
      _.bindAll(this);

      this.model = new AgendaCollection();
    },*/

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