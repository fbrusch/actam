var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var synth = new Tone.Synth().toDestination()

var c = new AudioContext();
var o = c.createOscillator();
o.connect(c.destination);
//o.start()

var object = {
    position: {x: 50, y:30},
    velocity: {x: 10, y:0}
}

function physics(time_elapsed) 
{

    object.position.x += (object.velocity.x)*time_elapsed;
    object.position.y += (object.velocity.y)*time_elapsed;

    // bounce on walls
    if(object.position.x + 100 > canvas.width) {
        synth.triggerAttackRelease("C4","8n")
        object.velocity.x *= -1;
    }
    if(object.position.x < 0) {
        synth.triggerAttackRelease("A3","8n")
        object.velocity.x *= -1;
    }
    if(object.position.y + 100 > canvas.height) {
        synth.triggerAttackRelease("D4","8n")
        object.velocity.y *= -1;
        object.position.y = canvas.height - 100;
    }
    if(object.position.y < 0) {
        object.velocity.y *= -1;
    }

    object.velocity.y += 0.5;
}


function render() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.rect(object.position.x,object.position.y,100,100);
    ctx.stroke();
    o.frequency.value = object.position.x;
    o.detune.value = object.position.y;
}

function update() {
    physics(0.1);
    render();
}

setInterval(update, 2);
