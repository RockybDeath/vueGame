<template>
    <div class="container" style="background-image:url('src/img/bg.jpg')">
        <div class="container-login">
            <form @submit.prevent="submit">
                <span class="register-title">Registration</span>
                <keep-alive>
                     <component v-bind:is="currentComponentChange" ref="childComponent"></component>
                </keep-alive>
                <!-- <FirstData v-show="count === 0"></FirstData>
                <SecondData v-show="count === 1"></SecondData>
                <ThirdData v-show="count === 2"></ThirdData> -->
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
        count: 2
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
         if(data.canTakeInfo){
            this.count >= 2 ? this.count : this.count++;
         } else{
            console.log("Invalid");
         }
     },
     prevStep(){
         this.count > 0 ? this.count-- : this.count;
     },
     submit(){
         var data=this.$refs.childComponent.submitDateToParent();
         if(data.canTakeInfo){
            console.log(data);
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