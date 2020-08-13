<template>
    <div>
        <div class="pageName">
            <p class="pageName-title">Personal Info</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.surname.$error }">
            <label class="label-input">Surname</label>
            <input type="text" placeholder="Type your surname" v-model.trim="$v.surname.$model">
            <p class="errorMessage" v-if="!$v.surname.required">Field is required</p>
            <p class="errorMessage" v-if="!$v.surname.surnameValid">Not correct surname ( example: Kudymov )</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.name.$error }">
            <label class="label-input">Name</label>
            <input type="text" placeholder="Type your name" v-model.trim="$v.name.$model" @change="$v.name.$touch()">
            <p class="errorMessage" v-if="!$v.name.required">Field is required</p>
            <p class="errorMessage" v-if="!$v.name.nameValid">Not correct name ( example: Valera )</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.patronymic.$error }">
            <label class="label-input">Patronymic</label>
            <input type="text" placeholder="Type your patronymic" v-model.trim="$v.patronymic.$model">
            <p class="errorMessage" v-if="!$v.patronymic.patronymicValid">Not correct patronymic ( example: Alekseevich )</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.dateOfBirth.$error }">
            <label class="label-input">Date of Birth</label>
            <input type="date" placeholder="Type your date of birth" v-model.trim="$v.dateOfBirth.$model">
            <p class="errorMessage" v-if="!$v.dateOfBirth.required">Field is required</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.telephoneNumber.$error }">
            <label class="label-input">Telephone number</label>
            <input type="tel" placeholder="Type your number" v-model.trim="$v.telephoneNumber.$model">
            <p class="errorMessage" v-if="!$v.telephoneNumber.required">Field is required</p>
            <p class="errorMessage" v-if="!$v.telephoneNumber.phoneValid">Not correct number ( example: +7 952 217 37 31 )</p>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.sex.$error }">
            <label class="label-input">Sex</label>
            <input type="text" placeholder="Type your sex" v-model.trim="$v.sex.$model">
            <p class="errorMessage" v-if="!$v.sex.sexMale">Not correct sex ( example: male )</p>
        </div>
        <label class="label-input">Clients group</label>
        <div class="form-item" :class="{ 'errorInput': $v.groupsSelectedClients.$error }">
            <select class="form-item-selector" v-model="groupsSelectedClients" multiple>
                <!-- <option disabled selected value>select group</option> -->
                <option v-for="group in groupsClients" :key="group" :value="group">
                        {{group.groupName}}
                </option>
            </select>
            <p class="errorMessage" v-if="!$v.groupsSelectedClients.required">Please select group</p>
            <p>Selected groups</p>
            <ul>
                <li v-for="group in groupsSelectedClients" :key="group">{{group.groupName}}</li>
            </ul>
        </div>
        <label class="label-input">Attending doctor</label>
        <div class="form-item" :class="{ 'errorInput': $v.doctorName.$error }">
            <select v-model="doctorName" class="form-item-selector">
                <option v-for="doctor in doctors" :key="doctor" :value="doctor.doctor">
                        {{doctor.doctor}}
                </option>
            </select>
        </div>
        <div class="form-item" :class="{ 'errorInput': $v.checked.$error }">
            <label class="label-input">Don't send sms</label>
            <input class="noSendSms" type="checkbox" v-model="checked">
        </div>
    </div>
</template>

<script>
import { required, helpers } from 'vuelidate/lib/validators'

const sexMale = helpers.regex("beta",/male$/ig)
const phoneNumber = helpers.regex("alpha",/^\+(7)[ ][0-9]{3}[ -][0-9]{3}[ -][0-9]{2}[ -][0-9]{2}$/)
const letters = helpers.regex("gamma1",/^[A-Za-zА-Яа-я]*$/)

export default {
 name: "App",
 props:['onLogin'],
 data() {
    return{
        name: "",
        surname: "",
        patronymic: "",
        dateOfBirth: "",
        telephoneNumber: "",
        sex: "",
        checked: false,
        doctors: [{doctor:"Иванов"},{doctor:"Захаров"},{doctor:"Чернышева"}],
        doctorName: "",
        groupsClients:[{groupName:"VIP"},{groupName:"Problematic"},{groupName:"OMC"}],
        groupsSelectedClients:[],
        error: false
    }
 },
 validations: {
    name: {
        required,
        nameValid: letters
    },
    surname: {
        required,
        surnameValid: letters
    },
    patronymic:{
        patronymicValid: letters
    },
    dateOfBirth:{
        required
    },
    telephoneNumber:{
        required,
        phoneValid: phoneNumber
    },
    sex:{
        sexValid:sexMale
    },
    checked:{

    },
    doctorName:{

    },
    groupsSelectedClients:{
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
            var data={groupsSelectedClients:this.groupsSelectedClients,
            name:this.name,
            canTakeInfo:true,
            surname:this.surname,
            patronymic:this.patronymic,
            dateOfBirth:this.dateOfBirth,
            telephoneNumber:this.telephoneNumber,
            sex:this.sex,
            checked:this.checked,
            doctorName:this.doctorName};
            return data;
        }
     }
 }
};
</script>

<style>

</style>