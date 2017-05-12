/**
 * Created by masikann on 5/5/17.
 */

(function(){

    var main = function(){

        var carouselHolder;
        // carousel Frame - with the holder & buttons
        var carouselFrame = '<div data-plugin="plugin-carousel-holder">' +
                            '<div class="slideContainer">' +
                            '</div>' +
                            '<div class="buttons">' +
                            '<div class="moveClicks">' +
                            '<a class="previous">prev</a>' +
                            '<a class="playPause">Play or Pause</a>' +
                            '<a class="next">next</a>' +
                            '</div>' +
                            '<div class="bulletsHolder">' +
                            '</div></div></div>';
        // default plugin options
        var defaults = {
            bulletsNeeded: true,
            prevNextButtonNeeded: true,
            playPauseNeeded: true,
            timeToDisplayEach: 2000,
            autoRolling: true
        };

        var carousel = function(element, options){
            this.element = $(element);
            this.settings = $.extend({}, defaults, options);
            this.variables = {
                slideElements: {},
                slides: [],
                currentSlide: 0,
                playingStatus: 'playing',
                intervalVariable: ''
            };
            // initialize carousel
            this.init = function(){
                this.variables.slideElements = this.element.find('.slides').detach();
                this.element.append(carouselFrame);
                carouselHolder = this.element.find('.slideContainer');
                this.appendSlides();  // get carousel holder fragment & append provided slides
                this.getSlidesInArray();  //  get all slides in an array & show 1st slide only
                this.clickHandlers(); // associate click events

                // create bullets - start carousel
                if(this.settings.bulletsNeeded) {
                    this.createBullets();
                    this.associateBulletsLink();
                }
                if(this.settings.autoRolling) {
                    this.variables.intervalVariable = setInterval((function(self) {
                        return function() {
                            self.moveNext();
                        }
                    })(this), 5000);
                }
                else{
                    $('.playPause').hide();
                }
            };

            // to append slides to carousel holder - used in init
            this.appendSlides = function(){
                carouselHolder.append(this.variables.slideElements);
            };

            // get slides in an array to manipulate - used in init
            this.getSlidesInArray = function(){
                var carouselHere = this;
                this.variables.slideElements.each(function(idx, elem){
                    $(elem).hide();
                    carouselHere.variables.slides[idx] = $(elem);
                });
                this.variables.slides[this.variables.currentSlide].show();
            };

            // associate click handlers to buttons - used in init
            this.clickHandlers = function(){
                var carouselHere = this;
                $('.next').click(function(){
                    carouselHere.moveNext(carouselHere);
                    carouselHere.variables.playingStatus = 'stopped';
                    clearInterval(carouselHere.variables.intervalVariable);
                });
                $('.previous').click(function(){
                    carouselHere.movePrev();
                    carouselHere.variables.playingStatus = 'stopped';
                    clearInterval(carouselHere.variables.intervalVariable);
                });
                $('.playPause').click(function(){
                    if(carouselHere.variables.playingStatus === 'playing'){
                        carouselHere.variables.playingStatus = 'stopped';
                        clearInterval(carouselHere.variables.intervalVariable);
                    }
                    else{
                        carouselHere.variables.playingStatus = 'playing';
                        carouselHere.variables.intervalVariable = setInterval((function(self) {
                            return function() {
                                self.moveNext();
                            }
                        })(carouselHere), 5000);
                    }
                });
            };

            // out of sight moving
            this.pushOutOfSight = function(slideNumber, direction, animationTime){
                var oppositeDirection = (direction === 'left') ? 'right' : 'left';
                var animationProperties = {'z-index': '0'};
                animationProperties[direction] = '-100%';
                var cssProperties = {};
                cssProperties[direction] = '';
                cssProperties[oppositeDirection] = '';
                this.variables.slides[slideNumber].css(cssProperties).animate(animationProperties, animationTime, function(){
                    $(this).hide();
                    $('a[data-linkedtoslide = "' + slideNumber + '"]').removeClass('activeBullet');
                });
            };
            // Into sight moving - returns a promise - useful in multi-slide moving - since animations are async
            this.pushIntoSight = function(slideNumber, direction, animationTime){
                var deferred = $.Deferred();
                var oppositeDirection = (direction === 'left') ? 'right' : 'left';
                var animationProperties = {'z-index': '10'};
                animationProperties[direction] = '0%';
                var cssProperties = {'display': 'block'};
                cssProperties[direction] = '100%';
                cssProperties[oppositeDirection] = '';
                this.variables.slides[slideNumber].css(cssProperties).animate(animationProperties, animationTime, function(){
                    deferred.resolve();
                    $('a[data-linkedtoslide = "' + slideNumber + '"]').addClass('activeBullet');
                });
                return deferred.promise();
            };
            // next, prev, bullet functions
            this.moveNext = function(){
                var nextSlide;
                if(this.variables.currentSlide >= this.variables.slides.length - 1){
                    nextSlide = 0;
                }
                else{
                    nextSlide = this.variables.currentSlide + 1;
                }
                this.handlePrevNextAnimation(this.variables.currentSlide, nextSlide, 'left');
                this.variables.currentSlide = nextSlide;
            };

            this.movePrev = function(){
                var prevSlide;
                if(this.variables.currentSlide === 0){
                    prevSlide = (this.variables.slides.length - 1);
                }
                else{
                    prevSlide = this.variables.currentSlide - 1;
                }
                this.handlePrevNextAnimation(this.variables.currentSlide, prevSlide, 'right');
                this.variables.currentSlide = prevSlide;
            };


            this.moveToSlide = function(slideNumber){
                if(this.variables.currentSlide === slideNumber){
                    return;
                }
                this.handleBulletsAnimation(this.variables.currentSlide, slideNumber);
                this.variables.currentSlide = slideNumber;
            };

            // bullet creation and link assignment
            this.createBullets = function(){
                var $bulletHolder=this.element.find('.bulletsHolder');
                this.variables.slides.forEach(function(elem, idx){
                    var $bullet = '<li><a data-linkedToSlide=' + idx + '>' + (idx + 1) + '</a></li>';
                    $bulletHolder.append($bullet);
                })

            };
            this.associateBulletsLink = function(){
                var self = this;
                $('[data-linkedToSlide]').click(function(){
                    slideNumber = $(this).data('linkedtoslide');
                    self.moveToSlide(slideNumber);
                    self.variables.playingStatus = 'stopped';
                    clearInterval(self.variables.intervalVariable);
                });
            };
            // prev or next - animation
            this.handlePrevNextAnimation = function(fromSlide, toSlide, direction){
                this.pushOutOfSight(fromSlide, direction, 1000);
                this.pushIntoSight(toSlide, direction, 1000);
            };

            // Bullets - animation
            this.handleBulletsAnimation = function(fromSlide, toSlide){
                var self = this;
                var slidesArr =[], j= 0, direction, prevAnimation, slideInsideArray = 0, animationTime;
                direction = (fromSlide < toSlide) ? 'left': 'right';
                if(fromSlide < toSlide) {
                    for (var i = fromSlide; i <= toSlide; i++) {
                        slidesArr[j] = i;
                        j++;
                    };
                }
                else{
                    for (var i = fromSlide; i >= toSlide; i--) {
                        slidesArr[j] = i;
                        j++;
                    };
                };
                animationTime = 1000 / slidesArr.length;
                animate();

                function animate() {
                    self.pushOutOfSight(slidesArr[slideInsideArray], direction, animationTime);
                    prevAnimation = self.pushIntoSight(slidesArr[slideInsideArray + 1], direction, animationTime);
                    prevAnimation.done(function () {
                        slideInsideArray++;
                        if (slideInsideArray < slidesArr.length - 1) {
                            animate();
                        }
                    });
                }

            };

            this.init();
        };




        // Actual plugin definition
        $.fn.carousel = function(options){
            return this.each(function(){
                if(!$(this).data('plugin_carousel')){
                    $(this).data('plugin_carousel', new carousel(this, options));
                }
            })
        }
    };

    define(['jquery'], main);
})();