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
      id: 1,
      nombre: 'Andres',
      telefono: '1234567',
      email: 'andres.bedoya@globant.com'
  },

  validate: function(attributes){
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
  el: '#contactos-agenda',

  template: _.template($('#lista-contactos').html()),

  initialize: function(){
    this.render();
  },

  render: function(){
    var tbody = this.$el.find("tbody");
    tbody.empty();
    tbody.append(this.template(this.model.toJSON()));
  },  

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

var agendamodel = new AgendaModel();
var agendaview = new AgendaView({ model: agendamodel });