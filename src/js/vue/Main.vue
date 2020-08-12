<template>
    <div class="container" style="background-image:url('src/img/bg.jpg')">
        <div class="container-login">
            <form @submit.prevent="submit">
                <span class="register-title">Registration</span>
                <keep-alive>
                     <component v-bind:is="currentComponentChange" ref="childComponent"></component>
                </keep-alive>
                <div class="clickButtons">
                    <button type="button" v-on:click="prevStep" v-show="!(count === 0)" class="clickPrevButton">Prev</button>
                    <button type="submit" v-show="(count === 2)" class="clickRegisterButton">Registration</button>
                    <button type="button" v-on:click="nextStep"  v-show="!(count === 2)" class="clickNextButton">Next</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import FirstData from './FirstData.vue'
import SecondData from './SecondData.vue'
import ThirdData from './ThirdData.vue'

export default {
 name: "Main",
 components: {
    FirstData,
    SecondData,
    ThirdData
 },
 data() {
    return{
        count: 0,
        dataAll:[],
        firstDataSubmit:false,
        secondDataSubmit:false
    }
 },
 validations: {
 },
 computed:{
     currentComponentChange() {
         switch(this.count){
             case 0: return "FirstData";
             case 1: return "SecondData";
             case 2: return "ThirdData";
         }
     }
 },
 methods: {
     nextStep(){
         var data=this.$refs.childComponent.submitDateToParent();
         if(this.$refs.childComponent.$options._componentTag == "FirstData") this.firstDataSubmit=true
         else if(this.$refs.childComponent.$options._componentTag == "SecondData") this.secondDataSubmit=true
         if(data.canTakeInfo){
            this.count >= 2 ? this.count : this.count++;
            this.dataAll.push(data)
         } else{
            console.log("Invalid");
         }
     },
     prevStep(){
         this.count > 0 ? this.count-- : this.count;
         if(this.$refs.childComponent.$options._componentTag == "FirstData") this.firstDataSubmit=false
         else if(this.$refs.childComponent.$options._componentTag == "SecondData") this.secondDataSubmit=false
     },
     submit(){
         var data=this.$refs.childComponent.submitDateToParent();
         if(data.canTakeInfo&&this.firstDataSubmit&&this.secondDataSubmit){
            this.dataAll.push(data)
            console.log(this.dataAll)
         } else{
            console.log("Invalid");
         }
        //  e.preventDefault();
     }
 }
};
</script>

<style>

</style>