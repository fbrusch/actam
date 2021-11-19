const c = new AudioContext();

const recording_length = 10;

var recordBuffer = c.createBuffer(1, recording_length*c.sampleRate,
    c.sampleRate);

var bindex = 0;

var pn, mss;
var recording = true;
async function main() {
    var stream = await navigator.mediaDevices.getUserMedia({audio:true})
    var mss = c.createMediaStreamSource(stream);
    //mss.connect(c.destination)
    pn = c.createScriptProcessor(1024, 1,1);
    pn.onaudioprocess = function(event) {
        if(recording == false) {return}
        const dataIn = event.inputBuffer.getChannelData(0);
        var recordBufferData = recordBuffer.getChannelData(0);
        for(var i=0;i < dataIn.length; i++) {
            recordBufferData[bindex++ % recordBuffer.length] = 
                dataIn[i]
        }
        

    }
    mss.connect(pn)
    pn.connect(c.destination)

    midi = await navigator.requestMIDIAccess();
    midi.inputs.forEach((i) => i.onmidimessage = handleMidi)


}

main()

const canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");

var midi;
function drawBuffer() {
    ctx.strokeStyle = "#000000";
    
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.moveTo(0,canvas.height/2);
    dataIn = recordBuffer.getChannelData(0)
    step = recordBuffer.length/canvas.width;
    for(var i=0;i<canvas.width;i++) {
        ctx.lineTo(i, 
            canvas.height/2+400*dataIn[Math.round(i*step)])};
    
    markPosition = Math.round((bindex % recordBuffer.length)/step)
    ctx.moveTo(markPosition, 0)
    ctx.lineTo(markPosition, canvas.height)
    ctx.stroke();

    // draw slice bounds

    ctx.beginPath()
    ctx.strokeStyle = "#00FF00";
    var start = startSlice/128*canvas.width;
    var end = endSlice/128*canvas.width;
    ctx.moveTo(start,0);
    ctx.lineTo(start, canvas.height)
    ctx.moveTo(end,0);
    ctx.lineTo(end, canvas.height)
    ctx.stroke()
    


    


    window.requestAnimationFrame(drawBuffer)


}

var startSlice;
var endSlice;

function handleMidi(e) {
    console.log(e)
    c.resume()
    if(e.data[0] == 176) {
        if(e.data[1] == 14) {
            startSlice = e.data[2];
        }
        if(e.data[1] == 15) {
            endSlice = e.data[2];
        }
    } else if(e.data[0] == 144) {
        playSlice(startSlice/128*recording_length, endSlice/128*recording_length,
            Math.pow(2,(e.data[1]-48)/12))
    }
}

drawBuffer()

function playSlice(start, end, playbackRate) {
    var playBuffer = c.createBuffer(1, 
        Math.round((end-start)*c.sampleRate), c.sampleRate);
    var playData = playBuffer.getChannelData(0);
    var dataIn = recordBuffer.getChannelData(0);
    startSample = Math.round(start*c.sampleRate)
    endSample = Math.round(end*c.sampleRate)
    for(var i=startSample; i < endSample; i++) {
        playData[i-startSample] = dataIn[i];
    }
    const bufferSource = c.createBufferSource();
    bufferSource.buffer = playBuffer;
    bufferSource.connect(c.destination)
    bufferSource.start()
    bufferSource.playbackRate.value = playbackRate
}



