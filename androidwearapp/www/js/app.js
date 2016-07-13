'use strict';

angular.module('wear', [
	'ionic',
  'ngMaterial',
  'ngResource',
  'ngStorage',
  'ngSails',

  // Modules
  'main'
])

.config(function ($stateProvider, 
                $urlRouterProvider, 
                $mdThemingProvider,
                $mdIconProvider,
                $sailsProvider) {
	$stateProvider
	  .state('home', {
	    url: '/',
	    templateUrl: '/js/app/views/main.html',
	    controller: 'MainController',
	    controllerAs: 'vm',
	  });

	$urlRouterProvider.otherwise('/');

	$mdThemingProvider
	  .theme('default')
	    .primaryPalette('indigo', {
	      'default': '600'
	    })
	    .accentPalette('teal', {
	      'default': '500'
	    })
	    .warnPalette('defaultPrimary');

	$mdThemingProvider.theme('dark', 'default')
	  .primaryPalette('defaultPrimary')
	  .dark();

	$mdThemingProvider.theme('grey', 'default')
	  .primaryPalette('grey');

	$mdThemingProvider.theme('custom', 'default')
	  .primaryPalette('defaultPrimary', {
	    'hue-1': '50'
	});

	$mdThemingProvider.definePalette('defaultPrimary', {
	  '50':  '#FFFFFF',
	  '100': 'rgb(255, 198, 197)',
	  '200': '#E75753',
	  '300': '#E75753',
	  '400': '#E75753',
	  '500': '#E75753',
	  '600': '#E75753',
	  '700': '#E75753',
	  '800': '#E75753',
	  '900': '#E75753',
	  'A100': '#E75753',
	  'A200': '#E75753',
	  'A400': '#E75753',
	  'A700': '#E75753'
	});

	$sailsProvider.url = 'localhost:1337';

})

.run(['$rootScope', '$ionicPlatform', '$state', '$mdToast', '$sails', function($rootScope, $ionicPlatform, $state, $mdToast, $sails){
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

	$sails.get('/notifications');

	$sails.on('notifications', function(message){
        $mdToast.show($mdToast.simple()
          .position('top right')
          .textContent(message.data.text));
	})
  });
}])

// Global Config
.constant('config', {
	appName: 'wearTest',
	appVersion: 0.0,
	apiUrl: ''
});