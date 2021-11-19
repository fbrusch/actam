import Vue from "./node_modules/vue/dist/vue.min.js";
import * as Tone from 'tone';

var app = new Vue({
    el:"#app",
    data: {
        message: "",
        pads: [true, false, true, true, false, true,true, false, true],
        beat: 0
    }, methods: {
        togglePad: function(index) {
            console.log("hi")
            Vue.set(this.pads, index, !this.pads[index]);
        },
        nextBeat: function() {
            this.beat = (this.beat + 1) % this.pads.length
        }
    }
})

window.app = app

const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();


function playBeat() {
    app.nextBeat()
    if(app.pads[app.beat]) {
        player.start()
    }
    

}

Tone.loaded().then(() => {        
    setInterval(playBeat, 500)
    //player.start()

});
