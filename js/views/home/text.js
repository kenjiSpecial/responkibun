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

            this.kiPosX = this.width / 2 - (this.reWidth + this.kiWidth / 2) + this.reWidth - 20;
            this.responPosX = this.width / 2 - (this.reWidth + this.kiWidth / 2);
            this.bunPosX = this.width / 2 - (this.reWidth + this.kiWidth / 2) + this.reWidth + this.kiWidth - 40;
            this.yoPosX = this.width / 2 - (this.reWidth + this.kiWidth / 2) + this.reWidth + this.kiWidth - 40;


            /** the variables related to render third **/
            this.yoooDuration = 1;
            this.yooCycle = 1;

            this.yoooPosStartX = this.yoPosX + 80;
            this.yoooPosMaxX = window.innerWidth * 0.95;
            // = window.innerWidth * 0.05;
            this.yoooPosX = this.yoPosX + 80;
            this.thirdCycleStatus = false;
            //this.maxYoooRate = -1 * (Math.pow(0.7 - 1, 4) - 1);


            this.sumTimeFirst = 0;
            this.sumTimeThird = 0;
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

        textView.prototype.updateThird = function (dt) {
            this.sumTimeThird += dt;

            if(this.thirdCycleStatus){
                var thirdCycleTime = this.sumTimeThird - this.stopSumTimeThird;
                this.yoooPosX =  ( Math.cos(thirdCycleTime / this.yooCycle * Math.PI * 2) - 1)* 10 + this.yoooPosMaxX;
            }else{
                var rate = this.sumTimeThird / this.yoooDuration;
                if(rate > 1){
                    this.stopSumTimeThird = this.sumTimeThird;
                    this.thirdCycleStatus = true;
                    this.yoooPosMaxX = this.width - 30;
                    this.yoooPosX = this.width - 30;
                }else{
                    this.yoooPosX = - (this.width - 30 - this.yoooPosStartX) * (Math.pow(rate - 1, 4) - 1) + this.yoooPosStartX;
                }


            }



        };


        /** renderFirst **/
        textView.prototype.renderFirst = function () {
            this.context.fillStyle = "#000";

            this.font = 'bold 240px sans-serif';
            this.context.font = this.font;
            this.context.fillText(this.mojis[1], this.kiPosX, this.height * .5 + 80);

            this.context.fillStyle = "rgba( 0, 0, 0, " + String(this.rate) + " )";

            this.font = 'bold 80px sans-serif';
            this.context.font = this.font;
            this.context.fillText(this.mojis[0], this.responPosX, this.height / 2 + 80);

            this.font = 'bold 120px sans-serif';
            this.context.font = this.font;
            this.context.fillText(this.mojis[2], this.bunPosX, this.height / 2 + 80);
        }

        textView.prototype.renderSecond = function () {
            var ki = "キ"
            this.font = 'bold 240px sans-serif';
            this.context.fillStyle = "#000";
            this.context.font = this.font;
            this.context.fillText(ki, this.kiPosX, this.height * .5 + 80);
        };

        textView.prototype.renderThird = function () {
            var ki = "キ";
            this.font = 'bold 240px sans-serif';
            this.context.fillStyle = "#000";
            this.context.font = this.font;
            this.context.fillText(ki, this.kiPosX, this.height * .5 + 80);

            var yo = "ョ";
            this.context.fillStyle = "#000";
            this.context.font = 'bold 80px sans-serif';
            this.context.fillText(yo, this.yoPosX, this.height / 2 + 80);

            this.context.fillStyle = "#000";
            this.context.beginPath();
            this.context.moveTo(this.yoooPosX + 10 + 20 * Math.cos(0), this.height / 2 + 60 + 20 * Math.sin(0));
            this.context.lineTo(this.yoooPosX + 10 + 20 * Math.cos(Math.PI * 2 / 3), this.height / 2 + 60 + 20 * Math.sin(Math.PI * 2 / 3));
            this.context.lineTo(this.yoooPosX + 10 + 20 * Math.cos(Math.PI * 4 / 3), this.height / 2 + 60 + 20 * Math.sin(Math.PI * 4 / 3));
            this.context.fill();
            this.context.closePath();


            this.context.strokeStyle = "#000";
            this.context.lineWidth = 10;
            this.context.beginPath();
            this.context.moveTo(this.yoooPosStartX, this.height / 2 + 60);
            this.context.lineTo(this.yoooPosX, this.height / 2 + 60);
            this.context.stroke();
            this.context.closePath();

        };

        /** transform function **/
        textView.prototype.transformSecondToThird = function () {
            $(window).bind('mousemove', bind(this.renderThirdMouseMove, this));
            this.prevMousePosition = {};
            this.curMousePosition = {};
            this.mouseVelocity = {};
        };

        /** mouseEvent **/
        textView.prototype.renderThirdMouseMove = function (event) {

        };


        return textView;

    });