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
    const inputs = form.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], textarea');
    inputs.forEach((input) => {
        input.value = ""; 
    });
}

function resetIntroductionForm() {
    // Select the form by its ID or index
    const introForm = document.getElementById('intro-form'); 
    
    if (introForm) {
        introForm.reset();
        console.log("Form has been reverted to default values.");
    } else {
        console.error("Form not found.");
    }
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
        const name = entry.querySelector('input[name^="course_"]').value || "";
        const num = entry.querySelector('input[name^="course_num"]').value || "";
        const why = entry.querySelector('input[name^="course_why"]').value || "";

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
    } else {
        objectURL = "images/Justin_plane.jpg";
    }

    displayArea.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 20px; background: white; font-family: Arial, sans-serif; color: #000000;">
            <p>I understand that what i put here is publicly available on the web and i won’t put anything here i dont want the public to see</p>
            <p><strong></strong> ${currentFormData.ack_check ? 'Confirmed ✅' : 'Pending ⏳'} - ${currentFormData.nick_name || ''} - ${currentFormData.date || ''}</p>
            <h1 style="text-align: center; margin-bottom: 10px;">
                ${currentFormData.first_name || ''} ${currentFormData.middle_name || ''} ${currentFormData.last_name || ''} 
                <span style="color: #000000;">${currentFormData.divider || '|'}</span> 
                ${currentFormData.mascot_adjective || ''} ${currentFormData.mascot_animal || ''}
            </h1>
            <hr>
            <figure style="text-align:center; margin: 20px 0;">
                <img src="${objectURL}" alt="User Photo" style="max-width: 300px; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <figcaption><em>${currentFormData.picture_caption || ''}</em></figcaption>
            </figure>
            
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

            <p><strong>Funny Messege:</strong> ${currentFormData.funny_messege || ''}

            <p><strong>I'd also like to share:</strong> ${currentFormData.thoughts || ''}</p>

        
            <h3>Quote:</h3>
            <p style="padding: 10px;">
                <em>"${currentFormData.quote || ''}"</em> <br>
                <span style="float: right;">- <strong>${currentFormData.quote_author || ''}</strong></span>
                <span style="clear: both; display: block;"></span>
            </p>

            <nav style="text-align: center; color: #1155cc;">
                <a href="${currentFormData.link_dest_url || ''}">${currentFormData.link_one || ''}</a> | <a href="${currentFormData.link_dest_url2 || ''}">${currentFormData.link_two || ''}</a> | <a href="${currentFormData.link_dest_url3 || ''}">${currentFormData.link_three || ''}</a> | <a href="${currentFormData.link_dest_url4 || ''}">${currentFormData.link_four || ''}</a> | <a href="${currentFormData.link_dest_url5 || ''}">${currentFormData.link_five || ''}</a>
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

document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector('button[type="submit"]');

    if (submitBtn) {
        submitBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const form = document.querySelector("form");
            if (!form) return alert("Form not found!");

            const formData = new FormData(form);
            if (!form.checkValidity()) {
                // This triggers the browser's built-in "Please fill out this field" bubbles
                form.reportValidity(); 
                return; // Stop the function here so no new tab opens
            }
            const currentFormData = Object.fromEntries(formData.entries());

            const fileInput = document.querySelector('input[name="picture_upload"]');
            let objectURL = "https://via.placeholder.com/300"; 

            const courseEntries = document.querySelectorAll('.selection');

            let coursesHTML = "";

        courseEntries.forEach((entry) => {
            // 2. SPOT: Only proceed if the container is NOT hidden
            if (entry.style.display !== "none" && !entry.classList.contains("hidden")) {
                
                // 3. Look for the inputs INSIDE this specific entry
                const name = entry.querySelector('input[name^="course_"]').value || "";
                const num = entry.querySelector('input[name^="course_num"]').value || "";
                const why = entry.querySelector('input[name^="course_why"]').value || "";

                if (name || num) {
                    coursesHTML += `<li><strong>${num}:</strong> ${name} <em>${why}</em></li>`;
                }
            }
        });

            if (fileInput && fileInput.files[0]) {
                objectURL = URL.createObjectURL(fileInput.files[0]);
            } else {
                objectURL = "images/Justin_plane.jpg";
            }

            // Create the HTML structure for the new tab
            const profileHTML = `
                <div style="margin-left: 10%; margin-right: 10%; border: 1px solid #ccc; padding-left: 20px; padding-right: 20px; padding-top: 10px; background: white; font-family: Arial, sans-serif; color: #000000;">
                <p>I understand that what i put here is publicly available on the web and i won’t put anything here i dont want the public to see</p>
                <p><strong></strong> ${currentFormData.ack_check ? 'Confirmed ✅' : 'Pending ⏳'} - ${currentFormData.nick_name || ''} - ${currentFormData.date || ''}</p>
                <h1 style="text-align: center; margin-bottom: 10px;">
                    ${currentFormData.first_name || ''} ${currentFormData.middle_name || ''} ${currentFormData.last_name || ''} 
                    <span style="color: #000000;">${currentFormData.divider || '|'}</span> 
                    ${currentFormData.mascot_adjective || ''} ${currentFormData.mascot_animal || ''}
                </h1>
                <hr>
                <figure style="text-align:center; margin: 20px 0;">
                    <img src="${objectURL}" alt="User Photo" style="max-width: 300px; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <figcaption><em>${currentFormData.picture_caption || ''}</em></figcaption>
                </figure>
                
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

                <p><strong>Funny Messege:</strong> ${currentFormData.funny_messege || ''}

                <p><strong>I'd also like to share:</strong> ${currentFormData.thoughts || ''}</p>

            
                <h3>Quote:</h3>
                <p style="style="text-alaign: center; padding: 10px;">
                    <em>"${currentFormData.quote || ''}"</em> <br>
                    <span style="text-alaign: center;">- <strong>${currentFormData.quote_author || ''}</strong></span>
                    <span style="clear: both; display: block;"></span>
                </p>

                <nav style="text-align: center; color: #1155cc;">
                    <a href="${currentFormData.link_dest_url || ''}">${currentFormData.link_one || ''}</a> | <a href="${currentFormData.link_dest_url2 || ''}">${currentFormData.link_two || ''}</a> | <a href="${currentFormData.link_dest_url3 || ''}">${currentFormData.link_three || ''}</a> | <a href="${currentFormData.link_dest_url4 || ''}">${currentFormData.link_four || ''}</a> | <a href="${currentFormData.link_dest_url5 || ''}">${currentFormData.link_five || ''}</a>
                </nav>
            </div>
            `;

            const newTab = window.open();
            newTab.document.write(profileHTML);
            newTab.document.close();
        });
    }
});

