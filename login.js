// -----------------------------save the data----------------------------------------------

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
                return response.json();
            } else if (response.status === 401) {
                throw new Error('Invalid credentials. Please check your username and password.');
            } else {
                throw new Error('Unexpected server error. Please try again later.');
            }
        })
        .then(data => {
            console.log('Data:', data);
            if (data && data.jwtToken) {

                localStorage.setItem('jwtToken', data.jwtToken);
                console.log('JWT token stored successfully:', data.jwtToken);

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    // text: 'JWT token stored successfully',
                }).then((result) => {
                    window.location.href = 'Dashboard.html';
                });
            } else {
                throw new Error('Token not received or invalid.');
            }
        })
        .catch(error => {
            console.error('Error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message,
            });
        });
}
