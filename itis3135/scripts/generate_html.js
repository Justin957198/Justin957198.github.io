function generateHTML(data) {
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
    return `
        <div style="border: 1px solid #ccc; padding: 20px; background: white; font-family: Arial, sans-serif; color: #000000;">
            <p>I understand that what i put here is publicly available on the web and i won’t put anything here i dont want the public to see</p>
            <p><strong></strong> ${data.ack_check ? 'Confirmed ✅' : 'Pending ⏳'} - ${data.nick_name || ''} - ${data.date || ''}</p>
            <h1 style="text-align: center; margin-bottom: 10px;">
                ${data.first_name || ''} ${data.middle_name || ''} ${data.last_name || ''} 
                <span style="color: #000000;">${data.divider || '|'}</span> 
                ${data.mascot_adjective || ''} ${data.mascot_animal || ''}
            </h1>
            <hr>
            <figure style="text-align:center; margin: 20px 0;">
                <img src="path to picture" alt="User Photo" style="max-width: 300px; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <figcaption><em>${data.picture_caption || ''}</em></figcaption>
            </figure>
            
            <p>${data.personal_statement || ''}</p>
        
            <ul>
                <li><strong>Personal Background:</strong>${data.personal_background || ''}</li>
                <li><strong>Professional Background:</strong> ${data.professional_background || ''}</li>
                <li><strong>Academic Background:</strong> ${data.acedemic_background || ''}</li>
                <li><strong>Backgound in Subject:</strong> ${data.subject_background || ''}</li>
            </ul>

            <p><strong>Primary Work Computer:</strong> ${data.primary_computer || ''}</p>
            <p><strong>Backup Work Computer & Location Plan:</strong> ${data.secondary_computer || ''}</p>

            <h3>Courses I'm taking and why:</h3>
            <ul>
                ${coursesHTML || "<li>No courses added yet.</li>"}
            </ul>

            <p><strong>Funny Messege:</strong> ${data.funny_messege || ''}

            <p><strong>I'd also like to share:</strong> ${data.thoughts || ''}</p>

        
            <h3>Quote:</h3>
            <p style="padding: 10px;">
                <em>"${data.quote || ''}"</em> <br>
                <span style="float: right;">- <strong>${data.quote_author || ''}</strong></span>
                <span style="clear: both; display: block;"></span>
            </p>

            <nav style="text-align: center; color: #1155cc;">
                <strong>Links:</strong> ${data.link_one || ''} | ${data.link_two || ''} | ${data.link_three || ''} | ${data.link_four || ''} | ${data.link_five || ''}
            </nav>
        </div>
    `.trim();
}

// Event Listener for the "Generate HTML" button
const htmlBtn = document.getElementById('generate-html-btn'); // Ensure your button has this ID
htmlBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const myForm = document.getElementById('intro-form');
    const data = formToJson(myForm); 
    
    const htmlSnippet = generateHTML(data);
    document.getElementById('displayArea').textContent = htmlSnippet;
});