module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'static/sass',
                    src: ['*.scss'],
                    dest: 'contents/static/css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            sass: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            js: {
                files: 'static/js/*.js',
                tasks: ['requirejs']
            }
        },

        requirejs: {
            compile: {
                options: {
                    appDir: 'static/',
                    baseUrl: 'js',
                    dir: 'contents/static/',
                    modules: [
                        {
                            'name': 'main'
                        }
                    ],
                    removeCombined: true,
                    fileExclusionRegExp: 'sass',
                    mainConfigFile: 'static/js/main.js',
                    optimize: 'uglify2',
                    done: function (done, output) {
                        grunt.task.run('sass');
                        done();
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
};