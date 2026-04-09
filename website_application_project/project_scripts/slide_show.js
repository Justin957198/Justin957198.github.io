const back = document.getElementById('go_back');
const forward = document.getElementById('go_forward');
const allpics = document.querySelectorAll('.slide, .slide_hidden');

const index = 0;

forward.addEventListener('click', function() {
    if (index < allpics.length) {
        allpics[index].style.display = "block";
        currentIndex++; // Move to the next element for the next click
    }
});