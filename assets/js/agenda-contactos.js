(function(){ 
  // variables
  var Contacto =  Contacto || {},
      ContactoCollection = ContactoCollection || {},
      ContactoView = ContactoView || {};

  // Model
  Contacto = Backbone.Model.extend({
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

  // Collection
  ContactoCollection = Backbone.Collection.extend({
    model: Contacto,
    localStorage: new Backbone.LocalStorage("Contactos")
  });

  // View
  ContactoView = Backbone.View.extend({
    el: '#contactos-agenda',

    template: _.template($('#lista-contactos').html()),

    initialize: function(){
      this.render();
    },

    render: function(){
      // this render a model
      // var tbody = this.$el.find("tbody");
      // tbody.empty();
      // tbody.append(this.template(this.model.toJSON()));
      this.collection.each(function(contacto){
        var contactoView = new ContactoView({ model: contacto });
        console.log(contactoView);
      });
      return this;
    },  

    events: {
      'click .btn-lg': 'add',
      'click .btnEdit': 'edit',
      'click .btnDelete': 'delete'
    },

    add: function(){
      var newContact = new Contacto({
        nombre: $('nombre').val(),
        telefono: $('telefono').val(),
        email: $('email').val()
      });
      agendacollection.add(JSON.stringify(newContact));
    },

    edit: function(){

    },

    delete: function(){
      this.model.destroy();
      this.remove();
    }

  });

  var contactoCollection = new ContactoCollection([
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
  
  var contactosView = new ContactoView({ collection: contactoCollection });

})();