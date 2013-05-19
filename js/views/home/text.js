define([
    'jquery',
    'underscore',
    'backbone',
    "mout/function/bind"
],
    function ($, _, Backbone, bind) {

        function textView(context) {

            this.context = context;
            console.log(context);

            this.context.fillStyle = "#000";
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this.fontsizes = ['bold 80px sans-serif', 'bold 240px sans-serif', 'bold 120px sans-serif']
            this.mojis = ["レスポン", "キ", "ぶん"];

            this.font = this.fontsizes[0];
            this.context.font = this.font;
            var reMetrics = this.context.measureText(this.mojis[0]);
            this.reWidth = reMetrics.width;


            this.font = this.fontsizes[1];
            this.context.font = this.font;
            var kiMetrics = this.context.measureText(this.mojis[1]);
            this.kiWidth = kiMetrics.width;

            this.font = this.fontsizes[2];
            this.context.font = this.font;

            this.context.fillStyle = "#000";


            this.pt1 = {x: this.width / 2 - (this.reWidth + this.kiWidth / 2) + this.reWidth * .8 + this.kiWidth, y: this.height * 0.5 - 110};

            this.sumTimeFirst = 0;
            this.rate = 1;

            this.object = {};

            this.TRANSFORMFIRSTTOSECOND = 'transformFirstToSecond';

            _.extend(this.object, Backbone.Events);

        }

        textView.prototype.setTimeTriger = function () {

            this.object.trigger("alert");
        };

        /** update **/
        textView.prototype.updateFirst = function (dt) {
            this.sumTimeFirst += dt;
            this.rate = 1 - this.sumTimeFirst;
            if (this.rate < 0) {
                this.rate = 0;
                this.object.trigger(this.TRANSFORMFIRSTTOSECOND);
            }
        };


        /** renderFirst **/
        textView.prototype.renderFirst = function () {
            /**
             if(1 - rate < 0){
            this.case = "second";
            this.eyeObject.initStatus();
        }
             */

            this.context.fillStyle = "#000";

            this.font = 'bold 240px sans-serif';
            this.context.font = this.font;
            this.context.fillText(this.mojis[1], this.width / 2 - (this.reWidth + this.kiWidth / 2) + this.reWidth - 20, this.height * .5 + 80);

            this.context.fillStyle = "rgba( 0, 0, 0, " + String(this.rate) + " )";

            this.font = 'bold 80px sans-serif';
            this.context.font = this.font;
            this.context.fillText(this.mojis[0], this.width / 2 - (this.reWidth + this.kiWidth / 2), this.height * 1 / 2 + 80);

            this.font = 'bold 120px sans-serif';
            this.context.font = this.font;
            this.context.fillText(this.mojis[2], this.width / 2 - (this.reWidth + this.kiWidth / 2) + this.reWidth + this.kiWidth - 40, this.height * 1 / 2 + 80);
        }

        textView.prototype.renderSecond = function () {
            var ki = "キ"
            this.font = 'bold 240px sans-serif';
            this.context.fillStyle = "#000";
            this.context.font = this.font;
            this.context.fillText(ki, this.width / 2 - (this.reWidth + this.kiWidth / 2) + this.reWidth - 20, this.height * .5 + 80);
        };

        textView.prototype.renderThird = function(){
            var ki = "キ";
            this.font = 'bold 240px sans-serif';
            this.context.fillStyle = "#000";
            this.context.font = this.font;
            this.context.fillText(ki, this.width / 2 - (this.reWidth + this.kiWidth / 2) + this.reWidth - 20, this.height * .5 + 80);


            //

            var yo = "ョ";
            this.context.fillStyle = "#000";
            this.context.font = 'bold 80px sans-serif';
            this.context.fillText(yo, this.width / 2 - (this.reWidth + this.kiWidth / 2) + this.reWidth + this.kiWidth - 40, this.height * 1 / 2 + 80)

        };

        /** transform function **/
        textView.prototype.transformSecondToThird = function(){
            $(window).bind('mousemove', bind(this.renderThirdMouseMove, this));
            this.prevMousePosition = {};
            this.curMousePosition = {};
            this.mouseVelocity = {};
        };

        /** mouseEvent **/
        textView.prototype.renderThirdMouseMove = function(event){
            /**
            if(isNaN(this.prevMousePosition)){
                this.prevMousePosition.x = event.pageX;
                this.prevMousePosition.y = event.pageY;

                return;
            }

            this.curMousePosition.x = event.pageX;
            this.curMousePosition.y = event.pageY;

            this.mouseVelocity.x = this.curMousePosition.x - this.prevMousePosition.x;
            this.mouseVelocity.y = this.curMousePosition.y - this.prevMousePosition.y;


            this.prevMousePosition.x = event.pageX;
            this.prevMousePosition.y = event.pageY;
            **/
        };


        return textView;

    });