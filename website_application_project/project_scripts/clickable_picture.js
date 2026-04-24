const triggers = document.querySelectorAll('.site_image');

triggers.forEach((img) => {
    img.addEventListener('click', () => {
        const targetId = img.getAttribute('data-target');
        const targetDiv = document.getElementById(targetId);

        // 1. Close all other accordions
        document.querySelectorAll('.accordion-content').forEach((el) => {
            if (el !== targetDiv) el.classList.remove('is-open');
        });

        // 2. Toggle the clicked one
        targetDiv.classList.toggle('is-open');
        
        // 3. Optional: Add a "selected" bounce to the image
        img.style.transform = "scale(1.1)";
        setTimeout(() => img.style.transform = "scale(1)", 200);
    });
});