import Vue from "vue";

import Main from "./vue/Main.vue";

Vue.config.devtools = true
new Vue({
    el: "#app",
    render: p => p(Main)
});
// var app = new Vue({
//     el: '#app',
//     data: {
//         message: "Привет"
//     }
// })
// Vue.component("todo",{
//     template: "<li>dwwdw</li>"
// })
// new Vue({el:"#red"});