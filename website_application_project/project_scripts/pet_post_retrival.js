// Run this on the destination page to show the info
const savedData = JSON.parse(localStorage.getItem('recentPost'));
if (savedData) {
    console.log("Showing post for:", savedData.petName);
    // Use document.getElementById to push savedData into your HTML
}