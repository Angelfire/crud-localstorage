(function(){
		window.App = {
    Models: {},
    Views: {},
    Collections: {}
  };

  // Contact Model
  // ----------
  App.Models.Contacto = Backbone.Model.extend({
  	// Default attributes for the todo item.
  	defaults: function(){
  		return {
	      nombre: 'Andrés',
        telefono: '1234567',
        email: 'andres.bedoya@globant.com'
	    };
    },

    // Validation for a model
  	validate: function(attributes){
      if (!_.isString(attributes.nombre) || !attributes.name){
        return "Solo se permiten letras";
      }
      if (!_.isNumber(attributes.telefono)){
        return "Solo se permiten números";
      }
    }
  });

  // Contact Collection
  // ---------------
  App.Collections.Contactos = Backbone.Collection.extend({
  	// Reference to this collection's model
  	model: App.Models.Contacto,

  	// Save all of the todo items under the `"agenda-contacto"` namespace
    localStorage: new Backbone.LocalStorage("agenda-contacto")

  });

  //var contactosCollection = new App.Collections.Contactos;

  // Contact View - For all Contact
  // -------------------------
  App.Views.Contactos = Backbone.View.extend({
  	tagName: "tbody",

		initialize: function() {
			//this.listenTo(contactosCollection, 'add', this.addOne);
			this.collection.on('add', this.addOne, this);
		},

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(contacto) {
			var contactoView = new App.Views.Contacto({ model: contacto });
			this.$el.append(contactoView.render().el);
		}
  });

  // Contact View - For one Contact
  // -------------------------
  App.Views.Contacto = Backbone.View.extend({
  	tagName: "tr",

  	// Cache the template function for a single contact
    template: _.template($('#lista-contactos').html()),

    initialize: function(){
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
      // this.listenTo(this.model, 'change', this.render);
      // this.listenTo(this.model, 'destroy', this.remove);
    },

    events: {
      'click .btnEdit': 'editContact',
      'click .btnDelete': 'deleteContact'
    },

    // Edit info for a contact
    editContact: function(){

    },

		// Remove the model
		remove: function() {
			this.$el.remove();
		},

		// Destroy the model
    deleteContact: function(){
			this.model.destroy();
		},

		render: function() {
			this.$el.append(this.template(this.model.toJSON()));
			return this;
		}

  });

  // Contac View - For add a Contact
  // -------------------------
  App.Views.AddContacto = Backbone.View.extend({
		el: '.form-signin',

		events: {
			'submit': 'submit'
		},

		submit: function(e) {
			e.preventDefault();

			var contacto = new App.Models.Contacto({
				nombre: $('#nombre').val(),
				telefono: $('#telefono').val(),
				email: $('#email').val()
			});

			// Adding model to collection
			this.collection.add(contacto);

			// Saving model into localStorage
			contacto.save();
		}
	});

  // Data example, a new collection of contacts
	var contactosCollection = new App.Collections.Contactos([
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

  var addContactoView = new App.Views.AddContacto({ collection: contactosCollection });
  var contactosView = new App.Views.Contactos({ collection: contactosCollection });

  $('#contactos-agenda').append(contactosView.render().el);

 //var contactosView = new App.Views.Contactos();

})();