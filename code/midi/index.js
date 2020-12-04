


var synth = new Tone.Synth()

window.synth = synth

var delay = new Tone.Delay()
var gain = new Tone.Gain();
gain.gain.value = 0.4;
delay.delayTime.value = 0.3;
synth.connect(delay);
synth.toDestination();

delay.toDestination();
delay.connect(gain);
gain.connect(delay);

var midi = navigator.requestMIDIAccess().then(function(midi) {
    for(i of midi.inputs.values()) {
        i.onmidimessage = function(event) {
            if(event.data[0] == 144)
                synth.triggerAttackRelease(Math.pow(2,(event.data[1]-45)/12)*440,"8n"); 
            else if(event.data[0] == 191 && event.data[1] == 80) {
                if(event.data[2] == 1) {
                    delay.delayTime.value += 0.05;
                } else {
                    delay.delayTime.value -= 0.05;
                }
            } else if(event.data[0] == 191 && event.data[1] == 81) {
                if(event.data[2] == 1) {
                    gain.gain.value += 0.05;
                } else {
                    gain.gain.value -= 0.05;
                }
            }
            console.log(event.data)

        }
    }
})


