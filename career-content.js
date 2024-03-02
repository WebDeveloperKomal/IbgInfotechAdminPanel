// ---------------------get all the data------------------------------------------
var jwtToken = localStorage.getItem('jwtToken');

document.addEventListener('DOMContentLoaded', getData);

function getData() {
    if (!jwtToken) {
        console.error('JWT token not found in localStorage');
        return;
    }

    fetch('http://localhost:8181/ibg-infotech/auth/get-all-careers', {
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
            console.log('Data received:', data);
            if (data && Array.isArray(data)) {
                populateTable(data);
            } else {
                console.error('Invalid data received from the server');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
function populateTable(data) {
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.post}</td>
            <td>${item.post_content}</td>
            <td><img src="data:image/jpeg;base64,${item.image3}" width="100" height="100"></td>
            <td>
                <a class="edit-btn" data-id="${item.id}"><i class="ti-pencil"></i>Edit</a>
                <a class="delete-btn" data-id="${item.id}"><i class="ti-trash"></i>Delete</a>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Attach event listeners after table population
    attachEventListeners();
}

function attachEventListeners() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            console.log("Edit button clicked for ID: " + id);

            fetch(`http://localhost:8181/ibg-infotech/auth/get-career/${id}`, {
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
                    localStorage.setItem('updateData', JSON.stringify(data));
                    console.log('Data stored in localStorage:', data);
                    window.location.href = 'update-content-form.html';
                })
                .catch(error => {
                    console.error('Error fetching career data:', error);
                });
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            deleteCareerContent(id);
        });
    });
}


// -------------------------delete the data--------------------------------------------------------

function deleteCareerContent(id) {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch(`http://localhost:8181/ibg-infotech/auth/delete-career/${id}`, {
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
                text: 'Delete Career content has been deleted successfully.',
            }).then((result) => {

                getData();
            });
        })

        .catch(error => {
            console.error('Error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete the Delete Career content. Please try again later.',
            });
        });
}


// -------------------------------update the data by id-------------------------------------------


function updateData() {
    var id = document.getElementById('id').value;
    var post = document.getElementById('post').value;
    var post_content = document.getElementById('post_content').value;
    var uploadImageFile = document.getElementById('image-input').files[0];
    var jwtToken = localStorage.getItem('jwtToken');

    console.log("Fields captured:", id, post, post_content, uploadImageFile, jwtToken);

    if (!post || !post_content) {
        console.log("Please fill in all required fields.");
        alert('Please fill in all required fields.');
        return;
    }

    if (!jwtToken) {
        console.log("JWT token is missing. Please log in again.");
        alert('JWT token is missing. Please log in again.');
        return;
    }

    var formData = new FormData();
    formData.append('post', post);
    formData.append('post_content', post_content);

    var jsonData = {
        post: post,
        post_content: post_content,
    };

    formData.append('data', JSON.stringify(jsonData));

    if (uploadImageFile) {
        formData.append('uploadImageFile', uploadImageFile);
    }

    fetch(`http://localhost:8181/ibg-infotech/auth/update-career/${id}`, {
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
                    window.location.href = 'career-content.html';
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