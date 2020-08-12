import Vue from "vue";
import Vuelidate from 'vuelidate'

import Main from "./vue/Main.vue";

Vue.use(Vuelidate);
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