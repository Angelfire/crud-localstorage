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

  // Create a global collection of Contactos
  var contactosCollection = new App.Collections.Contactos;

  // Contact View - For all Contact
  // -------------------------
  App.Views.Contactos = Backbone.View.extend({
  	el: ".tbody",

		initialize: function() {
			this.listenTo(contactosCollection, 'add', this.addOne);
      this.listenTo(contactosCollection, 'reset', this.addAll);
     
      contactosCollection.fetch();
		},

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(contacto) {
			var contactoView = new App.Views.Contacto({ model: contacto });
			this.$el.append(contactoView.render().el);
		},

    addAll: function() {
      //this.$el.find('td').html('');
      contactosCollection.each(this.addOne, this);
    }

  });

  // Contact View - For one Contact
  // -------------------------
  App.Views.Contacto = Backbone.View.extend({
  	tagName: "tr",

  	// Cache the template function for a single contact
    template: _.template($('#lista-contactos').html()),

    initialize: function(){
      // this.model.on('change', this.render, this);
      // this.model.on('destroy', this.remove, this);
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    events: {
      'click .btnEdit': 'editContact',
      'click .btnDelete': 'deleteContact',
    },

    // Edit info for a contact
    editContact: function(e){
   
    this.model.set({"nombre": prompt("Edita el nombre", this.model.get("nombre")), 
                  "telefono": prompt("Edita el telefono", this.model.get("telefono")),
                  "email": prompt("Edita el email", this.model.get("email"))});
    
    this.model.save();
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
			'submit': 'submit',
		},

		submit: function(e) {
			e.preventDefault();

			var contacto = new App.Models.Contacto({
				nombre: $('#nombre').val(),
				telefono: $('#telefono').val(),
				email: $('#email').val()
			});

			// Adding model to collection
			contactosCollection.add(contacto);

			// Saving model into localStorage
			contacto.save();
		}
	});


  var addContactoView = new App.Views.AddContacto({ collection: contactosCollection });
  var contactosView = new App.Views.Contactos({ collection: contactosCollection });

  $('#contactos-agenda').append(contactosView.el);

  
})();