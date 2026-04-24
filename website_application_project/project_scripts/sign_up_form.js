function previewPetEntry() {
    // 1. Capture the values from the input fields
    const name = document.querySelector('input[type="text"]').value;
    const petName = document.querySelector('input[placeholder="~kojo"]').value;
    const comments = document.querySelector('textarea').value;
    const fileInput = document.querySelector('input[type="file"]');
    const displayArea = document.querySelector('.right_box'); // Ensure your right-side div has a class or ID

    // 2. Handle the Image Preview
    let imageHtml = '';
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Update the display area once the image is loaded
            displayArea.innerHTML = `
                <div style="padding: 20px;">
                    <h3>Owner ${name} | Pet ${petName}</h3>
                    <hr>
                    <img src="${e.target.result}" style="max-width: 40%; height: auto; border-radius: 8px;">
                    <p style="margin-top: 15px; font-style: italic;">"${comments}"</p>
                </div>
            `;
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        // 3. Update text only if no image is selected
        displayArea.innerHTML = `
            <div style="padding: 20px;">
                <h3>${name}</h3>
                <p>"${comments}"</p>
            </div>
        `;
    }
}
function submitToPawPark(data) {
    // Get existing posts or start a new array
    let posts = JSON.parse(localStorage.getItem('dogPosts')) || [];
    posts.push(data);

    // Save back to localStorage
    localStorage.setItem('dogPosts', JSON.stringify(posts));

    // Redirect to the paw_park page
    window.location.href = 'paw_park.html';
}

const fileInput = document.querySelector('input[type="file"]');

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            // Save the result (the long base64 string)
            localStorage.setItem('petPicture', e.target.result);
            console.log("Image saved successfully!");
        } catch (error) {
            console.error("Error: Image is too large for localStorage!");
            alert("This photo is too big. Please try a smaller one under 3MB.");
        }
    };

    reader.readAsDataURL(file);
});

const nameInput = document.querySelector('input[name="first_last_name"]');
const petInput = document.querySelector('input[name="pet_name"]');
const commentInput = document.querySelector('textarea');
const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Stop the page from reloading
    
    const postData = {
        owner: nameInput.value,
        petName: petInput.value,
        message: commentInput.value,
        date: new Date().toLocaleDateString()
    };
    
    submitToPawPark(postData);
});