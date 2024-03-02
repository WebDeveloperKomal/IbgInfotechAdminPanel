// ------------------------------save the data---------------------------------

function previewImage() {
    const imageFile = document.getElementById('imageFile').files[0];
    const imagePreview = document.getElementById('imagePreview');

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(imageFile);

        document.getElementById('imagePath').value = imageFile.name;
    } else {
        imagePreview.style.display = 'none';
    }
}


function saveData() {
    var imageFile = document.getElementById('imageFile').files[0];
    var year = document.getElementById('year').value;
    var text = document.getElementById('text').value;
    var heading = document.getElementById('heading').value;

    if (!imageFile || !year || !text || !heading) {
        alert('Please fill in all required fields.');
        return;
    }

    var formData = new FormData();
    formData.append('year', year);
    formData.append('heading', heading);
    formData.append('text', text);
    formData.append('imageFile', imageFile);

    var jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
        alert('JWT token is missing. Please log in again.');
        return;
    }

    fetch('http://localhost:8181/ibg-infotech/auth/save-achievement', {
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

                document.getElementById('imageFile').value = '';
                document.getElementById('year').value = '';
                document.getElementById('text').value = '';
                document.getElementById('heading').value = '';

                window.location.href = 'About-us-Achievement.html';
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


// ----------------------------get all data-----------------------------------

var jwtToken = localStorage.getItem('jwtToken');

document.addEventListener('DOMContentLoaded', getData);

function getData() {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch('http://localhost:8181/ibg-infotech/auth/get-all-achievements', {
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
            console.log('Error fetching data:', error);
        })
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
            <td>${item.year}</td>
            <td>${item.text}</td>
            <td>${item.heading}</td>
            <td><img src="data:image/jpeg;base64,${item.image}" width="100" height="100"></td>
            <td>
                <a class="edit-btn" data-id="${item.id}"><i class="ti-pencil"></i>Edit</a>
                <a class="delete-btn" data-id="${item.id}"><i class="ti-trash"></i>Delete</a>
            </td>

        `;

            tableBody.appendChild(row);

            const editBtn = row.querySelector('.edit-btn');
            editBtn.addEventListener('click', function () {
                const id = editBtn.getAttribute('data-id');
                console.log("Edit button clicked for ID:" + id);

                fetch(`http://localhost:8181/ibg-infotech/auth/get-achievement/${id}`, {
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
                        window.location.href = `Update-about-us-achievement.html`;

                    })

                    .catch(error => {
                        console.error('Error fetching home content data:', error);
                    });
            });

            const deleteBtn = row.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                const id = deleteBtn.getAttribute('data-id');
                deleteAchievement(id);
            });
        });
    } else {
        console.error('Data received is not an array:', data);
    }
}


// -------------------------delete the data---------------------------------------------------------------


function deleteAchievement(id) {
    jwtToken = localStorage.getItem('jwtToken');

    fetch(`http://localhost:8181/ibg-infotech/auth/delete-achievement/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + jwtToken,
        },

    })
        .then(response => {
            if (!response.ok) {
                throw new error('Network respose was not ok');
            }
            return response.json();
        })

        .then(data => {
            console.log(data);
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'about us achievement has been deleted successfully.',
            }).then((result) => {

                getData();
            });
        })

        .catch(error => {
            console.error('Error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete the about us achievement. Please try again later.',
            });
        });
}


// ---------------------------update the data by id--------------------------------------------


function updateData() {
    var id = document.getElementById('id').value;
    var year = document.getElementById('year').value;
    var heading = document.getElementById('heading').value;
    var text = document.getElementById('text').value;
    var imageFile = document.getElementById('image-input').files[0];
    var jwtToken = localStorage.getItem('jwtToken');

    if (!year || !heading || !text) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!jwtToken) {
        alert('JWT token is missing. Please log in again.');
        return;
    }

    var formData = new FormData();
    formData.append('year', year);
    formData.append('heading', heading);
    formData.append('text', text);

    var jsonData = {
        year: year,
        heading: heading,
        text: text,
    };

    formData.append('data', JSON.stringify(jsonData));

    if (imageFile) {
        formData.append('imageFile', imageFile);
    }

    fetch(`http://localhost:8181/ibg-infotech/auth/update-achievement/${id}`, {
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
            if (data.status) {
                // Data updated successfully
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Data has been updated successfully.',
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        window.location.href = 'About-us-Achievement.html';
                    }
                });
            } else {
                // Failed to update data
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to update data. ' + data.error,
                });
            }
        })
        .catch(error => {
            // Error during fetch request
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update data. Please try again.',
            });
        });
}
