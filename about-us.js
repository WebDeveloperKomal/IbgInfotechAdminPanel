// ----------------------------------save the data--------------------------------------

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

    var heading = document.getElementById('heading').value;
    var text1 = document.getElementById('text1').value;
    var text2 = document.getElementById('text2').value;
    var mission = document.getElementById('mission').value;
    var vision = document.getElementById('vision').value;
    var value = document.getElementById('value').value;
    var experience = document.getElementById('experience').value;
    var award_text = document.getElementById('award_text').value;
    var imageFile = document.getElementById('imageFile').files[0];
    var member_count = document.getElementById('member_count').value;
    var awards_count = document.getElementById('awards_count').value;
    var project = document.getElementById('project').value;
    var client_review = document.getElementById('client_review').value;
    var terminal = document.getElementById('terminal').value;


    var formData = new FormData();
    formData.append('data', JSON.stringify({
        heading: heading,
        text1: text1,
        text2: text2,
        mission: mission,
        vision: vision,
        value: value,
        experience: experience,
        award_text: award_text,
        member_count: member_count,
        awards_count: awards_count,
        project: project,
        client_review: client_review,
        terminal: terminal,

    }));

    formData.append('imageFile', imageFile);

    var jwtToken = localStorage.getItem('jwtToken');

    if (!heading || !text1 || !text2 || !mission || !vision || !value || !experience || !award_text || !imageFile || !member_count || !awards_count || !project || !client_review || !terminal) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!jwtToken) {
        alert('JWT token is missing. Please log in again.');
        return;
    }

    fetch('http://localhost:8181/ibg-infotech/auth/save-about-us-content', {
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

                document.getElementById('heading').value = '';
                document.getElementById('text1').value = '';
                document.getElementById('text2').value = '';
                document.getElementById('mission').value = '';
                document.getElementById('vision').value = '';
                document.getElementById('value').value = '';
                document.getElementById('experience').value = '';
                document.getElementById('award_text').value = '';
                document.getElementById('imageFile').value = '';
                document.getElementById('member_count').value = '';
                document.getElementById('awards_count').value = '';
                document.getElementById('project').value = '';
                document.getElementById('client_review').value = '';
                document.getElementById('terminal').value = '';

                window.location.href = 'About-us.html';
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

// ---------------------------------update the data------------------------------------------

function updateData() {
    var id = document.getElementById('id').value;
    var heading = document.getElementById('heading').value;
    var text1 = document.getElementById('text1').value;
    var text2 = document.getElementById('text2').value;
    var mission = document.getElementById('mission').value;
    var vision = document.getElementById('vision').value;
    var value = document.getElementById('value').value;
    var experience = document.getElementById('experience').value;
    var award_text = document.getElementById('award_text').value;
    var imageFile = document.getElementById('image-input').files[0];
    var member_count = document.getElementById('member_count').value;
    var awards_count = document.getElementById('awards_count').value;
    var project = document.getElementById('project').value;
    var client_review = document.getElementById('client_review').value;
    var terminal = document.getElementById('terminal').value;

    // Client-side validation
    if (!heading || !text1 || !text2 || !mission || !vision || !value || !experience || !award_text || !member_count || !awards_count || !project || !client_review || !terminal) {
        alert('Please fill in all required fields.');
        return;
    }

    var jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
        alert('JWT token is missing. Please log in again.');
        return;
    }

    var formData = new FormData();
    formData.append('heading', heading);
    formData.append('text1', text1);
    formData.append('text2', text2);
    formData.append('mission', mission);
    formData.append('vision', vision);
    formData.append('value', value);
    formData.append('experience', experience);
    formData.append('award_text', award_text);
    formData.append('member_count', member_count);
    formData.append('awards_count', awards_count);
    formData.append('project', project);
    formData.append('client_review', client_review);
    formData.append('terminal', terminal);

    // Append image file if provided
    if (imageFile) {
        formData.append('imageFile', imageFile);
    }

    var jsonData = {
        heading: heading,
        text1: text1,
        text2: text2,
        mission: mission,
        vision: vision,
        value: value,
        experience: experience,
        award_text: award_text,
        member_count: member_count,
        awards_count: awards_count,
        project: project,
        client_review: client_review,
        terminal: terminal,
    };

    formData.append('data', JSON.stringify(jsonData));

    fetch(`http://localhost:8181/ibg-infotech/auth/update-about-us-content/${id}`, {
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

            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Data has been updated successfully.',
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    // Reset form fields
                    document.getElementById('heading').value = '';
                    document.getElementById('text1').value = '';
                    document.getElementById('text2').value = '';
                    document.getElementById('mission').value = '';
                    document.getElementById('vision').value = '';
                    document.getElementById('value').value = '';
                    document.getElementById('experience').value = '';
                    document.getElementById('award_text').value = '';
                    document.getElementById('image-input').value = ''; // Reset file input
                    document.getElementById('member_count').value = '';
                    document.getElementById('awards_count').value = '';
                    document.getElementById('project').value = '';
                    document.getElementById('client_review').value = '';
                    document.getElementById('terminal').value = '';

                    // Redirect to the next page
                    window.location.href = 'About-us.html';
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


// -----------------------get all the data-----------------------------------------

var jwtToken = localStorage.getItem('jwtToken');

document.addEventListener('DOMContentLoaded', getData);

function getData() {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch('http://localhost:8181/ibg-infotech/auth/get-all-about-us-content', {
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
            <td>${item.heading}</td>
            <td>${item.text1}</td>
            <td>${item.text2}</td>
            <td>${item.mission}</td>
            <td>${item.vision}</td>
            <td>${item.value}</td>
            <td>${item.experience}</td>
            <td>${item.award_text}</td>
            <td>${item.member_count}</td>
            <td>${item.awards_count}</td>
            <td>${item.project}</td>
            <td>${item.client_review}</td>
            <td>${item.terminal}</td>

            <td><img src="data:image/jpeg;base64,${item.image}" width="100" height="100"></td>
            <td>
                <a class="edit-btn" data-id="${item.id}"><i class="ti-pencil"></i>Edit</a>
                <a class="delete-btn" data-id="${item.id}"><i class="ti-trash"></i>Delete</a>
            </td>
        `;

            tableBody.appendChild(row);

            const editBtn = row.querySelector('.edit-btn');
            editBtn.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                console.log("Edit button clicked for ID:" + id);

                fetch(`http://localhost:8181/ibg-infotech/auth/get-about-us-content/${id}`, {
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
                        if (data) {
                            localStorage.setItem('updateData', JSON.stringify(data.data));
                            window.location.href = 'update-about-us.html';
                        } else {
                            console.error('Data received from server is invalid:', data);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching about us content data:', error);
                    });
            });

            const deleteBtn = row.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                const id = deleteBtn.getAttribute('data-id');
                deleteAboutUsContent(id);
            });
        });

    } else {
        console.error('Data received is not an array:', data);
    }

}


// ---------------------------------delete the data--------------------------------------------------------


function deleteAboutUsContent(id) {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch(`http://localhost:8181/ibg-infotech/auth/delete-about-us-content/${id}`, {
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
                text: 'About us has been deleted successfully.',
            }).then((result) => {

                getData();
            });
        })

        .catch(error => {
            console.error('Error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete the About us. Please try again later.',
            });
        });
}

