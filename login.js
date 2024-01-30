
function getAuthToken() {

    var userCredentials = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    console.log('Request Payload:', JSON.stringify(userCredentials));

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');


    fetch("http://localhost:8181/ibg-infotech/user/login", {
        method: 'POST',
        body: JSON.stringify(userCredentials),
        headers: headers,

    })

        .then(response => {
            if (response.ok) {
                alert("Login Successfully!");
                return response.json();
            } else if (response.status === 401) {
                alert("Invalid Credentials")
                throw new Error('Invalid credentials. Please check your username and password.');
            } else {
                throw new Error('Unexpected server error. Please try again later.');
            }
        })

        .then(data => {
            console.log('Data:', data);
            window.location.href = 'Dashboard.html';
            if (data && data.token) {
                localStorage.setItem('jwtToken', data.token);
                alert("Login successfully!");
            } else {
                throw new Error(`Login successfully!. Received: ${JSON.stringify(data)}`);
            }
        })

        .catch(error => {
            console.error('Error:', error);
            alert('Failed to login. Please try again.');
        });
}
