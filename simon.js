// Selected actions
(function () {
  
  const strictToggleBtn = document.querySelector('#strictToggle')
  const onOffToggleBtn = document.querySelector('div.onOff')
  const onOffIndicator = document.querySelector('#indicator')

  strictToggleBtn.onclick = () => {
    if (strictToggleBtn.classList.contains('yellowSelected')) {
      strictToggleBtn.classList.remove('yellowSelected')
    } else {
      strictToggleBtn.classList.add('yellowSelected')
    }
  };

  onOffToggleBtn.onclick = () => {
    if (onOffToggleBtn.classList.contains('on')) {
      onOffToggleBtn.classList.remove('on')
      onOffToggleBtn.classList.add('off')
      onOffIndicator.textContent = 'OFF'
      document.querySelector('#controlsPanel').style.background = "black"
      document.querySelector('#counter').style.color = "black";
      strictToggleBtn.style.background = "black";
      document.querySelector('#resetToggle').style.background = "black"
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

})();
