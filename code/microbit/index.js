
import { uBitConnectDevice } from "./ubitwebusb.js";
import Vue from "vue/dist/vue.js";
import  * as Tone from "tone";



document.onclick = () => 
    {uBitConnectDevice(handler);}

var osc = new Tone.Oscillator().toDestination();


var synth = new Tone.Synth().toDestination();

var freq = 440;
//Tone.Transport.scheduleRepeat((time) => {
    //synth.triggerAttackRelease(freq, "8n", time);
//})
var app = new Vue({
    el:"#app",
    data: {
        x: 0,
        y: 0
    }
})

function note(base, interval) {
    return Math.pow(2,base/12)*440;
}

var a = [1,2,4];
var i = 0;
var s = new Tone.Synth().toDestination();

Tone.Transport.scheduleRepeat((time) => 
        s.triggerAttackRelease(note(a[i++%a.length]), "8n", time))
Tone.Transport.start()


function handler(reason, device, data) {
    console.log(reason, data);
    switch(reason) {
        case "console":
            //console.log(data.data);
            app.x = data.data;
            if(data.data > 0)
                osc.frequency.value = data.data;

            break;
        case "graph-data":
            app[data.graph] = data.data;
            if(data.graph == "y" && data.data > 0){  
                Tone.Transport.bpm.value = data.data;
                app.y = data.data
            }            
            if(data.graph == "x" && data.data > 0){  
                a[2] = Math.floor(data.data / 50);
            }            
            
    }
}

window.Tone = Tone
