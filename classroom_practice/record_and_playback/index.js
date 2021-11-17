const c = new AudioContext();

const recording_length = 10;

var recordBuffer = c.createBuffer(1, recording_length*c.sampleRate,
    c.sampleRate);

var bindex = 0;

var pn;

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