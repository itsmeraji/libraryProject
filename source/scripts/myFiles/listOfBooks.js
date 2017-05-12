/**
 * Created by masikann on 4/18/17.
 */

// to get list of books - uses template and retrieves from json
(function(){

    var main = function(dust, pluginPopup, loading){
        var bookList = {};

        bookList.render = function(){
            var deferred = $.Deferred();
            var options = {closeButtonNeeded: 'false', width: '50px', height: '50px', left: '50%', top:' 50%'};
            loading.showLoading(options);
            // render from json using dust
            $.get('../source/scripts/gulp/mockData/books.json', function(data){
                dust.render('booklist-template', data, function (err, out) {
                    $('[data-fragment = "listOfBooks"]').html(out);
                    deferred.resolve();
                    loading.stopLoading(options);
                })
            });

            return deferred.promise();
        }



        return bookList;
    };

    define(['dust', 'plugin-popup', 'showOrStopLoading', 'booklist-template',  'jquery'], main);
})();