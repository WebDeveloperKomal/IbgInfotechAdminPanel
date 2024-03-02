

var jwtToken = localStorage.getItem('jwtToken');

document.addEventListener('DOMContentLoaded', getData);

function getData() {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch('http://localhost:8181/ibg-infotech/auth/get-subscribed-user', {
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
                <td>${item.email}</td>        
                <td>
                    <a class="delete-btn" data-id="${item.id}"><i class="ti-trash"></i>Delete</a>
                </td>
            `;
            tableBody.appendChild(row);

            const deleteBtn = row.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                const id = deleteBtn.getAttribute('data-id');
                deleteMail(id);
            });
        });
    } else {
        console.error('Data received is not an array:', data);
    }
}


// ----------------------------------------delete by id-----------------------------------------------


function deleteMail(id) {
    var jwtToken = localStorage.getItem('jwtToken');

    fetch(`http://localhost:8181/ibg-infotech/auth/delete-subscribed/${id}`, {
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
                text: 'Mail has been deleted successfully.',
            }).then((result) => {

                getData();
            });
        })
        .catch(error => {
            console.error('Error deleting mail:', error);

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete the mail. Please try again later.',
            });
        });
}
