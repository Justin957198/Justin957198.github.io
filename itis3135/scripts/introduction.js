const addBtn = document.getElementById('add-course-btn');
const remBtn = document.getElementById('rem-course-btn');
const subBtn = document.getElementById('submit');
const courseElements = document.querySelectorAll('.selection'); // Use a class for your hidden rows
let currentIndex = 4;

// 2. Add the event listener
addBtn.addEventListener('click', function() {
    // Check if there are still hidden elements left to reveal
    if (currentIndex < courseElements.length) {
        courseElements[currentIndex].style.display = "block";
        currentIndex++; // Move to the next element for the next click
    } else {
        alert("No more course slots available!");
    }
});

remBtn.addEventListener('click', function() {
    if (currentIndex > 1) {
      currentIndex--;
        courseElements[currentIndex].style.display = "none";
    } else {
        alert("Needs atleat one couse!");
    }
});
const clearBtn = document.getElementById('clear-btn');

function clearForm() {
    // This targets your form by its ID
    const form = document.getElementById('intro-form'); 
    form.reset(); // Resets to defaults
    
    // This manually clears every text field just in case
    const inputs = form.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => input.value = '');
}

const updateData = () => {
    const form = document.getElementById('intro-form');
    const displayArea = document.getElementById('displayArea');

    const courseEntries = document.querySelectorAll('.selection');

    let coursesHTML = "";

courseEntries.forEach((entry) => {
    // 2. SPOT: Only proceed if the container is NOT hidden
    if (entry.style.display !== "none" && !entry.classList.contains("hidden")) {
        
        // 3. Look for the inputs INSIDE this specific entry
        const name = entry.querySelector('input[name^="course_"]')?.value || "";
        const num = entry.querySelector('input[name^="course_num"]')?.value || "";
        const why = entry.querySelector('input[name^="course_why"]')?.value || "";

        if (name || num) {
            coursesHTML += `<li><strong>${num}:</strong> ${name} <em>${why}</em></li>`;
        }
    }
});
    
    if (!form || !displayArea) return;

    const data = new FormData(form);
    // This one line replaces your entire 'for' loop!
    const currentFormData = Object.fromEntries(data.entries());

    // Image Handling
    const fileInput = document.querySelector('input[name="picture_upload"]');
    let objectURL = "https://via.placeholder.com/300"; 

    if (fileInput && fileInput.files[0]) {
        objectURL = URL.createObjectURL(fileInput.files[0]);
    }

    displayArea.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 20px; background: white; font-family: Arial, sans-serif; color: #000000;">
            <p>I understand that what i put here is publicly available on the web and i won’t put anything here i dont want the public to see</p>
            <p><strong>Agreement:</strong> ${currentFormData.ack_check ? 'Confirmed ✅' : 'Pending ⏳'} - ${currentFormData.nick_name || ''} - ${currentFormData.date || ''}</p>
            <h1 style="text-align: center; margin-bottom: 10px;">
                ${currentFormData.first_name || ''} ${currentFormData.middle_name || ''} ${currentFormData.last_name || ''} 
                <span style="color: #000000;">${currentFormData.divider || '|'}</span> 
                ${currentFormData.mascot_adjective || ''} ${currentFormData.mascot_animal || ''}
            </h1>
            <hr>
            <div style="text-align:center; margin: 20px 0;">
                <img src="${objectURL}" alt="User Photo" style="max-width: 300px; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <p><em>${currentFormData.picture_caption || ''}</em></p>
            </div>
            
            <p>${currentFormData.personal_statement || ''}</p>
        
            <ul>
                <li><strong>Personal Background:</strong>${currentFormData.personal_background || ''}</li>
                <li><strong>Professional Background:</strong> ${currentFormData.professional_background || ''}</li>
                <li><strong>Academic Background:</strong> ${currentFormData.acedemic_background || ''}</li>
                <li><strong>Backgound in Subject:</strong> ${currentFormData.subject_background || ''}</li>
            </ul>

            <p><strong>Primary Work Computer:</strong> ${currentFormData.primary_computer || ''}</p>
            <p><strong>Backup Work Computer & Location Plan:</strong> ${currentFormData.secondary_computer || ''}</p>

            <h3>Courses I'm taking and why:</h3>
            <ul>
                ${coursesHTML || "<li>No courses added yet.</li>"}
            </ul>

            <p><strong>I'd also like to share:</strong> ${currentFormData.thoughts || ''}</p>

        
            <h3>Quote:</h3>
            <p style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
                <em>"${currentFormData.quote || ''}"</em> <br>
                <span style="float: right;">- <strong>${currentFormData.quote_author || ''}</strong></span>
                <span style="clear: both; display: block;"></span>
            </p>

            <nav style="text-align: center; color: #1155cc;">
                <strong>Links:</strong> ${currentFormData.link_one || ''} | ${currentFormData.link_two || ''} | ${currentFormData.link_three || ''} | ${currentFormData.link_four || ''} | ${currentFormData.link_five || ''}
            </nav>
        </div>
    `;
};

// --- THE REAL-TIME MAGIC ---
// This waits for the page to load, then watches for any typing/clicking
document.addEventListener('DOMContentLoaded', () => {
    const introForm = document.getElementById('intro-form');
    if (introForm) {
        // Listen for typing (input) or clicking (change)
        introForm.addEventListener('input', updateData);
        // Initialize the preview once on load
        updateData();
    }
});
/*
const updateData = () => {
    const form = document.getElementById('introduction-input');
    const displayArea = document.getElementById('live-preview');
    const data = new FormData(form);
    const currentFormData = {};
    
    // Convert FormData to a plain object
    for (let [key, value] of data.entries()) {
        currentFormData[key] = value;
    }

    const fileInput = document.querySelector('input[name="picture_upload"]');
    // Use a placeholder if no image is uploaded yet
    let objectURL = "https://via.placeholder.com/300"; 

    if (fileInput && fileInput.files[0]) {
        objectURL = URL.createObjectURL(fileInput.files[0]);
    }

    if (displayArea) {
        displayArea.innerHTML = `
            <div style="border: 1px solid #ccc; padding: 20px; background: white; font-family: Arial, sans-serif;">
                <p>Agreement: ${currentFormData.ack_check ? 'Confirmed' : 'Pending'} - ${currentFormData.nick_name || ''} - ${currentFormData.date || ''}</p>
                <h1 style="text-align: center;">
                    ${currentFormData.first_name || ''} ${currentFormData.middle_name || ''} ${currentFormData.last_name || ''} 
                    ${currentFormData.divider || '|'} 
                    ${currentFormData.mascot_adjective || ''} ${currentFormData.mascot_animal || ''}
                </h1>
                <hr>
                <div style="text-align:center;">
                    <img src="${objectURL}" alt="User Photo" style="max-width: 300px; height: auto; border-radius: 8px;">
                    <p><em>${currentFormData.picture_caption || ''}</em></p>
                </div>
                
                <h3>Personal Statement:</h3>
                <p>${currentFormData.personal_statement || ''}</p>
            
                <h3>Background:</h3>
                <ul>
                    <li><strong>Personal:</strong> ${currentFormData.personal_background || ''}</li>
                    <li><strong>Academic:</strong> ${currentFormData.acedemic_background || ''}</li>
                    <li><strong>Subject:</strong> ${currentFormData.subject_background || ''}</li>
                </ul>

                <h3>Computers:</h3>
                <p><strong>Primary:</strong> ${currentFormData.primary_computer || ''}</p>
                <p><strong>Secondary:</strong> ${currentFormData.secondary_computer || ''}</p>
            
                <h3>Courses:</h3>
                <ul>
                    <li>${currentFormData.course_one_number}: ${currentFormData.course_one} (${currentFormData.course_one_why})</li>
                    <li>${currentFormData.course_two_number}: ${currentFormData.course_two} (${currentFormData.course_two_why})</li>
                </ul>

                <h3>Quote:</h3>
                <p><em>"${currentFormData.quote || ''}"</em> - <strong>${currentFormData.quote_author || ''}</strong></p>

                <nav style="text-align: center; margin-top: 20px;">
                    ${currentFormData.link_one} | ${currentFormData.link_two} | ${currentFormData.link_three} | ${currentFormData.link_four} | ${currentFormData.link_five}
                </nav>
            </div>
        `;
    }
};
*/
