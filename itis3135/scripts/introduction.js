const divs = Array.from(document.querySelectorAll('.selection hidden'));

let index = 0;

GamepadButton.addEventListener('click', () => {
  if (currentIndex < divs.length) {
    divs[currentIndex].style.display = 'block';
    index++;
  }});