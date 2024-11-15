document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('enrollment-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const enrollmentData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            course: document.getElementById('course').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/enroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enrollmentData)
            });
            const result = await response.text();
            alert(result);
            window.location.href = "setup.html";  // Redirect to setup page for username & password
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
