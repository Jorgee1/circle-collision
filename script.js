var width = 640;
var height = 480;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var Color = {
    black: '#252525',
    red: '#C02525'
};

class Circle {
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
    }
}

function draw_circle(context, circle, color){
    context.beginPath();
    context.arc(circle.x, circle.y, circle.r, 2*Math.PI, false);
    context.strokeStyle = color;
    context.stroke();
}

function check_circle_collition(c1, c2){
    var d = Math.hypot(c1.x - c2.x, c1.y - c2.y);
    return d < c1.r + c2.r;
}


var c = new Circle(100, 100, 10)

context.fillStyle = Color.black;
context.fillRect(0, 0, width, height);

draw_circle(context, c, Color.red)



