debugger
const c = new AudioContext()
const a = c.createAnalyser()
const o = c.createOscillator()
//o.connect(a)
//o.start()

//o.connect(c.destination)
navigator.mediaDevices.getUserMedia({audio:true}).then(
    function(stream) {
        const msn = c.createMediaStreamSource(stream)
        msn.connect(a)
    }
)

const canvas = document.querySelector("#oscilloscope")
const ctx = canvas.getContext("2d")

function draw() {
    const b = c.createBuffer(1,1024,c.sampleRate)
    const d = b.getChannelData(0)
    a.getFloatTimeDomainData(d)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.beginPath()
    ctx.moveTo(canvas.width/2+50,canvas.height/2)
    const step = (Math.PI*2)/d.length
    for(var i=0;i<d.length;i++) {
        //ctx.lineTo(i*step, canvas.height/2*(d[i]+1))
        ctx.lineTo(Math.cos(i*step)*(50+d[i]*40)+canvas.width/2, 
                   Math.sin(i*step)*(50+d[i]*40)+canvas.height/2)
    }
    ctx.stroke()
}

setInterval(draw, 10)

document.body.onclick = function() {c.resume()}