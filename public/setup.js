document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('setup-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const setupData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        };

        try {
            const response = await fetch('http://localhost:3000/api/setup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setupData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.text();
            alert(result);
            window.location.href = "success.html";  // Redirect to success page
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while setting up your account. Please try again.');
        }
    });
});
