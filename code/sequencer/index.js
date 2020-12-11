import Vue from "vue/dist/vue.js";

var app = new Vue({
    el:"#app",
    data: {
        message: "hi!",
        pads: [false, true, false, false],
        i: 0
    },
    methods: {
        hi: function(pad_number) {
            Vue.set(app.pads,
                pad_number,
                !app.pads[pad_number]);
        }
    }

})

var osc = new Tone.Oscillator().toDestination();

Tone.Transport.scheduleRepeat(function(t) {
        app.i = (app.i + 1) % 4;
        if(app.pads[app.i])
                osc.start(t).stop(t+0.1)
}, "8n");

Tone.Transport.start()
