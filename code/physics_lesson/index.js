var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var synth = new Tone.Synth().toDestination()

var c = new AudioContext();
var o = c.createOscillator();
o.connect(c.destination);
//o.start()

var object = {
    position: {x: 50, y:30},
    velocity: {x: 10, y:0},
    gravity:0.5,
    hits: {
        top: function() {synth.triggerAttackRelease("C4", "8n")},
        bottom: function() {synth.triggerAttackRelease("A3", "8n")},
        left: function() {synth.triggerAttackRelease("F4", "8n")},
        right: function() {synth.triggerAttackRelease("G3", "8n")}
    }
}

var object2 = {
    position: {x: 50, y:30},
    velocity: {x: 50, y:30},
    gravity:0,
    hits: {
        top: function() {synth.triggerAttackRelease("C2", "8n")},
        bottom: function() {synth.triggerAttackRelease("A2", "8n")},
        left: function() {synth.triggerAttackRelease("G2", "8n")},
        right: function() {synth.triggerAttackRelease("F2", "8n")}
    }
}
function physics(time_elapsed, object)
{

    object.position.x += (object.velocity.x)*time_elapsed;
    object.position.y += (object.velocity.y)*time_elapsed;

    // bounce on walls
    if(object.position.x + 100 > canvas.width) {
        object.hits.right()
        object.velocity.x *= -1;
    }
    if(object.position.x < 0) {
        synth.triggerAttackRelease("A3","8n")
        object.hits.left()
        object.velocity.x *= -1;
    }
    if(object.position.y + 100 > canvas.height) {
        object.hits.bottom()
        object.velocity.y *= -1;
        object.position.y = canvas.height - 100;
    }
    if(object.position.y < 0) {
        object.hits.top()
        object.velocity.y *= -1;
    }

    object.velocity.y += object.gravity;
}


function render(object) {
    ctx.beginPath();
    ctx.rect(object.position.x,object.position.y,100,100);
    ctx.stroke();
    o.frequency.value = object.position.x;
    o.detune.value = object.position.y;
}

function update() {
    physics(0.1, object);
    physics(0.1, object2);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    render(object2);
    render(object);
}

setInterval(update, 2);
