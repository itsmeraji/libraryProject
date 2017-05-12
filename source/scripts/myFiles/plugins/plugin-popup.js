/**
 * Created by masikann on 5/3/17.
 */

// popup plugin
(function(){
    var main = function($){
        //default plugin options
      var defaults = {
          backgroundFill: 'none',
          closeButtonNeeded: 'true',
          width: '400px',
          height: '80%',
          left: '20%',
          top: '10%'

    };

      var popup = function(element, options){
          this.element = $(element);
          this.settings = $.extend({}, defaults, options);
          this.init();

      };

      popup.prototype = {
          init: function(){
            // get popup containerDiv
            $popupContainer = $('[data-fragment = "plugin-popup-container"]');

            // append element to popup container
            $popupContainer.find('.pluginContent').append(this.element);
            this.element.css('display', 'block');

            // is close button needed?
            this.isCloseButtonNeeded();

            // add close function
            this.addCloseFunction();

            //style
            this.stylePerOptions();

             // show popup
             $popupContainer.fadeIn();

              // remove popup
              this.remove();

          },

          stylePerOptions: function(){
              $popupContainer.find('.pluginContent').css({
                 'width': this.settings.width,
                 'height': this.settings.height,
                  'left': this.settings.left,
                  'top': this.settings.top
              });
          },

          isCloseButtonNeeded: function(){
              if(this.settings.closeButtonNeeded === 'false'){
                  $('.pluginClose').hide();
              }
              else{
                  $('.pluginClose').show();
              }
          },

          remove:function(){
              if(this.settings.remove === 'true'){
                  this.closePopup();
              }
          },

          closePopup: function(){
              $popupContainer.fadeOut();
          },

          addCloseFunction: function(){
              var self = this;
              $('.pluginClose').on('click', function(e){
                  e.preventDefault();
                  self.closePopup();
              });
              $popupContainer.find('.pluginContent').click(function(e){
                  e.stopPropagation();
              });
              $(document).on('click', function(e){
                  self.closePopup();
              })
          }
      };

      // actual plugin definition
      $.fn.popup = function(options){
          return this.each(function(){
             return new popup(this, options);
          })

      };

      return popup;

    };

    define('plugin-popup', ['jquery'], main);
})();