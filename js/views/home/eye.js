define([
    'jquery',
    'underscore',
    'backbone',
    "mout/function/bind",
], function ($, _, Backbone, bind) {

    function Eye(context, pt1) {
        this.context = context;
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.pt1 = pt1;
        this.pt2 = {};
        this.pt2.x = pt1.x + 30;
        this.pt2.y = pt1.y;

        this.theta = 0;

        this.object = {};
        this.TRANSFORMSECONDTOTHIRD = 'transformSecondToThird';
        _.extend(this.object, Backbone.Events);

        $(window).bind("mousemove", bind(this.mousemove, this));

        /** mouse postion **/
        this.curMousePostion = {};
        this.prevMousePosition = {};
    }

    var maxRad = 6;
    var smallRad = 2;

    Eye.prototype.initStatus = function () {
        this.sumTime = 0;
        this.secondDuration = 0.6;

        this.blinkStartTime = 1.2;
        this.blinkDuration = this.blinkStartTime + 0.15;

    };


    Eye.prototype.update = function (dt, _case) {
        this.case = _case;
        switch (_case) {
            case "second":
                this.sumTime += dt;
                this.rate = this.sumTime / this.secondDuration;

                if (this.rate > 1) {
                    this.rate = 1;
                    this.object.trigger(this.TRANSFORMSECONDTOTHIRD);
                }
                break;
            case "third":
                this.sumTime += dt;
                var checkValue = this.sumTime % this.blinkDuration;
                if (checkValue > this.blinkStartTime) {
                    this.blinkStatus = true;
                } else {
                    this.blinkStatus = false;
                }
                break;


        }

    };

    Eye.prototype.SecondRender = function () {

        this.context.beginPath();
        this.context.strokeStyle = "#000";
        this.context.arc(this.pt1.x, this.pt1.y, 13 * this.rate, 0, 2 * Math.PI, false);
        this.context.stroke();
        this.context.closePath();

        this.context.beginPath();
        this.context.strokeStyle = "#000";
        this.context.arc(this.pt2.x, this.pt2.y, 13 * this.rate, 0, 2 * Math.PI, false);
        this.context.stroke();
        this.context.closePath();

        this.context.beginPath();
        this.context.fillStyle = "#000";
        this.context.arc(this.pt1.x + smallRad * Math.cos(this.theta), this.pt1.y + smallRad * Math.sin(this.theta), maxRad * this.rate, 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.closePath();

        this.context.beginPath();
        this.context.fillStyle = "#000";
        this.context.arc(this.pt2.x + smallRad * Math.cos(this.theta), this.pt2.y + smallRad * Math.sin(this.theta), maxRad * this.rate, 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.closePath();

    };

    Eye.prototype.ThirdURender = function () {

        this.context.strokeStyle = "#000";
        this.context.moveTo()


        if (this.blinkStatus) {
            this.context.beginPath();
            this.context.fillStyle = "#fff";
            this.context.strokeStyle = "#000";
            this.context.arc(this.pt1.x, this.pt1.y, 13, 0, 2 * Math.PI, false);
            this.context.stroke();
            this.context.fill();
            this.context.closePath();

            this.context.beginPath();
            this.context.strokeStyle = "#000";
            this.context.fillStyle = "#fff";
            this.context.arc(this.pt2.x, this.pt2.y, 13, 0, 2 * Math.PI, false);
            this.context.stroke();
            this.context.fill();
            this.context.closePath();

            this.context.beginPath();
            this.context.strokeStyle = "#000";
            this.context.moveTo(this.pt1.x - 13, this.pt1.y);
            this.context.lineTo(this.pt1.x + 13, this.pt1.y);
            this.context.stroke();
            this.context.closePath();

            this.context.beginPath();
            this.context.strokeStyle = "#000";
            this.context.moveTo(this.pt2.x - 13, this.pt2.y);
            this.context.lineTo(this.pt2.x + 13, this.pt2.y);
            this.context.stroke();
            this.context.closePath();

        } else {
            this.context.beginPath();
            this.context.strokeStyle = "#000";
            this.context.fillStyle = "#fff";
            this.context.arc(this.pt1.x, this.pt1.y, 13, 0, 2 * Math.PI, false);
            this.context.stroke();
            this.context.fill();
            this.context.closePath();

            this.context.beginPath();
            this.context.strokeStyle = "#000";
            this.context.fillStyle = "#fff";
            this.context.arc(this.pt2.x, this.pt2.y, 13, 0, 2 * Math.PI, false);
            this.context.stroke();
            this.context.fill();
            this.context.closePath();

            this.context.beginPath();
            this.context.fillStyle = "#000";
            this.context.arc(this.pt1.x + smallRad * Math.cos(this.theta), this.pt1.y + smallRad * Math.sin(this.theta), maxRad, 0, 2 * Math.PI, false);
            this.context.fill();
            this.context.closePath();

            this.context.beginPath();
            this.context.fillStyle = "#000";
            this.context.arc(this.pt2.x + smallRad * Math.cos(this.theta), this.pt2.y + smallRad * Math.sin(this.theta), maxRad, 0, 2 * Math.PI, false);
            this.context.fill();
            this.context.closePath();
        }


    };

    Eye.prototype.mousemove = function (event) {
        if (isNaN(this.prevMousePosition)) {
            this.prevMousePosition.x = event.pageX;
            this.prevMousePosition.y = event.pageY;

            return;
        }

        this.curMousePostion.x = event.pageX;
        this.curMousePostion.y = event.pageY;

        this.mouseVelocity.x = this.curMousePostion.x - this.prevMousePosition.x;
        this.mouseVelocity.y = this.curMousePostion.y - this.prevMousePosition.y;

        var dx = event.pageX - this.pt1.x;
        var dy = event.pageY - this.pt1.y;

        this.theta = Math.atan2(dy, dx);




    }

    return Eye
});