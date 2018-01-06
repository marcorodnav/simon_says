 
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
    } else {
      strictToggleBtn.classList.add('yellowSelected')
    }
  };

  // On/Off
  onOffToggleBtn.onclick = () => {
    if (onOffToggleBtn.classList.contains('on')) {
      onOffToggleBtn.classList.remove('on')
      onOffToggleBtn.classList.add('off')
      onOffIndicator.textContent = 'OFF'
      document.querySelector('#controlsPanel').style.background = "black"
      document.querySelector('#counter').style.color = "black";
      strictToggleBtn.style.background = "black";
      document.querySelector('#resetToggle').style.background = "black"
      strictToggleBtn.classList.remove('yellowSelected')
    } else {
      onOffToggleBtn.classList.remove('off')
      onOffToggleBtn.classList.add('on')
      onOffIndicator.textContent = 'ON'
      document.querySelector('#controlsPanel').style.background = "white"
      document.querySelector('#counter').style.color = "red";
      strictToggleBtn.style.background = "radial-gradient(#ff0,#000)"
      document.querySelector('#resetToggle').style.background = "radial-gradient(#f00,#000)"      
    }
  }

  // Board sounds
  greenPanel.onclick = () => {
    sounds.playSound('0')
  }
  redPanel.onclick = () => {
    sounds.playSound('1')
  }
  yellowPanel.onclick = () => {
    sounds.playSound('2')
  }
  bluePanel.onclick = () => {
    sounds.playSound('3')
  }

  const activatePanel = (step) => {
    setTimeout(() => {
      step.panel.classList.add('light');
      setTimeout(() => {
        step.panel.classList.remove('light');  
      }, 350);
    }, 350);
  }
  
  const aiPlay = (simon) => {
    let soundIndex;
    setTimeout(() => {
      for(var i = 0; i < simon.length; i++) {
        (function(i) {
          setTimeout(() => {
            // play sound
            sounds[simon[i]].play()
            // activate(tiemout 150) / deactivate(timeout 150)
            activatePanel(panels[simon[i]]);
          }, i * 800);
        })(i);
      }
    }, 1000);
  }

  simBtn.onclick = () => {
    aiPlay(['1','0'])
  }
