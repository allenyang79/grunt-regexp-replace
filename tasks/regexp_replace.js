/*
 * grunt-regexp-replace
 * https://github.com/appier-user/gg
 *
 * Copyright (c) 2013 Allen Yang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('regexp_replace', 'use regext to replace files content', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
			console.log("f:"+f.src);
			//filter > map > join	
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
				console.log("filepath:"+filepath);
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var fileSource=grunt.file.read(filepath);
				console.log("content:"+fileSource);
				return fileSource;
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;
			console.log(src+" >>> "+f.dest);
      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
