
// 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYXZpbmFwYXdhcjU5OTFAZ21haWwuY29tIiwiaWF0IjoxNzA1OTg5MzcxLCJleHAiOjE3MDYwMDczNzF9.hR50yiJJbnGWIh3VcS8qsqwY0xcJag6WA3WY8ZNaWnW6sRmqGMzA6fAxMe58gEKCVxReIyhsWS_PnNIetfQaxQ',
// 'username': 'ravinapawar5991@gmail.com',
// 'password': 'ravina@1234',

// Credential{email:'',password:''};
// localStorage.setItem('token', response.jwtToken);

// -----------------------------save the data------------------------------------

function saveData() {
    var saveData = {
        name: document.getElementById('name').value,
        title: document.getElementById('title').value,
        information: document.getElementById('information').value,
    };


    var jwtToken = localStorage.getItem('jwtToken');

    console.log('Request Data:', JSON.stringify(saveData));

    if (!saveData.name || !saveData.title || !saveData.information) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!jwtToken) {

        alert('JWT token is missing. Please log in again.');
        return;
    }

    fetch('http://localhost:8181/ibg-infotech/auth/save-services-content', {
        method: 'POST',
        body: new URLSearchParams(saveData),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
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
                document.getElementById('title').value = '';
                document.getElementById('information').value = '';
                window.location.href = 'Services.html';

                getData();
            });
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = 'Services-form.html';

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to save data. Please try again.',
            });
        });
}


// ----------------------------------get all the data----------------------------------------------

var jwtToken = localStorage.getItem('jwtToken');

document.addEventListener('DOMContentLoaded', getData);

function getData() {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch('http://localhost:8181/ibg-infotech/auth/get-all-services-content', {
        method: 'GET',
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
            console.log(data);
            populateTable(data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


function populateTable(data) {
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = '';

    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.title}</td>
                <td>${item.information}</td>
                <td>
                    <a class="edit-btn" data-id="${item.id}"><i class="ti-pencil"></i>Edit</a>
                    <a class="delete-btn" data-id="${item.id}"><i class="ti-trash"></i> Delete</a>
                </td>
            `;
            tableBody.appendChild(row);

            const editBtn = row.querySelector('.edit-btn');
            editBtn.addEventListener('click', function () {
                const id = editBtn.getAttribute('data-id');
                console.log("Edit button clicked for ID: " + id);

                fetch(`http://localhost:8181/ibg-infotech/auth/get-services-content/${id}`, {
                    method: 'GET',
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

                        window.location.href = `update-services.html?id=${id}&name=${data.data.name}&title=${data.data.title}&information=${data.data.information}`;
                    })
                    .catch(error => {
                        console.error('Error fetching service data:', error);
                    });
            });


            const deleteBtn = row.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                const id = deleteBtn.getAttribute('data-id');
                deleteService(id);
            });
        });
    } else {
        console.error('Data received is not an array:', data);
    }
}



// --------------------------------------delete the data by id----------------------------------------

function deleteService(id) {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch(`http://localhost:8181/ibg-infotech/auth/delete-services-content/${id}`, {
        method: 'DELETE',
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
            console.log(data);

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Service has been deleted successfully.',
            }).then((result) => {

                getData();
            });
        })
        .catch(error => {
            console.error('Error deleting service:', error);

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete the service. Please try again later.',
            });
        });
}


// ---------------------------update the data by id--------------------------------------------------


function updateData() {

    const updatedName = document.getElementById('name').value;
    const updatedTitle = document.getElementById('title').value;
    const updatedInformation = document.getElementById('information').value;

    updateService(id, updatedName, updatedTitle, updatedInformation);
}


function updateService(id, name, title, information) {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch(`http://localhost:8181/ibg-infotech/auth/update-services-content/${id}?name=${name}&title=${title}&information=${information}`, {
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
            console.log(data);

            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Service has been updated successfully.',
            }).then((result) => {

                window.location.href = 'Services.html';
                getData();
            });
        })
        .catch(error => {
            console.error('Error updating service:', error);

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update the service. Please try again later.',
            });
        });
}

