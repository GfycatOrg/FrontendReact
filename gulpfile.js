// Copyright (C) GfyCat, Inc - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Date: 09/09/2016
//
// *************************************
//
//   Gulpfile
//
// *************************************
//
// Available tasks:
//  'gulp'
//  'gulp build'
//
// *************************************
// -------------------------------------
//   Modules
// -------------------------------------
//
// gulp              : The streaming build system
// gulp-autoprefixer : Prefix CSS
// gulp-concat       : Concatenate files
// gulp-csscss       : CSS redundancy analyzer
// gulp-jshint       : JavaScript code quality tool
// gulp-load-plugins : Automatically load Gulp plugins
// gulp-minify-css   : Minify CSS
// gulp-parker       : Stylesheet analysis tool
// gulp-rename       : Rename files
// gulp-sass         : Compile Sass
// gulp-svgmin       : Minify SVG files
// gulp-svgstore     : Combine SVG files into one
// gulp-uglify       : Minify JavaScript with UglifyJS
// gulp-util         : Utility functions
// gulp-watch        : Watch stream
// run-sequence      : Run a series of dependent Gulp tasks in order
//
// -------------------------------------

var gulp = require('gulp');
var assign = require('lodash.assign');
var autoprefixer = require('autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var del = require('del');
var fs = require('fs');
var globby = require('globby');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var path = require('path');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var rsync = require('gulp-rsync');
var sass = require('gulp-sass');
var sftp = require('gulp-sftp');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var util = require('util');
var watchify = require('watchify');
var yaml = require('js-yaml');
var zip = require('gulp-zip');

var globs = require('./gulpGlobs');
var env;
var isProduction = (process.env.TRAVIS_BUILD_ID ? true : false) || (gutil.env.production ? true : false);
var isUpload = gutil.env.upload ? true : false;
var isProxy = false;
var options = {
  build: {
    artifacts: '../dist',
    css: './css/build',
    js: './javascript/build',
    sass: './css/build/sass'
  },
  upload: {
    destination: '../dist/upload-s3'
  }
};

try {
  env = require('./.env');
  if (isUpload) {
    options.sftpConfig = env[gutil.env.upload];
    if (!options.sftpConfig) {
      gutil.log(gutil.colors.red('SFTP config not found'));
    } else {
      isProxy = typeof options.sftpConfig.proxy === 'undefined' || !options.sftpConfig.proxy ?
        false : true;

      gutil.log('Environment:', gutil.colors.green(gutil.env.upload), gutil.colors.magenta(options.sftpConfig.host + ':' + options.sftpConfig.remotePath));

      if (isProxy) {
        gutil.log('React Environment:', gutil.colors.magenta(
          options.sftpConfig.proxy + ':' +  options.sftpConfig.remotePathReact)
        );
      }

      gutil.log('Production Build:', (isProduction ? gutils.colors.green('enabled') : gutil.colors.yellow('disabled')));
      gutil.log('Upload:', (isUpload ? gutil.colors.green('enabled') : gutil.colors.yellow('disabled')));
      gutil.log('React upload:', (isProxy ? gutil.colors.yellow('disabled') : gutil.colors.green('enabled')));
    }
  } else {
    require('gulp-stats')(gulp);
  }
} catch (e) {
  if (e instanceof TypeError) {
    gutil.log(gutil.colors.red('Please ensure configuration exists in .env file and specify valid environment to --upload'));
  } else {
    gutil.log(gutil.colors.red('Missing .env.js file'));
  }
}

gulp.task('clean', function() {
  return del(['./javascript/build', './css/build']);
});

// -------------------------------------
//   Task: default (for development)
// -------------------------------------
gulp.task('default', ['compile:app:js'], function() {
  upload(path.join(options.build.js, 'dist.min.js'));
});

gulp.task('sync', ['upload']);

gulp.task('upload', ['upload:angular', 'upload:react']);

gulp.task('upload:angular', function() {
  gulp.src('..').pipe(rsync({
    command: true,
    shell: isProxy ? 'ssh -A ' + options.sftpConfig.user + '@' + options.sftpConfig.proxy + ' ssh' : 'ssh',
    root: '..',
    compress: true,
    recursive: true,
    update: false,
    incremental: true,
    progress: true,
    hostname: options.sftpConfig.host,
    username: options.sftpConfig.user,
    destination: options.sftpConfig.remotePath,
    exclude: ['.git', '*.zip', 'node_modules', 'dist', 'bootstrap', 'cache', 'logs', '*.log', '.*', 'bin', 'FrontendReact'],
    include: ['src/*', 'web/*', 'app/config/*', '**/*.html.twig', '**/*.json', '**/*.html'],
    clean: false,
    silent: false
  }));
})

gulp.task('upload:react', function() {
  if (isProxy) {
    gulp.src('../FrontendReact').pipe(rsync({
      command: true,
      shell: 'ssh -A ' + options.sftpConfig.user + '@' + options.sftpConfig.proxy + ' ssh',
      root: '../FrontendReact',
      compress: true,
      recursive: true,
      update: false,
      incremental: true,
      progress: true,
      hostname: options.sftpConfig.host,
      username: options.sftpConfig.user,
      destination: options.sftpConfig.remotePathReact,
      exclude: ['.git', '*.zip', 'node_modules', 'dist', 'tests', 'logs', '*.log', '.*', 'server.sock'],
      include: ['FrontendReact/**/*'],
      clean: false,
      silent: false
    }));
  }
});

// -------------------------------------
//   Task: dist
// -------------------------------------
gulp.task('dist', ['compile:all'], function() {
  gulp.start('copy:all');
  if (isProduction) gulp.start('update:yaml');
  else gutil.log(gutil.colors.yellow('No travis environment - skip yaml update'));
});

gulp.task('compile:all', ['compile:all:js', 'compile:all:style',
  'compile:fbupload', 'compile:share-amp', 'compile:images',
  'compile:gfycat-share', 'compile:gfycat-share-dialog'], function() {
  if (isProduction) gulp.start('compile:artifacts');
});

gulp.task('compile:fbupload', ['compile:fbupload:js', 'compile:fbupload:css'], function() {
  twigInsert(
    "../src/Gfy/GfycatBundle/Resources/views/SocialDialog/fbupload_template.html.twig",
    "../src/Gfy/GfycatBundle/Resources/views/SocialDialog/fbupload.html.twig",
    {
      "{!fbupload_script!}": "javascript/build/fbupload.min.js",
      "{!fbupload_style!}": "css/build/fbupload.min.css"
    }
  );
});

gulp.task('compile:share-amp', ['compile:share-amp:css'], function() {
  twigInsert(globs.shareAmpTwigGlob.template, globs.shareAmpTwigGlob.dest,
    {
      "{!amp-custom-styles!}": "css/build/amp-sharepage.min.css"
    }
  );
});

gulp.task('compile:all:js', [
  'compile:app:js',
  'compile:simple:js',
  'compile:vendor:js',
  'compile:sharepage:js'
]);

gulp.task('compile:app:js', function() {
  return buildJS(globs.appScriptEntryGlob, true, 'dist.js');
});

gulp.task('compile:simple:js', function() {
  return buildSimpleJS(globs.simpleScriptGlob);
});

gulp.task('compile:vendor:js', function() {
  return buildConcatJS(globs.vendorScriptGlob, 'vendor.js', true);
});

gulp.task('compile:fbupload:js', function() {
  return buildConcatJS(globs.fbuploadScriptGlob, 'fbupload.js', false);
});

gulp.task('compile:sharepage:js', [
  'compile:sharepage-pre:js',
  'compile:sharepage-post:js'
]);

gulp.task('compile:sharepage-post:js', function() {
  return buildJS(globs.shareScriptEntryGlob[0], false, 'postload.js');
});

gulp.task('compile:sharepage-pre:js', function() {
  return buildJS(globs.shareScriptEntryGlob[1], false, 'preload.js');
});

gulp.task('compile:gfycat-share', function() {
  return buildJS(globs.gfycatShareGlob, false, 'gfycat-share.js');
});

gulp.task('compile:gfycat-share-dialog', function() {
  return buildJS(globs.gfycatShareDialogGlob, false, 'gfycat-share-dialog.js');
});

gulp.task('compile:all:style', ['compile:app:css', 'compile:sharepage:css']);

gulp.task('compile:app:scss', function() {
  return buildSass(globs.appSassGlob);
});

gulp.task('compile:fbupload:scss', function() {
  return buildSass(globs.fbuploadSassGlob);
});

gulp.task('compile:sharepage:scss', function() {
  return buildSass(globs.shareSassGlob);
});

gulp.task('compile:amp-sharepage:scss', function() {
  return buildSass(globs.shareAmpSassGlob);
});

gulp.task('compile:app:css', ['compile:app:scss'], function() {
  return buildCSS(globs.appCssGlob, 'dist.css');
});

gulp.task('compile:fbupload:css', ['compile:fbupload:scss'], function() {
  return buildCSS(globs.fbuploadCssGlob, 'fbupload.css');
});

gulp.task('compile:share-amp:css', ['compile:amp-sharepage:scss'], function () {
  return buildCSS(globs.shareAmpCssGlob, 'amp-sharepage.css');
});

gulp.task('compile:sharepage:css', ['compile:sharepage:scss'], function() {
  return buildCSS(globs.shareCssGlob, 'sharepage.css');
});

gulp.task('compile:artifacts', function() {
  return gulp.src(['../**', '!../**/*.zip', '!node_modules/**'], {dot: true})
    .pipe(zip('FrontendPHP_build.zip'))
    .pipe(gulp.dest(options.build.artifacts));
});

gulp.task('compile:images', function() {
  return gulp.src(['images/**/*'])
    .pipe(gulp.dest(path.join(options.build.css, '/images')));
});

gulp.task('copy:all', ['copy:css', 'copy:images', 'copy:js']);

gulp.task('copy:css', function() {
  return gulp.src(path.join(options.build.css, '/*.css'))
    .pipe(gulp.dest(options.upload.destination));
});

gulp.task('copy:images', function() {
  return gulp.src(path.join(options.build.css, '/images/**'))
    .pipe(gulp.dest(path.join(options.upload.destination, '/images')));
});

gulp.task('copy:js', function() {
  return gulp.src(path.join(options.build.js, '/*'))
    .pipe(gulp.dest(options.upload.destination));
});

gulp.task('update:yaml', function() {
  var filename = '../app/config/common/scriptlocations.yml';
  var contents = fs.readFileSync(filename, 'utf8');
  var data = yaml.load(contents);
  var updated;

  data.twig.globals.css_path = asset_url('dist.min.css');
  data.twig.globals.js_path = asset_url('dist.min.js');
  data.twig.globals.js_vendor_path = asset_url('vendor.min.js'); //TODO: only update if content is changed
  data.twig.globals.assets_base_path = asset_url('');
  data.twig.globals.css_base_path = asset_url('');

  updated = yaml.dump(data);
  fs.writeFile(filename, updated, function(err) {
    if (err) throw err;
    gutil.log(gutil.colors.green('YAML written.'));
  });

  function asset_url(path) {
    return util.format('https://assets.gfycat.com/web/%s/%s', process.env.TRAVIS_BUILD_ID, path);
  }
});

// -------------------------------------
//   Task: watch (for development)
// -------------------------------------
gulp.task('watch', ['watchify'], function() {
  gutil.log(gutil.colors.yellow('Watching your files...'));
  gutil.log(gutil.colors.yellow("Auto-Upload " + (gutil.env.upload ? "ON" : "OFF")));

  gulp.watch([
    './javascript/build/**',
    '../**/*.html*',
    './css/build/**'
  ], function(event) {
    gulp.start('sync');
  });

  gulp.watch(globs.simpleScriptGlob, ['compile:simple:js'])
    .on('change', changeHandler);
  gulp.watch(globs.fbuploadScriptGlob, ['compile:fbupload:js'])
    .on('change', changeHandler);
  gulp.watch([globs.shareAmpTwigGlob.template, globs.shareAmpTwigGlob.analytics], ['compile:share-amp'])
    .on('change', changeHandler);
  gulp.watch(globs.gfycatShareGlob, ['compile:gfycat-share'])
    .on('change', changeHandler);
  gulp.watch(globs.gfycatShareDialogGlob, ['compile:gfycat-share-dialog'])
    .on('change', changeHandler);

  gulp.watch([
    './javascript/**/*.scss',
    './sass/**',
    '!./sass/fbupload.scss',
    '!./sass/sharepage.scss',
    '!./sass/amp-sharepage.scss'
  ], ['compile:app:css']).on('change', changeHandler);

  gulp.watch(globs.shareSassGlob, ['compile:sharepage:css'])
    .on('change', changeHandler);
  gulp.watch(globs.shareAmpSassGlob, ['compile:share-amp'])
    .on('change', changeHandler);
  gulp.watch(globs.fbuploadSassGlob, ['compile:fbupload'])
    .on('change', changeHandler);

  function changeHandler(event) {
    gutil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  }
});

gulp.task('watchify', [
  'watchify:app:js',
  'watchify:sharepage-post:js',
  'watchify:sharepage-pre:js'
]);

gulp.task('watchify:app:js', function() {
  var bundler = getBundler(globs.appScriptEntryGlob);
  bundleJS(bundler, 'dist.js');
  bundler.on('update', function() {
    gutil.log('updating app');
    bundleJS(bundler, 'dist.js');
  });
});

gulp.task('watchify:sharepage-post:js', function() {
  var bundler = getBundler(globs.shareScriptEntryGlob[0]);
  bundleJS(bundler, 'postload.js');
  bundler.on('update', function() {
    gutil.log('updating postload');
    bundleJS(bundler, 'postload.js');
  });
});

gulp.task('watchify:sharepage-pre:js', function() {
  var bundler = getBundler(globs.shareScriptEntryGlob[1]);
  bundleJS(bundler, 'preload.js');
  bundler.on('update', function() {
    gutil.log('updating preload');
    bundleJS(bundler, 'preload.js');
  });
});

function getBundler(src) {
  var opts = assign({}, watchify.args, {
    debug: !isProduction,
    entries: src,
    fullPaths: true
  });
  return watchify(browserify(opts))
    .transform('babelify', {
      presets: ['es2015'],
      sourceMaps: !isProduction
    });
}

function buildJS(src, annotate, filename) {
  if (!annotate) annotate = false;
  if (!filename) throw new Error('Please provide filename');
  return browserify({
      entries: src,
      debug: !isProduction
    })
    .transform('babelify', {
      presets: ['es2015'],
      sourceMaps: !isProduction
    })
    .bundle()
    .on('error', function(err) {
      gutil.log(gutil.colors.red("Browserify compile error:"), err);
      this.emit("end");
    })
    .pipe(source(filename))
    .pipe(buffer())
    .pipe(gulpif(!isProduction, sourcemaps.init({
      loadMaps: true
    })))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(options.build.js));
}

function buildSimpleJS(src, annotate) {
  if (!annotate) annotate = false;
  return gulp.src(src)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(gulpif(annotate, ngAnnotate()))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(options.build.js));
}

function buildConcatJS(src, filename, annotate) {
  if (!annotate) annotate = false;
  return gulp.src(src)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(concat(filename))
    .pipe(gulpif(annotate, ngAnnotate()))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(options.build.js));
}

function buildCSS(src, filename) {
  return gulp.src(src)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(concat(filename))
    .pipe(postcss([autoprefixer({
      browsers: ['last 3 versions']
    })]))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(options.build.css));
}

function buildSass(src) {
  return gulp.src(src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(options.build.sass));
}

function bundleJS(bundler, filename) {
  return bundler.bundle()
    .on('error', mapError)
    .pipe(source(filename))
    .pipe(buffer())
    .pipe(gulpif(!isProduction, sourcemaps.init({
      loadMaps: true
    })))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(gulp.dest(options.build.js));
}

function mapError(err) {
  if (err.fileName) {
    // regular error
    gutil.log(gutil.colors.red(err.name) +
      ': ' +
      gutil.colors.yellow(err.fileName.replace(__dirname + '/src/js/', '')) +
      ': ' +
      'Line ' +
      gutil.colors.magenta(err.lineNumber) +
      ' & ' +
      'Column ' +
      gutil.colors.magenta(err.columnNumber || err.column) +
      ': ' +
      gutil.colors.blue(err.description));
  } else {
    // browserify error..
    gutil.log(gutil.colors.red(err.name) +
      ': ' +
      gutil.colors.yellow(err.message));
  }

  this.end();
}

/**
 * @param {string} template - path to template twig
 * @param {string} dest - path to output twig
 * @param {obj} replace - {key: replacement string, value: path to file}
 **/
function twigInsert(template, dest, replace) {
  var final = fs.readFileSync(template, 'utf8');
  for (var key in replace) {
    if (replace.hasOwnProperty(key)) {
      var content = fs.readFileSync(replace[key], 'utf8');
      final = final.replace(key, content);
    }
  }

  fs.writeFile(dest, final, function(err) {
    if (err) throw err;
  });
}

function upload(dest, src) {
  return gulp.src(src)
    .pipe(sftp({
      host: options.sftpConfig.host,
      user: options.sftpConfig.user,
      remotePath: path.join(sftp_config.remotePath, dest)
    }));
}
