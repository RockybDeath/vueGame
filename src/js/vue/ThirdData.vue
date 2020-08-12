<template>
    <div>
        <p class="title">{{document}}</p>
        <div class="blockDocument">
            <label class="label-input">Choose type of document</label>
            <div v-for="type in typesOfDocument" v-bind:key="type" class="blockDocument-type">
                <input class="radioButton" type="radio" :value="type.message" v-model="document">
                <label>{{type.message}}</label>
            </div>
            <p class="errorMessage" v-if="!$v.document.required">Choose document</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.serries.$error }">
            <label class="label-input">Serries</label>
            <input type="text" placeholder="Type your serries" v-model.trim="$v.serries.$model">
            <p class="errorMessage" v-if="!$v.serries.serriesValid">Type correct serries ( example: 1534 or I-AM )</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.number.$error }">
            <label class="label-input">Number</label>
            <input type="tel" placeholder="Type your number" v-model.trim="$v.number.$model">
            <p class="errorMessage" v-if="!$v.number.numberValid">Type correct number ( example: 153456 )</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.byIssued.$error }">
            <label class="label-input">Issued by</label>
            <input type="text" placeholder="Issued by" v-model.trim="$v.byIssued.$model">
            <p class="errorMessage" v-if="!$v.byIssued.byIssuedValid">Not correct issued</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.onIssuedDate.$error }">
            <label class="label-input">Issued on</label>
            <input type="date" v-model="$v.onIssuedDate.$model">
            <p class="errorMessage" v-if="!$v.onIssuedDate.required">Select date</p>
        </div>
    </div>
</template>

<script>
import { required, helpers, or } from 'vuelidate/lib/validators'

const serriesNumber = helpers.regex("beta1",/^[0-9]{4}$/)
const serriesNumberForBirth = helpers.regex("beta2",/^[IVXLLDM]+[ -][A-ZА-Я]{2}$/)
const numberGood = helpers.regex("gamma",/^[0-9]{6}$/)
const letters = helpers.regex("gamma1",/^[A-Za-zА-Яа-я]*$/)

export default {
 name: "App",
 data() {
    return{
        typesOfDocument: [{message: "Passport"},{message: "Birth certificate"},{message: "Driver's license"}],
        document: "Passport",
        serries: "",
        number: "",
        byIssued: "",
        onIssuedDate: "" 
    }
 },
 validations: {
    document:{
        required
    },
    serries:{
        serriesValid:or(serriesNumber,serriesNumberForBirth)
    },
    number: {
        numberValid:numberGood
    },
    byIssued:{
        byIssuedValid: letters
    },
    onIssuedDate:{
        required
    }
 },
 methods: {
     submitDateToParent(){
        this.$v.$touch()
        if(this.$v.$invalid) {
            var data={canTakeInfo:false};
            return data;
        }
        else{
            var data={document:this.document,
            canTakeInfo:true,
            serries:this.serries,
            number:this.number,
            byIssued:this.byIssued,
            onIssuedDate:this.onIssuedDate};
            return data;
        }
     }
 }
};
</script>

<style>

</style>