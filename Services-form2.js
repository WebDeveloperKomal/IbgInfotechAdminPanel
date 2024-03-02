// ---------------------------- save the data ----------------------------------------

function saveData() {

    var formData = new FormData();
    formData.append('name', document.querySelector('input[name="name"]').value);
    formData.append('title', document.querySelector('input[name="title"]').value);
    formData.append('description', CKEDITOR.instances['editor2'].getData());
    var imageFile = document.getElementById('image-input').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    var jwtToken = localStorage.getItem('jwtToken');

    console.log('Request Data:', formData);

    if (!formData.get('name') || !formData.get('title') || !formData.get('description')) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!jwtToken) {
        alert('JWT token is missing. Please log in again.');
        return;
    }

    fetch('http://localhost:8181/ibg-infotech/auth/save-why-ibg-infotech', {
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
                window.location.href = 'Services2.html';
                document.querySelector('input[name="name"]').value = '';
                document.querySelector('input[name="title"]').value = '';
                document.querySelector('input[name="description"]').value = '';
                CKEDITOR.instances['editor2'].setData('');
                document.getElementById('image-input').value = '';
                getData();
            });
        })

        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to save data. Please try again.',
            });
        });
}


// --------------------------get all the data-----------------------------------------------

var jwtToken = localStorage.getItem('jwtToken');

document.addEventListener('DOMContentLoaded', getData);


function getData() {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch('http://localhost:8181/ibg-infotech/auth/get-all-why-ibg-infotech', {
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


function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
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
                <td><img src="data:image/jpeg;base64,${item.image}" width="100" height="100"></td>
                <td>
                <a class="edit-btn" data-id="${item.id}"><i class="ti-pencil"></i> Edit</a>
                <a class="delete-btn" data-id="${item.id}"><i class="ti-trash"></i> Delete</a>
                </td>
            `;
            tableBody.appendChild(row);

            const editBtn = row.querySelector('.edit-btn');
            editBtn.addEventListener('click', function () {
                const id = editBtn.getAttribute('data-id');
                console.log("Edit button clicked for ID: " + id);

                fetch(`http://localhost:8181/ibg-infotech/auth/get-why-ibg-infotech/${id}`, {
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

                        localStorage.setItem('updateData', JSON.stringify(data.data));
                        window.location.href = 'update-Services-form2.html';
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



// ----------------------------------------delete by id-----------------------------------------------

function deleteService(id) {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch(`http://localhost:8181/ibg-infotech/auth/delete-why-ibg-infotech/${id}`, {
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

// -----------------------------------update the data by id-------------------------------------------


function updateData() {

    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var title = document.getElementById('title').value;
    var description = CKEDITOR.instances['editor2'].getData();
    var imageFile = document.getElementById('image-input').files[0];
    var jwtToken = localStorage.getItem('jwtToken');


    if (!name || !title || !description) {
        alert('Please fill in all required fields.');
        return;
    }


    if (!jwtToken) {
        alert('JWT token is missing. Please log in again.');
        return;
    }

    var formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('description', description);
    if (imageFile) {
        formData.append('imageFile', imageFile);
    }

    // Send the update request to the server
    fetch(`http://localhost:8181/ibg-infotech/auth/update-why-ibg-infotech/${id}`, {
        method: 'PUT',
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
            if (data.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Data has been updated successfully.',
                }).then((result) => {

                    window.location.href = 'Services2.html';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to update data. ' + data.error,
                });
            }
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