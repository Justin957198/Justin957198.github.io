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

function submitPetData(event) {
    // Prevent the form from refreshing the page immediately
    event.preventDefault();

    // 1. Capture the data from the input fields
    // Note: Replace 'name-id', 'pet-id', and 'comment-id' with your actual HTML element IDs
    const userData = {
        userName: document.getElementById('name-id').value,
        petName: document.getElementById('pet-id').value,
        comments: document.getElementById('comment-id').value

        // For files, you would usually store a URL or Base64 string, 
        // but for now, we will focus on text data.
    };

    // 2. Save the data to localStorage as a JSON string
    localStorage.setItem('recentPost', JSON.stringify(userData));

    // 3. Redirect to the Paw Park page (id=5 in your navigation)
    window.location.href = 'paw_park.html'; 
}