const c = new AudioContext();

const recording_length = 10;

var b = c.createBuffer(1, recording_length*c.sampleRate,
    c.sampleRate);

async function main() {
    var stream = await navigator.mediaDevices.getUserMedia({audio:true})
    //...

}

main()