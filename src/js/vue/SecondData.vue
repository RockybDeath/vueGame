<template>
    <div>
        <div class="pageName">
            <p class="pageName-title">Address</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.index.$error }">
            <label class="label-input">Index</label>
            <input type="text" placeholder="Type your index" v-model.trim="$v.index.$model">
            <p class="errorMessage" v-if="!$v.index.indexValid">Not correct index ( example: 614000 )</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.country.$error }">
            <label class="label-input">Country</label>
            <input type="text" placeholder="Type your country" v-model.trim="$v.country.$model">
            <p class="errorMessage" v-if="!$v.country.countryValid">Not correct counttry ( example: Russia )</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.region.$error }">
            <label class="label-input">Region</label>
            <input type="text" placeholder="Type your country" v-model.trim="$v.region.$model">
            <p class="errorMessage" v-if="!$v.region.regionValid">Not correct region ( example: Perm )</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.city.$error }">
            <label class="label-input">City</label>
            <input type="text" placeholder="Type your country" v-model.trim="$v.city.$model">
            <p class="errorMessage" v-if="!$v.city.required">Field is required</p>
            <p class="errorMessage" v-if="!$v.city.cityValid">Not correct city ( example: Moscow )</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.street.$error }">
            <label class="label-input">Street</label>
            <input type="text" placeholder="Type your country" v-model.trim="$v.street.$model">
            <p class="errorMessage" v-if="!$v.street.streetValid">Not correct street ( example: Labore)</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.house.$error }">
            <label class="label-input">House</label>
            <input type="text" placeholder="Type your country" v-model.trim="$v.house.$model">
            <p class="errorMessage" v-if="!$v.house.houseValid">Not correct number of house ( example: 24 )</p>
        </div> 
    </div>
</template>

<script>
import { required, helpers } from 'vuelidate/lib/validators'

const indexNumber = helpers.regex("beta",/^[0-9]{6}$/)
const houseNumber = helpers.regex("gamma",/^[0-9]*$/)
const letters = helpers.regex("gamma1",/^[A-Za-zА-Яа-я]*$/)

export default {
 name: "App",
 data() {
    return{
        index: "",
        country: "",
        region: "",
        city: "",
        street: "",
        house: ""
    }
 },
 validations: {
    index:{
        indexValid: indexNumber
    },
    country:{
        countryValid: letters
    },
    region:{
        regionValid: letters
    },
    city: {
        required,
        cityValid: letters
    },
    street:{
        streetValid: letters
    },
    house:{
        houseValid: houseNumber
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
            var data={city:this.city,
            canTakeInfo:true,
            index:this.index,
            country:this.country,
            region:this.region,
            street:this.street,
            house:this.house};
            return data;
        }
     }
 }
};
</script>

<style>

</style>