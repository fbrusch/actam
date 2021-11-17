const c = new AudioContext();

const recording_length = 10;

var recordBuffer = c.createBuffer(1, recording_length*c.sampleRate,
    c.sampleRate);

var bindex = 0;

var pn, mss;

async function main() {
    var stream = await navigator.mediaDevices.getUserMedia({audio:true})
    var mss = c.createMediaStreamSource(stream);
    //mss.connect(c.destination)
    pn = c.createScriptProcessor(1024, 1,1);
    pn.onaudioprocess = function(event) {
        const dataIn = event.inputBuffer.getChannelData(0);
        var recordBufferData = recordBuffer.getChannelData(0);
        for(var i=0;i < dataIn.length; i++) {
            recordBufferData[bindex++ % recordBuffer.length] = 
                dataIn[i]
        }
        

    }
    mss.connect(pn)
    pn.connect(c.destination)


}

main()

const canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");

function drawBuffer() {
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.moveTo(0,canvas.height/2);
    dataIn = recordBuffer.getChannelData(0)
    step = recordBuffer.length/canvas.width;
    for(var i=0;i<canvas.width;i++) {
        ctx.lineTo(i, 
            canvas.height/2+400*dataIn[Math.round(i*step)])};
    ctx.stroke();
    window.requestAnimationFrame(drawBuffer)
}

drawBuffer()