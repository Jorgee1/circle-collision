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

var p1 = new Entity(new Circle(width/2, height/2, 100), Color.red)

var render_list = [p1]
for (let index = 0; index < n_circle; index++) {
    x = Math.random() * (width - 100) + 50;
    y = Math.random() * (height - 100) + 50;

    speed_x = Math.random();
    speed_y = Math.sqrt(1-speed_x**2);

    if (Math.round(Math.random())){
        speed_x = -1*speed_x;
    }
    if (Math.round(Math.random())){
        speed_y = -1*speed_y;
    }


    var circle = new Circle(x, y, 50);
    var entity = new Entity(circle, Color.blue);
    entity.speed.x = 10 * speed_x;
    entity.speed.y = 10 * speed_y;
    render_list.push(entity);
}

function game_loop(){
    render_list.slice(1).forEach(c => {

        if (check_circle_collition(p1.collider, c.collider)){
            c.speed.x = -p1.collider.x + c.collider.x;
            c.speed.y = -p1.collider.y + c.collider.y;

            mag = Math.sqrt(c.speed.x**2 + c.speed.y**2);
            c.speed.x = 10*c.speed.x/mag;
            c.speed.y = 10*c.speed.y/mag;
        }


        if (c.collider.x - c.collider.r < 0){
            c.speed.x = Math.abs(c.speed.x);
        }
        
        if (c.collider.x + c.collider.r > width){
            c.speed.x = -Math.abs(c.speed.x);
        }

        if (c.collider.y - c.collider.r < 0){
            c.speed.y = Math.abs(c.speed.y);
        }
        
        if (c.collider.y + c.collider.r > height){
            c.speed.y = -Math.abs(c.speed.y);
        }

    });

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





