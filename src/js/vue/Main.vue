<template>
    <div class="container">
        <h1>Simon says</h1>
        <div class="simon">
            <ul>
                <li class="tile red" value="red" v-on:click="clickButton" v-on:mouseup="removeAnimation" v-on:mousedown="addAnimation"></li>
                <li class="tile blue" value="blue" v-on:click="clickButton" v-on:mouseup="removeAnimation" v-on:mousedown="addAnimation"></li>
                <li class="tile yellow" value="yellow" v-on:click="clickButton" v-on:mouseup="removeAnimation" v-on:mousedown="addAnimation"></li>
                <li class="tile green" value="green" v-on:click="clickButton" v-on:mouseup="removeAnimation" v-on:mousedown="addAnimation"></li>
            </ul>
        </div>
        <div class="game-options">
            <h2>Round: {{round}}</h2>
            <button type="button" class="startButton" v-on:click="startGame">Start</button>
            <p v-if="lose">YOU LOSE</p>
            <p v-if="canClick">You can click</p>
            <div v-for="difficult in difficultOfGame" v-bind:key="difficult" class="blockDocument-type">
                <input class="radioButton" type="radio" :value="difficult.value" v-model="difficultTime">
                <label class="radioLabel">{{difficult.message}}</label>
            </div>
        </div>
    </div>
</template>

<script>

export default {
 name: "Main",
 data() {
    return{
        round: 0,
        difficultOfGame: [{message: "Easy ( 1.5 sec between iteration )", value: 1500},{message: "Medium ( 1 sec between iteration )", value: 1000},{message: "Hard ( 0.5 sec between iteration )", value: 500}],
        lose: false,
        gameActive: false,
        buttonsActive: false,
        sequence:[],
        difficultTime:1500,
        selectByHuman: [],
        elementPlay: document.querySelector(".red"),
        canClick: false
    }
 },
 validations: {
 },
 computed:{
    
 },
 methods: {
    startGame(){
        if(!this.gameActive){
        this.gameActive = true
        var i=0;
        this.round++
        this.lose = false
        this.sequence.push(this.randomNumber());
        this.selectByHuman = this.sequence.slice(0);
        this.elementPlay=document.querySelector("."+this.sequence[i]);
        this.elementPlay.animate([{
                    opacity: 0.6
                },{
                    opacity: 1
                }],500)
        // this.elementPlay.classList.add("active")
        i++
        var interval = setInterval(() => {
            // this.elementPlay.classList.remove("active")
            // window.setTimeout(()=>{
            //     element.classList.remove("active")
            // },1000)
            if(i >= this.sequence.length){
                this.buttonsActive=true
                this.canClick = true
                clearInterval(interval)
            } else{
                this.elementPlay=document.querySelector("."+this.sequence[i]);
                this.elementPlay.animate([{
                    opacity: 0.2
                },{
                    opacity: 1
                }],500)
                // this.elementPlay.classList.add("active")
                i++
            } 
        }, this.difficultTime)
        } else{
            this.endGame()
        }
    },
    randomNumber(){
        var color = Math.floor((Math.random()*4)+1);
        switch(color){
            case(1): return "red"
            case(2): return "blue"
            case(3): return "yellow"
            case(4): return "green"
        }
    },
    clickButton(e){
        if(this.buttonsActive){
            var rightVariant = this.selectByHuman.shift()
            var selectHuman = e.target.getAttribute("value")
            if(this.selectByHuman.length === 0 && (rightVariant === selectHuman)){
                this.buttonsActive = false
                this.gameActive = false
                this.canClick = false
                this.startGame()
            } else if(!(rightVariant === selectHuman)){
                this.buttonsActive = false
                this.endGame()
            }
        }
    },
    endGame(){
        this.round = 0
        this.buttonsActive = false
        this.sequence = []
        this.difficultTime = 1500
        this.selectByHuman = []
        this.elementPlay = document.querySelector(".red")
        this.lose = true
        this.gameActive = false
        this.canClick = false
    },
    removeAnimation(e){
        if(this.buttonsActive){
            e.target.classList.remove("active")
        }
    },
    addAnimation(e){
        if(this.buttonsActive){
            e.target.classList.add("active")
        }
    }
 }
};
</script>

<style>

</style>