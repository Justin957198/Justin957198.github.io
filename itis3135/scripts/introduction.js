const addBtn = document.getElementById('add-course-btn');
const remBtn = document.getElementById('rem-course-btn');
const subBtn = document.getElementById('submit');
const courseElements = document.querySelectorAll('.selection-hidden'); // Use a class for your hidden rows
let currentIndex = 0;

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
    if (currentIndex > 0) {
      currentIndex--;
        courseElements[currentIndex].style.display = "none";
    } else {
        alert("Needs atleat one couse!");
    }
});

const introForm = document.getElementById('introduction-input');
const displayArea = document.getElementById('display-side');

    introForm.addEventListener('submit', function(event) {
        // 1. Prevent the page from reloading
        event.preventDefault();

        // 2. Grab the data from the form
        const formData = new FormData(introForm);
        
        // 3. Create a clean string or HTML to display
        let output = "";
        
        formData.forEach((value, key) => {
        // Skip empty fields
            if (!value || value === "") return;

            const row = document.createElement('div');
            row.className = 'data-row';

            // Format the label (e.g., "first_name" -> "First Name")
            const labelText = key.replace(/_/g, ' ');
        
            // Check if the value is an image file
            if (value instanceof File && value.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    row.innerHTML = `
                        <span class="data-label">${labelText}:</span>
                        <img src="${e.target.result}" style="max-width: 200px; border-radius: 5px; margin-top: 10px;">
                    `;
                };
                reader.readAsDataURL(value);
            } else {
                // Standard text row
                row.innerHTML = `
                    <span class="data-label">${labelText}:</span>
                    <span class="data-value">${value}</span>
                `;
            }
        
            displayArea.appendChild(row);
        });
        
        output += "</ul>";

        // 4. Put it on the page
        displayArea.innerHTML = output;
        
        alert("Form submitted successfully!");
    });

const clearBtn = document.getElementById('clear-btn');
introForm.value = document.getElementById('introduction-input');

if (clearBtn) {
    clearBtn.addEventListener('click', function() {
        // This only clears the input fields within the form
        introForm.reset();
        
        // Optional: provide a small notification in the console or an alert
        console.log("Form inputs have been cleared.");
    });
}
