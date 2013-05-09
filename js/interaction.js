/**
 * Created with JetBrains WebStorm.
 * User: kenjisaito
 * Date: 3/28/13
 * Time: 6:01 PM
 * To change this template use File | Settings | File Templates.
 */
var mobileStatus;
var touchDownStatus, mouseDownStatus;
var touchPosition, touchVelocity;
var mousePosition, mouseVelocity;

var agent = navigator.userAgent;

if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1){
    mobileStatus = true;
}else{
    mobileStatus = false;
}

//    addEvent listener
if(mobileStatus){
    canvas.addEventListener("touchstart", touch_start);
    canvas.addEventListener("touchmove", touch_move);
    canvas.addEventListener("touchend", touch_end);
}else{
    canvas.addEventListener("mousedown", mouse_down);
    canvas.addEventListener("mousemove", mouse_move);
    canvas.addEventListener("mouseup", mouse_up);
}

function mouse_down(e){

    mouseDownStatus = true;
    mousePosition = {x: e.x, y: e.y};
    mouseVelocity = {x: 0, y: 0};
}

//    ------------------

function mouse_move(e){
    if(mouseDownStatus){

        var posX = e.x;
        var posY = e.y;

        mouseVelocity = {x: interactPosition.x - posX, y: interactPosition.y - posY};
        mousePosition = {x: posX, y: posY};
    }
}

//    ------------------

function mouse_up(e){
    mousePosition = {x: e.x, y: e.y};
    mouseVelocity = {x: 0, y: 0};
    mouseDownStatus = false;
}

function touch_start(e){

    var touch = e.touches[0];
    touchDownStatus = true;
    touchPosition = {x: touch.pageX, y: touch.pageY};
    touchVelocity = {x: 0, y: 0};

    e.preventDefault();
}

//    ------------------

function touch_move(e){
    if(touchDownStatus){
        var touch = e.touches[0];
        var posX = touch.pageX;
        var posY = touch.pageY;

        touchVelocity = {x: interactPosition.x - posX, y: interactPosition.y - posY};
        touchPosition = {x: posX, y: posY};

    }
    e.preventDefault();

}

//    ------------------

function touch_end(e){

    touchDownStatus = false;

    touchVelocity = {x: 0, y: 0};
    e.preventDefault();
}