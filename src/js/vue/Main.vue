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
            <button type="button" class="startButton" v-on:click="startOptions">Start</button>
            <button type="button" class="startButton" v-on:click="endGame">End</button>
            <p v-if="lose" class="errorMessage">YOU LOSE</p>
            <div>
                <h3>Wait for command:</h3><h3 v-if="buttonsActive">You can click</h3>
            </div>
            <p>Options</p>
            <div v-for="difficult in difficultOfGame" v-bind:key="difficult" class="blockDifficult">
                <input class="radioButton" type="radio" :value="difficult.value" v-model="difficultTime" :disabled="gameActive === true">
                <label class="radioLabel">{{difficult.message}}</label>
            </div>
            <div class="audioPlayer">

            </div>
            <audio id="red">
                <source src="src/sounds/red.mp3" type="audio/mp3">
                <source src="src/sounds/red.ogg" type="audio/ogg">
            </audio> 
            <audio id="blue">
                <source src="src/sounds/red.mp3" type="audio/mp3">
                <source src="src/sounds/red.ogg" type="audio/ogg">
            </audio>
            <audio id="yellow">
                <source src="src/sounds/red.mp3" type="audio/mp3">
                <source src="src/sounds/red.ogg" type="audio/ogg">
            </audio>
            <audio id="green">
                <source src="src/sounds/red.mp3" type="audio/mp3">
                <source src="src/sounds/red.ogg" type="audio/ogg">
            </audio>
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
        red:true
    }
 },
 validations: {
 },
 computed:{
    
 },
 methods: {
    startOptions(){
        this.gameActive = true
        this.lose = false
        this.startGame()
    },
    startGame(){
        if(this.gameActive){
        var i=0;
        this.round++
        this.sequence.push(this.randomColor());
        this.selectByHuman = this.sequence.slice(0);
        var interval = setInterval(() => {
            this.elementPlay=document.querySelector("."+this.sequence[i]);
                this.playMusic(this.sequence[i])
                this.elementPlay.animate([{
                    opacity: 0.4
                },{
                    opacity: 1
                }],500)
            i++
            if(i >= this.sequence.length){
                clearInterval(interval)
                this.buttonsActive=true
            }
        }, this.difficultTime)
        } else{
            this.endGame()
        }
    },
    randomColor(){
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
            this.playMusic(selectHuman)
            if(this.selectByHuman.length === 0 && (rightVariant === selectHuman)){
                this.buttonsActive = false
                setTimeout(() => {
                    this.startGame()
                },1000)
            } else if(!(rightVariant === selectHuman)){
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
    },
    playMusic(id){
        new Audio("src/sounds/"+id+".mp3").play();
        new Audio("src/sounds/"+id+".ogg").play();
    }
 }
};
</script>

<style>

</style>