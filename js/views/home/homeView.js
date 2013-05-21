define([

    'jquery',
    'underscore',
    'backbone',
    "mout/function/bind",
    "views/home/eye",
    "views/home/text",


], function($, _, Backbone, bind, Eye, Text){
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var HomeView = Backbone.View.extend({
        el: $("#container"),
        canvas: null,
        initialize: function(){

            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this.canvas = document.createElement("canvas");
            this.$el.append(this.canvas);

            this.canvas.width = this.width;
            this.canvas.height = this.height;



            this.context = this.canvas.getContext("2d");



            /** text **/
            this.text = new Text(this.context);
            this.text.object.on(this.text.TRANSFORMFIRSTTOSECOND, bind(this.transformFirstToSecond, this));

            this.cases = ['first', 'second', 'third'];
            this.count = 0;

            /** eyeObject **/
            this.eyeObject = new Eye(this.context, this.text.pt1);
            this.eyeObject.initStatus();
            this.eyeObject.object.on(this.eyeObject.TRANSFORMSECONDTOTHIRD, bind(this.transformSecondToThird, this));

            /** duration **/
            this.firstDuration = 1;

            this.start();

            /** variables related to the mouse **/
            this.curMousePostion = {};
            this.prevMousePosition = {};
            this.mouseVelocity = {};
            console.log(this.prevMousePosition);

            /** Eventlistener **/
            $(window).bind("mousemove", bind(this.mouseMove, this));

        },

        start:function(){
            this.lastTime = new Date().getTime();
            this.sumTime = 0;

            this.loop();
        },


        loop: function(){

            this.update();
            this.render();

            requestAnimFrame(bind(this.loop, this));
        },

        update: function(){
            var curTime = new Date().getTime();
            var dt = (curTime - this.lastTime) / 1000;
            this.sumTime += dt;
            this.lastTime = curTime;

            switch(this.cases[this.count]){
                case "first":
                    this.text.updateFirst(dt);
                    break;
                case "second":
                    this.eyeObject.update(dt, this.cases[this.count]);

                    break;
                case "third":
                    this.eyeObject.update(dt, this.cases[this.count]);
                    this.text.updateThird(dt);
                    break;
            }

        },

        render: function(){
            this.context.clearRect(0, 0, this.width, this.height);

            switch(this.cases[this.count]){
                case "first":
                    this.text.renderFirst();
                    break;
                case "second":
                    this.text.renderSecond();
                    this.eyeObject.SecondRender();
                    break;
                case "third":
                    this.text.renderThird();
                    this.eyeObject.ThirdURender();
                    break;
            }
        },

        /** transform **/
        transformFirstToSecond: function(){
            this.count = 1;
        },

        transformSecondToThird: function(){
            this.count = 2;
            this.text.transformSecondToThird();
        },

        resize: function(){
            console.log("home View resize");

            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this.canvas.width = this.width;
            this.canvas.height = this.height;
        },

        mouseMove: function(event){
            console.log(this.prevMousePosition);
            if (isNaN(this.prevMousePosition.x) || isNaN(this.prevMousePosition.y)) {
                this.prevMousePosition.x = event.pageX;
                this.prevMousePosition.y = event.pageY;

                return;
            }

            this.curMousePostion.x = event.pageX;
            this.curMousePostion.y = event.pageY;

            this.mouseVelocity.x = this.curMousePostion.x - this.prevMousePosition.x;
            this.mouseVelocity.y = this.curMousePostion.y - this.prevMousePosition.y;

            switch(this.cases[this.count]){
                case "first":
                    break;
                case "second":
                    this.eyeObject.mousemove(this.curMousePostion);
                    break;
                case "third":
                    this.eyeObject.mousemove(this.curMousePostion);

                    break;
            }
        },

        hojoSen2: function(){
            var pt1 = {};
            var pt2 = {};
            var pt3 = {};
            var pt4 = {};

            pt1.x = this.width/2 - (this.reWidth + this.kiWidth/2) + this.reWidth;
            pt1.y = this.height * (1/2 +.12);

            pt2.x = this.width/2 - (this.reWidth + this.kiWidth/2) + this.reWidth;
            pt2.y = this.height * (1/2 +.12)- this.height * 0.20;


            this.context.beginPath();
            this.context.fillStyle = "#ff0000";
            this.context.arc( pt1.x, pt1.y, 3, 0, 2 * Math.PI, false);
            this.context.fill();
            this.context.closePath();

            this.context.beginPath();
            this.context.fillStyle = "#ff0000";
            this.context.arc( pt2.x, pt2.y, 3, 0, 2 * Math.PI, false);
            this.context.fill();
            this.context.closePath();

            this.context.beginPath();
            this.context.strokeStyle = '#000';
            this.context.moveTo(pt1.x, pt1.y);
            this.context.lineTo(pt2.x, pt2.y);
            this.context.stroke();
            this.context.closePath();

        },


    });

    return HomeView;
});