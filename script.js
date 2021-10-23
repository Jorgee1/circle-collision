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

var left  = 65;
var right = 68;
var up    = 87;
var down  = 83;

var keys = {};
keys[left] = false;
keys[right] = false;
keys[up] = false;
keys[down] = false;


document.onkeydown = (event) => {
    if (event.keyCode == left){
        keys[left] = true;
    }
    if (event.keyCode == right){
        keys[right] = true;
    }
    if (event.keyCode == up){
        keys[up] = true;
    }
    if (event.keyCode == down){
        keys[down] = true;
    }
}

document.onkeyup= (event) => {
    if (event.keyCode == left){
        keys[left] = false;
    }
    if (event.keyCode == right){
        keys[right] = false;
    }
    if (event.keyCode == up){
        keys[up] = false;
    }
    if (event.keyCode == down){
        keys[down] = false;
    }
}

var width = canvas.width;
var height = canvas.height;
var n_circle = 50
var step = 10
var p_speed = 5;
var p_size = 50;
var c_speed = 10;
var c_size = 30

var p1 = new Entity(new Circle(width/2, height/2, p_size), Color.red)

var render_list = [p1]
for (let index = 0; index < n_circle; index++) {
    x = Math.random() * (width - 2 * c_size) + c_size;
    y = Math.random() * (height - 2 * c_size) + c_size;

    speed_x = Math.random();
    speed_y = Math.sqrt(1 - speed_x**2);

    if (Math.round(Math.random())){
        speed_x = -1*speed_x;
    }
    if (Math.round(Math.random())){
        speed_y = -1*speed_y;
    }


    var circle = new Circle(x, y, c_size);
    var entity = new Entity(circle, Color.blue);
    entity.speed.x = c_speed * speed_x;
    entity.speed.y = c_speed * speed_y;
    render_list.push(entity);
}

function game_loop(){

    if (keys[up]){
        p1.speed.y = -p_speed;
    }
    else if (keys[down]){
        p1.speed.y = p_speed;
    }
    else{
        p1.speed.y = 0;
    }

    if (keys[left]){
        p1.speed.x = -p_speed;
    }
    else if (keys[right]){
        p1.speed.x = p_speed;
    }
    else{
        p1.speed.x = 0;
    }

    // Collition
    render_list.slice(1).forEach(c => {

        for (let i = 1; i <= step; i++) {
            var temp_p = new Circle(p1.collider.x, p1.collider.y, p1.collider.r);
            temp_p.x += i * p1.speed.x / step;
            temp_p.y += i * p1.speed.y / step;
    
            var temp_c = new Circle(c.collider.x, c.collider.y, c.collider.r);
            temp_c.x += i * c.speed.x / step;
            temp_c.y += i * c.speed.y / step;
    
            if (check_circle_collition(temp_p, temp_c)){
                c.speed.x = -p1.collider.x + c.collider.x;
                c.speed.y = -p1.collider.y + c.collider.y;
    
                mag = Math.sqrt(c.speed.x**2 + c.speed.y**2);
                c.speed.x = c_speed * c.speed.x / mag;
                c.speed.y = c_speed * c.speed.y / mag;
                break
            }
    
            if (temp_c.x - temp_c.r < 0){
                c.speed.x = Math.abs(c.speed.x);
            }
            if (temp_c.x + temp_c.r > width){
                c.speed.x = -Math.abs(c.speed.x);
            }
            if (temp_c.y - temp_c.r < 0){
                c.speed.y = Math.abs(c.speed.y);
            }
            if (temp_c.y + temp_c.r > height){
                c.speed.y = -Math.abs(c.speed.y);
            }
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





