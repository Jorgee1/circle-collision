var width = 640;
var height = 480;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var Color = {
    black: '#252525',
    red: '#D05050',
    blue: '#50D050'
};


class Circle {
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
    }
}

class Entity {
    constructor(collider, color){
        this.collider = collider;
        this.speed = {x:0, y:0};
        this.color = color;
    }

    update() {
        this.collider.x += this.speed.x;
        this.collider.y += this.speed.y;
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

var width = canvas.width;
var height = canvas.height;
var n_circle = 50
var step = 10

var c = new Entity(new Circle(100, 100, 100), Color.red)

var render_list = [c]
for (let index = 0; index < n_circle; index++) {
    x = Math.random() * (width - 100) + 50;
    y = Math.random() * (height - 100) + 50;

    var circle = new Circle(x, y, 50);
    var entity = new Entity(circle, Color.blue);
    entity.speed.x = 10;
    entity.speed.y = 10;
    render_list.push(entity);
}

function game_loop(){



    
    // Update
    render_list.forEach(circle => {
        circle.update()
    })

    // Render
    context.fillStyle = Color.black;
    context.fillRect(0, 0, width, height);

    render_list.forEach(circle => {
        draw_circle(context, circle.collider, circle.color)
    });

    window.requestAnimationFrame(game_loop);
}


window.requestAnimationFrame(game_loop);





