module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	    connect: {
	    	server: {
	    		options: {
	    			//keepalive: true,
	    			port: 9001,
	    			base: './'
	    		}
	    	}
	    },
	    less: {
	    	development: {
	    		files: {
	    			'assets/css/agenda.css': 'assets/less/agenda.less'
	    		}
	    	}
	    },
	    watch: {
	    	less: {
	    		files: 'assets/less/*.less',
	    		tasks: ['less']
	    	}
	    }
	});

	// Default task(s).
	grunt.registerTask('default');

	grunt.registerTask('server', ['connect:server', 'watch']);

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
}; 