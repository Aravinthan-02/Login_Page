const loginForm = document.getElementById('login-page');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name =document.getElementById('name').value
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    if (!/[A-Z]/.test(password)) {
        alert('Password should contain at least one capital letter');
        return;
    }
    if (!/[0-9]/.test(password)) {
        alert('Password should contain at least one number');
        return;
    }
    if (!/[!@#$?_]/.test(password)) {
        alert('Password should contain at least one special character');
        return;
    }

    // Send data to server
    const response = await fetch('/user-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name,email, password })
    });

    const data = await response.text();
    alert(data);
    if (response.ok) {
        window.location.href = 'https://www.forge-iv.co/';
    }
});
