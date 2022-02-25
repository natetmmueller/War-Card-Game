
const suits = ['h', 's', 'd', 'c']
const values = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']

let cards = []
let playerHand = []
let cpuHand = []
let playerCardValue = 'back-blue'
let cpuCardValue = 'back-red'
let playerWar = []
let cpuWar = []

const drawEl = document.getElementById('draw-card-button')
const restartEl = document.getElementById('restart-card-button')
const videoButtonEl = document.getElementById('videoButton')
const videoEl = document.getElementById('video')
const soundEl = document.getElementById('sound')
const playerCardEl = document.getElementById('player-card')
const cpuCardEl = document.getElementById('cpu-card')
const playerCardAmount = document.getElementById('player-tally')
const cpuCardAmount = document.getElementById('cpu-tally')
const warCpuCards = document.querySelectorAll('#warCpu-card')
const warPlayerCards = document.querySelectorAll('#warPlayer-card')

drawEl.addEventListener('click', handleClick)
restartEl.addEventListener('click', startUp)
videoButtonEl.addEventListener('click', closeInstructions)

startUp()

function startUp(){
    initializeValues()
    createCards()
    shuffleCards()
    dealCards()
    displayCard()
    displayCardAmount()
    hideWarCards()
    startUpResults()
}

function initializeValues(){
    cards = []
    playerHand = []
    cpuHand = []
    playerWar = []
    cpuWar = []
    playerCardValue = 'back-blue'
    cpuCardValue = 'back-red'
    drawEl.disabled = false
}

function createCards(){
    for(const suit of suits){
        for(const value of values){
            cards.push(suit + value)
        }
    }
}

function shuffleCards(){
    cards = cards.sort(()=> 0.5 - Math.random())
}

function dealCards(){
    for(const card of cards){
        if(playerHand.length > cpuHand.length){
            cpuHand.push(card)
        } else {
            playerHand.push(card)
        }
    }
}

function startUpResults(){
    document.getElementById('result').innerText = "Who will win the battle?"
}

function handleClick(){
    drawCards()
    flipNoise()
    displayCard()
    compareCards()
    displayCardAmount()
    checkWin()
}

function checkWin(){
    if(playerHand.length == 52){
        publishResults("Congratulations lieutenant, you won the war!")
        drawEl.disabled = true
    } else if(cpuHand.length == 52){
        publishResults("We lost the war, we will get them next time!")
        drawEl.disabled = true
    } else{
        return
    }
}

function publishResults(results){
    document.getElementById('result').innerText = results
}

function drawCards(){
    playerCardValue = playerHand.shift()
    cpuCardValue = cpuHand.shift() 
}

function displayCard(){
    playerCardEl.className = `card xlarge ${playerCardValue}`
    cpuCardEl.className = `card xlarge ${cpuCardValue}`
}

function displayCardAmount(){
    playerCardAmount.innerText = `Player Card Amount: ${playerHand.length}`
    cpuCardAmount.innerText = `CPU Card Amount: ${cpuHand.length}`
}

function compareCards(){
    if(values.indexOf(playerCardValue.substring(1)) > values.indexOf(cpuCardValue.substring(1))){
        fillHand(playerHand)

    } else if (values.indexOf(playerCardValue.substring(1)) < values.indexOf(cpuCardValue.substring(1))){
        fillHand(cpuHand)
    }else{
        warEvent()
    }
}

function fillHand(hand){
    hand.push(playerCardValue)
    hand.push(cpuCardValue)
    playerWar.forEach((card) => hand.push(card))
    cpuWar.forEach((card) => hand.push(card))
    hideWarCards()
    playerWar = []
    cpuWar = []
}

function warEvent(){
    if(playerHand.length < 4){
        fillHand(cpuHand)
        cpuHand = cpuHand.concat(playerHand)
        playerHand = []
    } else if(cpuHand.length < 4){
        fillHand(playerHand)
        playerHand = playerHand.concat(cpuHand)
        cpuHand = []
    }else{
        playWar()
    }
}

function playWar(){
    playerWar.push(playerCardValue)
    cpuWar.push(cpuCardValue)
    for(let i=0; i < 3; i++){
        playerWar.push(playerHand.shift())
        cpuWar.push(cpuHand.shift())
    }
    displayWarCards()
}

function displayWarCards(){
    warCpuCards.forEach((element) => element.style.display = 'inline')
    warPlayerCards.forEach((element) => element.style.display = 'inline')
}

function hideWarCards(){
    warCpuCards.forEach((element) => element.style.display = 'none')
    warPlayerCards.forEach((element) => element.style.display = 'none')
}

function flipNoise(){
    soundEl.play()
}

function closeInstructions(){
    videoEl.remove()
    videoButtonEl.remove()
}
