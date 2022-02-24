/*----- constants -----*/
const suits = ['h', 's', 'd', 'c']
const values = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']

/*----- app's state (variables) -----*/
let cards = []
let playerHand = []
let cpuHand = []
let playerCardValue = 'back-blue'
let cpuCardValue = 'back-red'
let playerWar = []
let cpuWar = []
/*----- cached element references -----*/
const drawEl = document.getElementById('draw-card-button')
const restartEl = document.getElementById('restart-card-button')
const videoButtonEl = document.getElementById('videoButton')
const videoEl = document.getElementById('video')

const soundEl = document.getElementById('sound')

const playerCardEl = document.getElementById('player-card')
const cpuCardEl = document.getElementById('cpu-card')

const playerCardAmount = document.getElementById('player-tally')
const cpuCardAmount = document.getElementById('cpu-tally')

const PlayerFlippedWarCard = document.getElementById('inPlayWarPlayer-card')
const cpuFlippedWarCard = document.getElementById('inPlayWarCpu-card')
const warCpuCards = document.querySelectorAll('#warCpu-card')
const warPlayerCards = document.querySelectorAll('#warPlayer-card')
/*----- event listeners -----*/
drawEl.addEventListener('click', handleClick)

restartEl.addEventListener('click', startUp)

videoButtonEl.addEventListener('click', closeInstructions)

/*----- functions -----*/
startUp()

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
function flipNoise(){
    soundEl.play()
}

function startUp(){
    initializeValues()
    createCards()
    shuffleCards()
    dealCards()
    displayCard()
    displayCardAmount()
    hideWarCards()
    console.log(playerCardValue)
    testWinViaWar()
    startUpResults()
    

    // warTestDealDeck()
    // testWinDeck()
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
console.log(playerHand)

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
    console.log("end of click")
    console.log(playerHand)
    console.log(cpuHand)
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
    console.log(results)
}

function drawCards(){
    playerCardValue = playerHand.shift()
    cpuCardValue = cpuHand.shift() 
}

function displayCard(){
    playerCardEl.className = `card xlarge ${playerCardValue}`
    cpuCardEl.className = `card xlarge ${cpuCardValue}`
}

function compareCards(){
    if(values.indexOf(playerCardValue.substring(1)) > values.indexOf(cpuCardValue.substring(1))){
        playerHand.push(playerCardValue)
        playerHand.push(cpuCardValue)
        playerHand = playerHand.concat(playerWar)
        playerHand = playerHand.concat(cpuWar)
        console.log(playerHand)
        hideWarCards()
        playerWar = []
        cpuWar = []

    } else if (values.indexOf(playerCardValue.substring(1)) < values.indexOf(cpuCardValue.substring(1))){
        cpuHand.push(playerCardValue)
        cpuHand.push(cpuCardValue)
        cpuHand = cpuHand.concat(playerWar)
        cpuHand = cpuHand.concat(cpuWar)
        hideWarCards()
        playerWar = []
        cpuWar = []
        console.log(cpuHand)
    }else{
        warEvent()
    }
}

function warEvent(){
    if(playerHand.length < 4){
        cpuHand.push(playerCardValue)
        cpuHand.push(cpuCardValue)
        cpuHand = cpuHand.concat(playerWar)
        cpuHand = cpuHand.concat(cpuWar)
        hideWarCards()
        playerWar = []
        cpuWar = []
        cpuHand = cpuHand.concat(playerHand)
        playerHand = []
    } else if(cpuHand.length < 4){
        playerHand.push(playerCardValue)
        playerHand.push(cpuCardValue)
        playerHand = playerHand.concat(playerWar)
        playerHand = playerHand.concat(cpuWar)
        hideWarCards()
        playerWar = []
        cpuWar = []
        playerHand = playerHand.concat(cpuHand)
        cpuHand = []
    }else {
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
    console.log(playerWar)
}

function displayWarCards(){
    warCpuCards.forEach((element) => element.style.display = 'inline')
    warPlayerCards.forEach((element) => element.style.display = 'inline')
}

function hideWarCards(){
    warCpuCards.forEach((element) => element.style.display = 'none')
    warPlayerCards.forEach((element) => element.style.display = 'none')
}

function displayCardAmount(){
    playerCardAmount.innerText = `Player Card Amount: ${playerHand.length}`
    cpuCardAmount.innerText = `CPU Card Amount: ${cpuHand.length}`
    console.log("working")
}

function closeInstructions(){
    videoEl.remove()
    videoButtonEl.remove()
}

function warTestDealDeck(){
    cpuHand = ['s07', 's09', 'd07', 'sJ', 'c10', 'hJ', 'c03', 'cA', 's02', 'd08', 'cK', 'dA', 'h03', 'h07', 'c04', 'd09',  'h05', 'h06', 'c05', 'cJ', 'd06', 'sQ', 's04', 'dJ', 'd03', 'dQ']

    playerHand = ['h02', 'd02', 'c07', 'cQ', 'h09', 'd10', 's03', 'd05', 'hA', 's08', 'hK', 'hQ', 'c02', 'sA', 's10', 'sK', 's06', 'dK', 'd04',  'h10', 'h04', 'c08', 'c09', 'c06', 'h08', 's05']
}

function testWinDeck(){
    playerHand = ['s07', 's09', 'c07', 'cQ', 'h09', 'd10', 's03', 'd05', 'hA', 's08', 'hK', 'hQ', 'c02', 'c09','d04', 'sK', 's06', 'dK', 's05', 's10',  'h10', 'h04', 'c08', 'sA' , 'c06', 'dQ']

    cpuHand = ['h02', 'd02', 'd07', 'sJ', 'c10', 'hJ', 'c03', 'cA', 's02', 'd08', 'cK', 'dA', 'h03', 'h07', 'c04', 'd09',  'h05', 'h06', 'c05', 'cJ', 'd06', 'sQ', 's04', 'dJ', 'd03', 'h08']
}

function testWinViaWar(){
    playerHand = ['s07', 's09', 'c07', 'cQ', 'h09', 'd10', 's03', 'd05', 'hA', 's08', 'hK', 'hQ', 'c02', 'c09','d04', 'sK', 's06', 'dK', 's05', 's10',  'h10', 'h04', 'sA' , 'c06', 'dQ', 'c08']

    cpuHand = ['h02', 'd02', 'd07', 'sJ', 'c10', 'hJ', 'c03', 'cA', 's02', 'd08', 'cK', 'dA', 'h03', 'h07', 'c04', 'd09',  'h05', 'h06', 'c05', 'cJ', 'd06', 'sQ', 's04', 'dJ', 'd03', 'h08']
}