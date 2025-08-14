document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the form from submitting
            
            // In a real website, you would send this data to a server.
            // For this prototype, we'll just show a success message.
            alert('Thank you for your message! We will get back to you shortly.');
            
            contactForm.reset(); // Clear the form fields
        });
    }
});