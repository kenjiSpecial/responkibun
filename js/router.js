// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/home/homeView',
    'models/canvasControlModel'
], function($, _, Backbone, HomeView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){
        var pos;
        var homeView, experiment01View, experiment02View, experiment03View;
        var app_router = new AppRouter;

        app_router.on('route:defaultAction', function(){
            homeView = new HomeView();
        });


        $(window).resize(function(){

        });

        $(window).mousemove(function(e){
            pos = {x: e.pageX, y: e.pageY};

        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});