(function(){
	window.App = {
    Models: {},
    Views: {},
    Collections: {}
  };

  // Contact Model
  // ----------
  App.Models.Contacto = Backbone.Model.extend({});

  // Contact Collection
  // ---------------
  App.Collections.Contactos = Backbone.Collection.extend({
  	// Reference to this collection's model
  	model: App.Models.Contacto,

  	// Save all of the todo items under the `"agenda-contacto"` namespace
    localStorage: new Backbone.LocalStorage("agenda-contacto"),

  });

  // Contact View - For all Contact
  // -------------------------
  App.Views.Contactos = Backbone.View.extend({
  	tagName: "tbody",

  		initialize: function() {
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
      this.model.on('delete', this.remove, this);
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
			this.$el.html(this.template(this.model.toJSON()));
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
				nombre: $('nombre').val(),
				telefono: $('telefono').val(),
				email: $('email').val()
			});

			this.collection.add(contacto);
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

  $('#contactos-agenda').find('tbody').html(contactosView.render().el);

})();