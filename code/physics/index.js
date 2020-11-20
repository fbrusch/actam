var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

const synth = new Tone.Synth().toDestination();

var object = {
    position: {x: 20, y:20},
    velocity: {x: 10, y:0}
}

function render() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.rect(object.position.x,object.position.y,100,100);
    ctx.stroke();
}

function physics() {
    object.position.x += object.velocity.x;
    object.position.y += object.velocity.y;

    if(object.position.x+100 > canvas.width) {
        object.velocity.x *= -1;
        synth.triggerAttackRelease("C4", "8n");
    }
    if(object.position.x < 0) {
        object.velocity.x *= -1;
        synth.triggerAttackRelease("C4", "8n");
    }

    if(object.position.y+100 > canvas.height) {
        object.velocity.y *= -1;
        object.position.y = canvas.height - 100;
        synth.triggerAttackRelease("A4", "8n");
    }

    if(object.position.y < 0) {
        object.velocity.y *= 1;
    }

    object.velocity.y += 1;
}

function update() {
    physics();
    render();
}

setInterval(update, 20);
