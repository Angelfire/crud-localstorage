(function(){ 
  // global variables - namespacing
  window.App = {
    Models: {},
    Views: {},
    Collections: {}
  };

  // Model for a Contact
  App.Models.Contacto = Backbone.Model.extend({
    // defaults: {
    //     nombre: '',
    //     telefono: '',
    //     email: ''
    // }

    /*validate: function(attributes){
      if (!_.isString(attributes.nombre) || !attributes.name){
        return "Solo se permiten letras";
      }
      if (!_.isNumber(attributes.telefono)){
        return "Solo se permiten números";
      }
    }*/
  });

  // Collection for all Contacts
  App.Collections.Contactos = Backbone.Collection.extend({
    model: App.Models.Contacto,
    //localStorage: new Backbone.LocalStorage("Contactos")
  });

  // View for all Contacts
  App.Views.Contactos = Backbone.View.extend({
    el: $('#contactos-agenda').find('tbody'),

    initialize: function(){
      this.collection.on('add', this.addOne, this);
    },

    render: function(){  
      this.collection.each(this.addOne, this);

      // _.each(this.collection, function(contacto){
      //   var contactoView = new App.Views.Contactos({ model: contacto });
      //   this.$el.append(contactoView.render().el);
      // }, this);

      return this;
    },

    addOne: function(contacto){
      var contactoView = new App.Views.Contacto({ model: contacto })
      this.$el.append(contactoView.render().el);
    }

  });

  // View for one Contacts
  App.Views.Contacto = Backbone.View.extend({
    el: $('#contactos-agenda').find("tbody").find('tr'),

    template: _.template($('#lista-contactos').html()),

    initialize: function(){
      this.model.on('change', this.render, this);
      this.model.on('delete', this.remove, this);
    },

    events: {
      'click .btnEdit': 'edit',
      'click .btnDelete': 'delete'
    },

    edit: function(){

    },

    // Remove the model
    remove: function(){
      this.remove();
    },

    // Destroy the model
    delete: function(){
      this.model.destroy();      
    },

    render: function(){
      this.$el.empty();
      this.$el.append(this.template(this.model.toJSON()));      
      return this;
    }

  });

  // View for add a Contact
  App.Views.AddContacto = Backbone.View.extend({
    el: '.form-signin',

    events: {
      'submit': 'add'
    },

    // add: function(){
    //   var newContact = new App.Models.Contacto({
    //     nombre: $('nombre').val(),
    //     telefono: $('telefono').val(),
    //     email: $('email').val()
    //   });
    // },

    add: function(e) {
      e.preventDefault();

      var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();

      var contacto = new App.Models.Task({ 
        title: newContacto 
      });
      
      this.collection.add(contacto);
    }
  });

  var contactoCollection = new App.Collections.Contactos([
    {
      nombre: 'Andres',
      telefono: '1234567',
      email: 'andres.bedoya@globant.com'
    },
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
  
  var AddContactoView = new App.Views.AddContacto({ collection: contactoCollection });
  var contactosView = new App.Views.Contactos({ collection: contactoCollection });

  $('#lista-contactos').append(contactosView.render().el);

})();