(function(){ 
  // global variables - namespacing
  window.App = {
    Models: {},
    Views: {},
    Collections: {}
  };

  // Model for a Contact
  App.Models.Contacto = Backbone.Model.extend({
    defaults: {
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

  // Collection for all Contacts
  App.Collections.Contactos = Backbone.Collection.extend({
    model: App.Models.Contacto,
    localStorage: new Backbone.LocalStorage("Contactos")
  });

  // View for all Contacts
  App.Views.Contactos = Backbone.View.extend({
    el: $('#contactos-agenda').find('tbody'),

    render: function(){      
      console.log(this.collection.each);
    }

  });

  // View for one Contacts
  App.Views.Contacto = Backbone.View.extend({
    el: $('#contactos-agenda'),

    template: _.template($('#lista-contactos').html()),

    initialize: function(){
      this.render();
    },

    render: function(){
      var tbody = this.$el.find("tbody");//.find('tr');
      tbody.empty();
      tbody.append(this.template(this.model.toJSON()));      
      return this;
    },

    events: {
      'click .btn-lg': 'add',
      'click .btnEdit': 'edit',
      'click .btnDelete': 'delete'
    },

    add: function(){
      var newContact = new App.Models.Contacto({
        nombre: $('nombre').val(),
        telefono: $('telefono').val(),
        email: $('email').val()
      });
    },

    edit: function(){

    },

    delete: function(){
      this.model.destroy();
      this.remove();
    }

  });

  var contactoCollection = new App.Collections.Contactos([
    {
      nombre: 'Sergio',
      telefono: '1234567',
      email: 'andres.bedoya@globant.com'
    },
    {
      nombre: 'Laura',
      telefono: '1234567',
      email: 'andres.bedoya@globant.com'
    }
  ]);
  
  var contactosView = new App.Views.Contactos({ collection: contactoCollection });

})();