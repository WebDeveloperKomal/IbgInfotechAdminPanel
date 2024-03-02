
// --------------------------save the data----------------------------------------
function previewImage() {
    const imagePath = document.getElementById('imagePath').files[0];
    const imagePreview = document.getElementById('imagePreview');

    if (imagePath) {
        const reader = new FileReader();
        reader.onload = function (event) {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(imagePath);

        document.getElementById('imageFile').value = imagePath.name; // Corrected line
    } else {
        imagePreview.style.display = 'none';
    }
}


function saveData() {
    var post = document.getElementById('post').value;
    var post_content = document.getElementById('post_content').value;
    var imagePath = document.getElementById('imagePath').files[0];

    var formData = new FormData();
    formData.append('data', JSON.stringify({
        post: post,
        post_content: post_content,
    }));

    if (imagePath) {
        formData.append('uploadImageFile', imagePath, imagePath.name);
    }

    var jwtToken = localStorage.getItem('jwtToken');

    if (!post || !post_content) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!jwtToken) {
        alert('JWT token is missing. Please log in again.');
        return;
    }

    fetch('http://localhost:8181/ibg-infotech/auth/save-career', {
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
                document.getElementById('post').value = '';
                document.getElementById('post_content').value = '';
                document.getElementById('imagePath').value = '';
                window.location.href = 'career-content.html';
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
