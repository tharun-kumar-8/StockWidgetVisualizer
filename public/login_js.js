(function() {
  angular.module('myApp.controllers', []);
  angular.module('myApp.directives', []);
  angular.module('myApp.services', []);

  var myApp = angular.module('myApp', [
    'myApp.controllers',
    'myApp.directives',
    'myApp.services',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
    'ui'
  ]);

  var capslockService = function($rootScope, $document, $log) {
    var capsLockEnabled = null;
    $document[0].msCapsLockWarningOff = true; 
    var isCheckEnabled = $document[0].msCapsLockWarningOff === undefined || $document[0].msCapsLockWarningOff;

    var checkWarning = function() {
      return capsLockEnabled;
    }

    if (isCheckEnabled) {
      $document.keydown(function(e) {
        if (e.which == 20 && capsLockEnabled !== null) {
          capsLockEnabled = !capsLockEnabled;
          console.log("Keydown. CapsLock enabled: " + capsLockEnabled.toString());
          $rootScope.$broadcast('capslockToggle');
        } else if (e.which == 20) {
          $log.log("Keydown. Initial state not set.");
        }
      });

      $document.keypress(function(e) {
        var str = String.fromCharCode(e.which);
        if (!str || str.toLowerCase() === str.toUpperCase()) {
          $log.log("Keypress. Some control key pressed.");
          return;
        }
        capsLockEnabled = (str.toLowerCase() === str && e.shiftKey) || (str.toUpperCase() === str && !e.shiftKey);
        console.log("Keypress. CapsLock enabled: " + capsLockEnabled.toString());
        $rootScope.$broadcast('capslockToggle');
      });
    }

    return {
      checkWarning: checkWarning
    };
  };

  capslockService.$inject = ['$rootScope', '$document', '$log'];
  angular.module('myApp.services')
    .factory('capslockService', capslockService);

  var capsLock = function($document, $log, capslockService) {
    var directive = {
      restrict: 'A',
      link: function(scope, el, attrs) {
        var warningElement;
        if (attrs.capsLockWarning) {
          $document.ready(function() {
            warningElement = $(attrs.capsLockWarning);
            $log.log("Using custom element " + attrs.capsLockWarning);
          });
        } else {
          var warningId = 'warning-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
          warningElement = $('<div id=\"' + warningId + '\" class=\"warning\">Caps lock is on!!</div>');
          el.after(warningElement);
        }
        var hideOrShow = function() {
          var isEnabled = capslockService.checkWarning();
          if (isEnabled && el.is(":focus")) {
            warningElement.show();
            $log.log("Show warning");
          } else {
            warningElement.hide();
            $log.log("Hide warning");
          }
        }
        el.keyup(function(e) {
          $log.log("Keyup");
          hideOrShow();
        });

        el.on("focus", function(e) {
          $log.log("Focus");
          hideOrShow();
        });

        el.on("blur", function(e) {
          $log.log("Blur");
          hideOrShow();
        });
      }
    };
    return directive;
  };

  capsLock.$inject = ['$document', '$log', 'capslockService'];
  angular.module("myApp.directives")
    .directive('capsLock', capsLock);

  var myController = function($scope, $timeout, $animate, $log) {
    var vm = this;
  };

  myController.$inject = ['$scope', '$timeout', '$animate', '$log'];
  angular.module('myApp.controllers')
    .controller('myCtrl', myController);

  myApp.config(['$locationProvider',
    function($locationProvider) {
      $locationProvider.html5Mode(false);
    }
  ]);

  myApp.run(['$log', function($log) {
    $log.log("Start.");
  }]);
})()