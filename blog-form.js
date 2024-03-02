// ------------------save the data------------------------------------------------------------

function previewImage1() {
    const image1 = document.getElementById('image1').files[0];
    const imagePreview1 = document.getElementById('imagePreview1');

    if (image1) {
        const reader = new FileReader();
        reader.onload = function (event) {
            imagePreview1.src = event.target.result;
            imagePreview1.style.display = 'block';
        };
        reader.readAsDataURL(image1);

        document.getElementById('imagePath1').value = image1.name;
    } else {
        imagePreview1.style.display = 'none';
    }
}


function previewImage2() {
    const image2 = document.getElementById('image2').files[0];
    const imagePreview2 = document.getElementById('imagePreview2');

    if (image2) {
        const reader = new FileReader();
        reader.onload = function (event) {
            imagePreview2.src = event.target.result;
            imagePreview2.style.display = 'block';
        };
        reader.readAsDataURL(image2);

        document.getElementById('imagePath2').value = image2.name;
    } else {
        imagePreview2.style.display = 'none';
    }
}


function previewImage3() {
    const image3 = document.getElementById('image3').files[0];
    const imagePreview3 = document.getElementById('imagePreview3');

    if (image3) {
        const reader = new FileReader();
        reader.onload = function (event) {
            imagePreview3.src = event.target.result;
            imagePreview3.style.display = 'block';
        };
        reader.readAsDataURL(image3);

        document.getElementById('imagePath3').value = image3.name;
    } else {
        imagePreview3.style.display = 'none';
    }
}


function previewImage4() {
    const image4 = document.getElementById('image4').files[0];
    const imagePreview4 = document.getElementById('imagePreview4');

    if (image4) {
        const reader = new FileReader();
        reader.onload = function (event) {
            imagePreview4.src = event.target.result;
            imagePreview4.style.display = 'block';
        };
        reader.readAsDataURL(image4);

        document.getElementById('imagePath4').value = image4.name;
    } else {
        imagePreview4.style.display = 'none';
    }
}


function previewImage5() {
    const image5 = document.getElementById('image5').files[0];
    const imagePreview5 = document.getElementById('imagePreview5');

    if (image5) {
        const reader = new FileReader();
        reader.onload = function (event) {
            imagePreview5.src = event.target.result;
            imagePreview5.style.display = 'block';
        };
        reader.readAsDataURL(image5);

        document.getElementById('imagePath5').value = image5.name;
    } else {
        imagePreview5.style.display = 'none';
    }
}


function saveData() {
    var name = document.getElementById('name').value;
    var image1 = document.getElementById('image1').files[0];
    var image2 = document.getElementById('image2').files[0];
    var image3 = document.getElementById('image3').files[0];
    var image4 = document.getElementById('image4').files[0];
    var image5 = document.getElementById('image5').files[0];
    var description = CKEDITOR.instances.editor2.getData();


    if (!name || !image1 || !image2 || !image3 || !image4 || !image5 || !description) {
        alert('Please fill in all required fields.');
        return;
    }

    var formData = new FormData();
    formData.append('name', name);
    formData.append('image1', image1);
    formData.append('image2', image2);
    formData.append('image3', image3);
    formData.append('image4', image4);
    formData.append('image5', image5);
    formData.append('text', description);

    var jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
        alert('JWT token is missing. Please log in again.');
        return;
    }

    fetch('http://localhost:8181/ibg-infotech/auth/save-blogs', {
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
            return response.text();
        })
        .then(data => {
            console.log('Server response:', data);
            if (data === "Blog saved successfully") {

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Blog saved successfully',
                    confirmButtonText: 'OK'
                }).then(() => {

                    document.getElementById('name').value = '';
                    document.getElementById('image1').value = '';
                    document.getElementById('image2').value = '';
                    document.getElementById('image3').value = '';
                    document.getElementById('image4').value = '';
                    document.getElementById('image5').value = '';
                    CKEDITOR.instances.editor2.setData('');

                    window.location.href = 'Blogs.html';
                });
            } else {

            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to save data. Please try again.');
        });
}
