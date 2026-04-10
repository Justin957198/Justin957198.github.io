// 1. Create an array of your image paths
const images = [
    'project_images/Dog_Under_Chair.JPG',
    'project_images/Dog_SideEye.JPG',
    'project_images/Chocolate_Lab.jpg'
];

// 2. Set the starting position
let currentIndex = 0;

// 3. Select the elements
const displayImage = document.getElementById('slideshow-image');
const num = document.getElementsByClassName('slide_num');
const nextBtn = document.getElementById('forward');
const prevBtn = document.getElementById('back');

// 4. Function to update the image
function updateImage() {
    displayImage.src = images[currentIndex];
}

// 5. Add Event Listeners
nextBtn.addEventListener('click', () => {
    currentIndex++; 
    if (currentIndex >= images.length) {
        currentIndex = 0; // Loop back to the start
    }
    updateImage();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1; // Loop to the end
    }
    updateImage();
});