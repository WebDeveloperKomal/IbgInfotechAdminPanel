// --------------------------------save the data-------------------------------------------

function saveData() {
    var name = document.getElementById('name').value;
    var lastName = document.getElementById('lastName').value;
    var number = document.getElementById('number').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    var formData = new FormData();
    formData.append('data', JSON.stringify({
        name: name,
        lastName: lastName,
        number: number,
        email: email,
        password: password
    }));

    var jwtToken = localStorage.getItem('jwtToken');

    if (!name || !lastName || !number || !email || !password) {
        alert('Please fill in required fields.');
        return;
    }

    if (!jwtToken) {
        alert('JWT token is missing. Please log in again');
        return;
    }

    fetch('http://localhost:8181/ibg-infotech/user/add-new-user', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + jwtToken,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Server response:', data);
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: 'Data has been saved successfully.',
            }).then((result) => {
                document.getElementById('name').value = '';
                document.getElementById('lastName').value = '';
                document.getElementById('number').value = '';
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';

                window.location.href = 'Dashboard.html';
            });
        })
        .catch(error => {
            console.error('Error:', error);
            // window.location.href = 'pages-register.html';
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to save data. Please try again.',
            });
        });
}