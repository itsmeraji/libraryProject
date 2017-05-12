/**
 * Created by masikann on 4/1/17.
 */


(function(){

    var main = function($, listOfBooks, updateContent, updateHistory, pluginPopup, loading, carousel){

        var addEvents = {};

        addEvents.doThis = function() {
            // Navigation links
            var navigation = [
                {linkText: 'Home', linkAction: 'intro'},
                {linkText: 'Address N Hours', linkAction: 'addressNHours'},
                {linkText: 'Events', linkAction: 'events'},
                {linkText: 'Book List', linkAction: 'listOfBooks'}
            ];
            var options = {closeButtonNeeded: 'false', width: '50px', height: '50px', left: '50%', top:' 50%'};

            navigation.forEach(function(eachNav){
                var linkAction = eachNav.linkAction;
                var $eachNavElement = $('a[data-navigation =' + linkAction + ']');
                $eachNavElement.attr('tabindex', '0');
                $eachNavElement.on('click keydown', function (event) {
                    if(event.type == 'keydown'){
                        evt = event.which;
                        if(evt !== 13 && evt !== 32){
                            return;
                        }
                    }

                    updateContent.updateMainContent(linkAction);
                    updateHistory.push(linkAction);
                })
            });

            // dust template
            var renderBooks = listOfBooks.render();

            // add popup plugin on button
            renderBooks.done(function(){
                $('.wantBookBtn').on('click', function(event){
                    event.stopPropagation();
                    $('[data-fragment = "wantThisBook"]').popup({closeButtonNeeded: 'true'});
                });
            });

            // add carousel for event images
            $('[data-carousel]').each(function(){
                $(this).carousel();
            });

            // collapse links (responsive)
            var collapseLinks = [
                {linkData: 'data-collapseLinks'}
            ]

            collapseLinks.forEach(function(eachCollapseLnk){
                var $eachCollapseLnk = $('a['+ eachCollapseLnk.linkData +']');
                $eachCollapseLnk.on('click', function(){
                    $(this).parents('nav').toggleClass('showAllMenus');
                })
            })
        }

        return addEvents;
    }

    define('addEvents', ['jquery', 'listOfBooks', 'updateMainContent', 'updateHistory', 'plugin-popup', 'showOrStopLoading', 'plugin-carousel'], main);

})()