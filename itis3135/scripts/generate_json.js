function formToJson(form) {
    const formData = new FormData(form);
    
    // Converts the entries into a standard JavaScript object
    const data = Object.fromEntries(formData.entries());

    // Handling multi-select or checkboxes with the same name
    // (Optional: Only needed if your form uses multiple values for one key)
    for (const key in data) {
        const values = formData.getAll(key);
        if (values.length > 1) {
            data[key] = values;
        }
    }
    

    return data;
}

// Usage Example:
const myForm = document.getElementById('intro-form');
const jsonBtn = document.getElementById('generate-json-btn');

jsonBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const displayArea = document.getElementById('displayArea');
    
    // 1. Get the object from your function
    const jsonOutput = formToJson(myForm);
    
    // 2. Convert that object into a "Pretty" string
    const formattedJson = JSON.stringify(jsonOutput, null, 2);
    
    // 3. Set the textContent to the STRING, not the object
    displayArea.textContent = formattedJson;
    
    console.log(formattedJson);
});