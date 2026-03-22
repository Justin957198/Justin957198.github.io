const addBtn = document.getElementById('add-course-btn');
const remBtn = document.getElementById('rem-course-btn');
const subBtn = document.getElementById('submit');
const courseElements = document.querySelectorAll('.selection'); // Use a class for your hidden rows
let currentIndex = 3;

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

/*
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
        

        
        alert("Form submitted successfully!");
    });
*/
const clearBtn = document.getElementById('clear-btn');

if (clearBtn) {
    clearBtn.addEventListener('click', function() {
        // This only clears the input fields within the form
        introForm.reset();
        
        // Optional: provide a small notification in the console or an alert
        console.log("Form inputs have been cleared.");
    });
}

subBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevents the page from refreshing

    // 1. Capture basic info
    const firstName = document.getElementById('first-name').value;
    const middleName = document.getElementById('middle-name').value;
    const lastName = document.getElementById('last-name').value;
    const nickName = document.getElementById('nick-name').value;
    //const ackCheck = document.getElementById('ack-check');
    let ackText = "";
    const ackDate = document.getElementById('get-date').value;
    const divider = document.getElementById('divider').value;
    const mascotAdjective = document.getElementById('mascot-adjective').value;
    const animal = document.getElementById('mascot-animal').value;
    
    // --- IMAGE FIX START ---
    const imageInput = document.getElementById('picture-upload');
    const imageFile = imageInput.files[0];
    let imageUrl = ""; 

    if (imageFile) {
        // Create the temporary URL for the uploaded file
        imageUrl = URL.createObjectURL(imageFile);
    } else {
        imageUrl = "..\images\Justin_plane.jpg";
    }
    // --- IMAGE FIX END ---

    const personalStatement = document.getElementById('personal-statement').value;
    const personalBackground = document.getElementById('personal-background').value;
    const professionalBackground = document.getElementById('professional-background').value;
    const acedemicBackground = document.getElementById('acedemic-background').value;
    const backgoundInSubject = document.getElementById('subject-background').value;
    const primaryComputer = document.getElementById('primary-computer').value;
    const secondaryComputer = document.getElementById('secondary-computer').value;

    // Bottom info
    const favoriteQuote = document.getElementById('Quote').value;
    const quoteAuthor = document.getElementById('quote-author').value;
    const funnyMessege = document.getElementById('funny-messege').value;
    const somethingToShare = document.getElementById('thoughts').value;
    const link1 = document.getElementById('link').value;
    const link2 = document.getElementById('link2').value;
    const link3 = document.getElementById('link3').value;
    const link4 = document.getElementById('link4').value;
    const link5 = document.getElementById('link5').value;

    // 2. Capture dynamic courses
    const courseNames = document.querySelectorAll('.course-name');
    const courseNumbers = document.querySelectorAll('.course-number');
    const courseWhys = document.querySelectorAll('.course-reason');

    let coursesHTML = "<ul>";
    for (let i = 0; i < courseNames.length; i++) {
        const name = courseNames[i].value;
        const num = courseNumbers[i].value;
        const why = courseWhys[i].value;

        if (name || num) { 
            coursesHTML += `<li><strong>${num} ${name}</strong>: ${why}</li>`;
        }
    }

    const ackCheckbox = document.getElementById('ack-check');
    const ackStatementArea = document.getElementById('ack-statement'); // The text to display
    
    // 2. Check the .checked property directly in the IF statement
    if (ackCheckbox.checked) {
        // If checked, grab the text from your "I understand..." label/statement
        // You can also just hardcode the string here
        ackText = "I understand that what i put here is publicly available on the web and i won’t put anything here i dont want the public to see";
        
        // ... (The rest of your code to build the output) ...
        
        // 3. Add it to your innerHTML template
        // <h3>${ackText}</h3>
    } else {
        alert('Please check the agreement box before submitting!');
        return; // This stops the rest of the function from running
    }

    if (ackDate === null) {
        alert("Please check date");
        return;
    }
    coursesHTML += "</ul>";

    // 3. Format the output
    const outputArea = document.getElementById('form-output');
    outputArea.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 20px; background: white; font-family: Arial, sans-serif;">
            <p>${ackText} - ${nickName} - ${ackDate}</p>
            <h1 style="text-align: center;">${firstName} ${middleName} ${lastName} ${divider} ${mascotAdjective} ${animal}</h1>
            <hr>
            <div style="text-align:center;">
                <img src="${imageUrl}" alt="Justin's Photo" style="max-width: 300px; height: auto;">
            </div>
            <p>${personalStatement}</p>
            
            <h3>Personal Background:</h3>
            <p>${personalBackground}</p>

            <h3>Professional Background:</h3>
            <p>${professionalBackground}</p>

            <h3>Academic Background:</h3>
            <p>${acedemicBackground}</p>

            <h3>Background In Subject:</h3>
            <p>${backgoundInSubject}</p>

            <h3>Primary Work Computer:</h3>
            <p>${primaryComputer}</p>

            <h3>Backup Work Computer & Location Plan:</h3>
            <p>${secondaryComputer}</p>
            
            <h3>Courses I'm taking and why:</h3>
            ${coursesHTML}

            <h3>Funny Messege:</h3>
            ${funnyMessege}

            <h3>Something I'd Like To Share:</h3>
            ${somethingToShare}

            <h3>Quote - Author:</h3>
            <p><em>${favoriteQuote}</em></p><br><p><em>-${quoteAuthor}</em></p>

           
            ${link1} | ${link2} | ${link3} | ${link4} | ${link5}
        </div>
    `;
});
