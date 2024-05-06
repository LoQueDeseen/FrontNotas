document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var formData = {
        UserName: document.getElementById('username').value,
        Password: document.getElementById('password').value
    };
    
    
    console.log(formData);
    fetch('http://localhost:5088/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
        

    })
    .then(response => {

        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        
        return response.json();
    })
    .then(data => {
        console.log( "la data es " + data.UserName);
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html'; 
    })
    .catch(error => {
        document.getElementById('message').innerText = error.message;
    });
});
