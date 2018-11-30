/**
 * Created by Vasiliy Smolyar
 * vasiliy.dpk@gmail.com
 */
module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: false,
                    sourceMap: true,
                    sourceMapFilename: 'css/styles.css.map',
                    sourceMapURL: 'css/styles.css.map',
                    sourceMapRootpath: '/diva.loc/'
                },
                files: {
                    "css/main.css": "development/less/main.less"
                }
            }
        },
        concat_css: {
            options: {
            },
            all: {
                src: ['development/libs/**/*.css', 'css/main.css'],
                dest: 'css/styles.css'
            },
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['development/libs/**/*.js', 'development/js/custom.js'],
                dest: 'development/js/concat_scripts.js',
            },
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'scripts/scripts.min.js': ['development/js/concat_scripts.js']
                }
            }
        },
        watch: {
            styles: {
                files: ['development/**/*.less', 'development/**/*.css', 'development/**/*.js'],
                tasks: ['less', 'concat_css', 'cssmin', 'concat', 'uglify'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default', ['less', 'concat_css', 'cssmin', 'concat', 'uglify', 'watch']);
};