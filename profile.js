// ---------------------------get all the data----------------------------------

var jwtToken = localStorage.getItem('jwtToken');

document.addEventListener('DOMContentLoaded', function () {
    getData(); // Fetch data when the DOM content is loaded
    savePassword();

});
function getData() {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch('http://localhost:8181/ibg-infotech/user/user-profile', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + jwtToken,
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            // Store the fetched data in localStorage
            localStorage.setItem('userData', JSON.stringify(data));
            populateDataTwice(data); // Call the function to populate data twice
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


function populateDataTwice(userData) {
    // Populate data for the first set of elements
    populateData(userData, 'firstNameValue', 'lastNameValue', 'email', 'numberValue');

    // Populate data for the second set of elements
    populateData(userData, 'firstNameValue1', 'lastNameValue1', 'email1', 'numberValue1');
}

function populateData(userData, firstNameId, lastNameId, emailId, numberId) {

    document.getElementById(firstNameId).innerText = userData.firstName;
    document.getElementById(lastNameId).innerText = userData.lastName;
    document.getElementById(emailId).innerText = userData.email;
    document.getElementById(numberId).innerText = userData.number;
}



// ---------------------------update-data----------------------------------




function updateUserProfile() {
    var formData = new FormData(document.getElementById("userProfileForm"));

    var jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    var jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
        alert('JWT token is missing. Please log in again.');
        return;
    }

    fetch(`http://localhost:8181/ibg-infotech/user/update-user-profile`, {
        method: 'PUT',
        body: JSON.stringify(jsonData),
        headers: {
            'Authorization': 'Bearer ' + jwtToken,
            'Content-Type': 'application/json'
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
                title: 'Updated!',
                text: 'Data has been updated successfully.',
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    // Clear input fields
                    document.getElementById('firstNameValue1').value = '';
                    document.getElementById('lastNameValue1').value = '';
                    document.getElementById('numberValue1').value = '';
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update data. Please try again.',
            });
        });
}



// -----------------------------------save the data------------------------------------------------
function savePassword() {
    var oldPass = document.getElementById('oldPass').value;
    var newPassword = document.getElementById('newPassword').value;

    var jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
        alert('JWT token is missing. Please log in again');
        return;
    }

    fetch(`http://localhost:8181/ibg-infotech/user/update-user-password?oldPass=${oldPass}&newPassword=${newPassword}`, {
        method: 'PUT',
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
                text: 'Password changed Successfully.',
            }).then((result) => {
                document.getElementById('oldPass').value = '';
                document.getElementById('newPassword').value = '';
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
