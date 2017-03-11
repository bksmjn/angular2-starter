/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    map: {
      'app': 'app', // 'dist',
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'angular2-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',//'npm:angular2-in-memory-web-api',
      'rxjs': 'npm:rxjs',
      'jquery': 'npm:jquery/dist/jquery.min.js',
      'what-input': 'npm:what-input/dist/what-input.min.js',
      'foundation-sites': 'npm:foundation-sites/dist/js/foundation.js',
      'ng2-translate': 'npm:ng2-translate/ng2-translate.js',
      'lodash': 'npm:lodash/lodash.min.js',
      'keycode': 'npm:keycode/index.js',
      'moment': 'npm:moment/moment.js',
      'esrever': 'npm:esrever/esrever.js',
      'angular2-jwt': 'npm:angular2-jwt/angular2-jwt.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ng2-translate': {
        defaultExtension: 'js'
      },
      'lodash': {
        defaultExtension: 'js'
      },
      'keycode': {
        defaultExtension: 'js'
      },
      'moment': {
        defaultExtension: 'js'
      },
      'esrever': {
        defaultExtension: 'js'
      }
    }
  })
})(this);

