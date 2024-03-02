// ----------------------------get all data----------------------------------------------

var jwtToken = localStorage.getItem('jwtToken');

document.addEventListener('DOMContentLoaded', getData);

function getData() {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch('http://localhost:8181/ibg-infotech/auth/get-all-blog', {
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
            <td><img src="data:image/jpeg;base64,${item.image1}" width="100" height="100"></td>
            <td><img src="data:image/jpeg;base64,${item.image2}" width="100" height="100"></td>
            <td><img src="data:image/jpeg;base64,${item.image3}" width="100" height="100"></td>
            <td><img src="data:image/jpeg;base64,${item.image4}" width="100" height="100"></td>
            <td><img src="data:image/jpeg;base64,${item.image5}" width="100" height="100"></td>
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

                fetch(`http://localhost:8181/ibg-infotech/auth/blog-data/${id}`, {
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
                        window.location.href = `Update-blog.html`;
                    })

                    .catch(error => {
                        console.error('Error fetching blog data:', error);
                    });
            });

            const deleteBtn = row.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                const id = deleteBtn.getAttribute('data-id');
                deleteBlog(id);
            });
        });

    } else {
        console.error('Data received is not an array:', data);
    }
}


// ------------------------------------delete the data------------------------------------------------------

function deleteBlog(id) {

    var jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'JWT token is missing. Please log in again.',
        });
        return;
    }


    fetch(`http://localhost:8181/ibg-infotech/auth/delete-blog/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + jwtToken,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.text();
        })
        .then(data => {

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Blog has been deleted successfully.',
            }).then(() => {

                location.reload();
            });
        })
        .catch(error => {
            console.error('Error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete the blog. Please try again later.',
            });
        });
}


// -------------------------update the data by id----------------------------------


function updateData() {
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var text = CKEDITOR.instances['editor2'].getData();
    var imageFile1 = document.getElementById('image-input1').files[0];
    var imageFile2 = document.getElementById('image-input2').files[0];
    var imageFile3 = document.getElementById('image-input3').files[0];
    var imageFile4 = document.getElementById('image-input4').files[0];
    var imageFile5 = document.getElementById('image-input5').files[0];
    var jwtToken = localStorage.getItem('jwtToken');

    if (!name || !text) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!jwtToken) {
        alert('JWT token is missing. Please log in again.');
        return;
    }

    var formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);

    if (imageFile1) {
        formData.append('image1', imageFile1);
    }
    if (imageFile2) {
        formData.append('image2', imageFile2);
    }
    if (imageFile3) {
        formData.append('image3', imageFile3);
    }
    if (imageFile4) {
        formData.append('image4', imageFile4);
    }
    if (imageFile5) {
        formData.append('image5', imageFile5);
    }

    // Send the update request to the server
    fetch(`http://localhost:8181/ibg-infotech/auth/update-blog/${id}`, {
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
            return response.text(); // Handle plain text response
        })
        .then(data => {
            console.log('Server response:', data);
            if (data.includes('updated successfully')) {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Data has been updated successfully.',
                }).then((result) => {
                    window.location.href = 'Blogs.html';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to update data. ' + data,
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
