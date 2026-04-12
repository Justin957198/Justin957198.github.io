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
                    <img src="${e.target.result}" style="max-width: 100%; height: auto; border-radius: 8px;">
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