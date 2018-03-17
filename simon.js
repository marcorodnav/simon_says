 // Controls
 const strictToggleBtn = document.querySelector('#strictToggle')
 const onOffToggleBtn = document.querySelector('div.onOff')
 const onOffIndicator = document.querySelector('#indicator')
 const resetToggleBtn = document.querySelector('#resetToggle')
 const simBtn = document.querySelector('#sim')

 // Color panels
 const greenPanel = document.querySelector('#greenPanel')
 const redPanel = document.querySelector('#redPanel')
 const yellowPanel = document.querySelector('#yellowPanel')
 const bluePanel = document.querySelector('#bluePanel')

 // Cuonter display
const counterDisplay = document.querySelector("#counter");

const updateCounterDisplay = (val) => {
  let newCounterVal = ""
  if (typeof val === "number") {
    if (val < 10) {
      newCounterVal = "0"+val
    } else {
      newCounterVal = ""+val
    }
  } else {
    newCounterVal = val;
  }
  counterDisplay.innerText = newCounterVal
}
 // Counter
 var counter =0
 var pattern = []
 var playerPattern = []
 var strictMode = false
 const MAX_LEVELS = 20
 var patternMissed = false

 const boardS = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
]

const playSound = (id) => {
  let sound = new Audio(boardS[id]);
  sound.play()
}
 const printPatterns = () => {
  console.log(`Pattern: ${pattern}`)
  console.log(`Player pattern: ${playerPattern}`)
 }
const initGame = () => {
  onOffToggleBtn.click();
  printPatterns()
}

const checkUserPattern  = () => {
  for (let i = 0; i < playerPattern.length; i++) {
    if (playerPattern[i] !== pattern[i]) {
      return false
    }
  }
  return true
}

const displayWinner = () => {
  alert('Winner');
}

const displayError = () => {
  updateCounterDisplay("ER")
}

const playerPlay = (playerMove) => {
  playerPattern.push(playerMove)
  if (!checkUserPattern()) {
    if(strictMode) {
      pattern = []
      counter = 1
    }
    patternMissed = true   
    displayError()
    playerPattern = []      
    aiPlay()
  } else if(playerPattern.length == pattern.length && playerPattern.length < MAX_LEVELS) {
    counter++;
    playerPattern = []
    patternMissed = false
    aiPlay()
  }
  updateCounterDisplay(""+counter)
  if(playerPattern.length === MAX_LEVELS) {
    displayWinner()
    // todo resetGame()
  }  
}

 const getRandomSimonStep = () => {
   return Math.floor(Math.random() * 4).toString()
 }

 const addRandomToPattern = () => {
   pattern.push(getRandomSimonStep())
 }

 const endPattern = () => {
   pattern = [];
 }

 const panels = {
   "0": {
     panel: greenPanel,
     sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
   },
   "1": {
     panel: redPanel,
     sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
   },
   "2": {
     panel: yellowPanel,
     sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
   },
   "3": {
     panel: bluePanel,
     sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
   }
 }

 // Board sounds
 const sounds = {
   "0": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
   "1": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
   "2": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
   "3": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
   playSound: (sound) => {
     sounds[sound].play()
   }
 }

 // Strict mode
 strictToggleBtn.onclick = () => {
   if (strictToggleBtn.classList.contains('yellowSelected')) {
     strictToggleBtn.classList.remove('yellowSelected')
     strictMode = false
   } else {
     strictToggleBtn.classList.add('yellowSelected')
     strictMode = true
   }
 };

 // On/Off
 onOffToggleBtn.onclick = () => {
   if (onOffToggleBtn.classList.contains('on')) {
     onOffToggleBtn.classList.remove('on')
     onOffToggleBtn.classList.add('off')
     onOffIndicator.textContent = 'OFF'
     document.querySelector('#controlsPanel').style.background = "black"
     document.querySelector('#counter').style.color = "black"
     strictToggleBtn.style.background = "black"
     document.querySelector('#resetToggle').style.background = "black"
     strictToggleBtn.classList.remove('yellowSelected')
     document.querySelector('#counter').textContent = counter
     endPattern()
    } else {
      updateCounterDisplay("0");
      onOffToggleBtn.classList.remove('off')
      onOffToggleBtn.classList.add('on')
      onOffIndicator.textContent = 'ON'
      document.querySelector('#controlsPanel').style.background = "white"
      document.querySelector('#counter').style.color = "red";
      strictToggleBtn.style.background = "radial-gradient(#ff0,#000)"
      document.querySelector('#resetToggle').style.background = "radial-gradient(#f00,#000)"
      setTimeout(() => {
        aiPlay()
      }, 200);
   }
  }

 // Board sounds - player turn
 greenPanel.onclick = () => {
  playSound(0);
   playerPlay('0')
 }
 redPanel.onclick = () => {
  playSound(1);
   playerPlay('1')
 }
 yellowPanel.onclick = () => {
  playSound(2);
   playerPlay('2')
 }
 bluePanel.onclick = () => {
  playSound(3);
   playerPlay('3')
 }

 const activatePanel = (step) => {
   setTimeout(() => {
     step.panel.classList.add('light');
     setTimeout(() => {
       step.panel.classList.remove('light');
     }, 350);
   }, 350);
 }

 const aiPlay = () => {
  if(!patternMissed) {
    addRandomToPattern()
  }
  if(patternMissed && strictMode) {
    addRandomToPattern()
  }
   setTimeout(() => {
     for (var i = 0; i < pattern.length; i++) {
       (function (i) {
         setTimeout(() => {
           // play sound
           playSound(pattern[i]);
           // activate(tiemout 150) / deactivate(timeout 150)
           activatePanel(panels[pattern[i]]);
         }, i * 800);
       })(i);
     }
   }, 1000);
 }
