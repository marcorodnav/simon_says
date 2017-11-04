// Selected actions
(function () {
  const resetToggleBtn = document.querySelector('#resetToggle')
  const strictToggleBtn = document.querySelector('#strictToggle')

  resetToggleBtn.onclick = () => {
    if (resetToggleBtn.classList.contains('redSelected')) {
      resetToggleBtn.classList.remove('redSelected')
    } else {
      resetToggleBtn.classList.add('redSelected')
    }
  };
  strictToggleBtn.onclick = () => {
    if (strictToggleBtn.classList.contains('yellowSelected')) {
      strictToggleBtn.classList.remove('yellowSelected')
    } else {
      strictToggleBtn.classList.add('yellowSelected')
    }
  };
})();
