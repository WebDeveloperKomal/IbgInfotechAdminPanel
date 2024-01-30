
// 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYXZpbmFwYXdhcjU5OTFAZ21haWwuY29tIiwiaWF0IjoxNzA1OTg5MzcxLCJleHAiOjE3MDYwMDczNzF9.hR50yiJJbnGWIh3VcS8qsqwY0xcJag6WA3WY8ZNaWnW6sRmqGMzA6fAxMe58gEKCVxReIyhsWS_PnNIetfQaxQ',
// 'username': 'ravinapawar5991@gmail.com',
// 'password': 'ravina@1234',

// Credential{email:'',password:''};
// localStorage.setItem('token', response.jwtToken);


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

    fetch('http://localhost:8181/ibg-infotech/auth/save-services-content', {
        method: 'POST',
        body: JSON.stringify(saveData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + jwtToken, // Updated key to 'authToken'
            // 'Authorization': `Bearer ${jwtToken}`,
            // 'Authorization': 'Bearer ' + jwtToken('email:password'),
            // 'Authorization': `Bearer ${jwtToken}`,
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
            alert('Save Data Successfully!');
            // Redirect to page if needed
            // window.location.href = 'Services.html';
        })

        .catch(error => {
            console.error('Error:', error);
            alert('Failed to save data. Please try again.');
        });
}

// --------------------------get data------------------------------------------

// function fetchData() {
//     let headers = new Headers();
//     headers.append('Accept', 'application/json');

//     fetch('http://localhost:8181/ibg-infotech/auth/get-all-services-content', {
//         method: 'GET',
//         headers: headers,
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error('Failed to fetch data');
//             }
//         })
//         .then(data => {
//             console.log(data);
//         })
//         .catch(error => console.error('Error:', error));
// }


// function fetchData() {
//     const apiEndpoint = 'http://localhost:8181/ibg-infotech/auth/get-all-services-content';

//     fetch(apiEndpoint)
//         .then(response => {

//             if (!response.ok) {
//                 throw new Error(`Network response was not ok: ${response.statusText}`);
//             }

//             return response.json();
//         })
//         .then(data => {

//             displayData(data);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// }

// function displayData(data) {
//     const tableBody = document.getElementById('dataTableBody');

//     tableBody.innerHTML = '';

//     data.forEach((item, index) => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
// <th scope="row">${index + 1}</th>
// <td>${item.name}</td>
// <td>${item.title}</td>
// <td>${item.information}</td>
// <td>
// <a href="update-services.html" class="waves-effect" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit Testimonial"><i class="ti-pencil"></i> Edit</a>
// <a href="javascript:void(0);" class="waves-effect delete_entry" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete Testimonial" data-id="${item.id}" data-tabl="testimonials"><i class="ti-trash"></i> Delete</a>
// </td>
// `;
//         tableBody.appendChild(row);
//     });
// }

// window.onload = function () {
//     fetchData();
// };


/* <script>
    fetch("http://localhost:8181/ibg-infotech/auth/get-all-services-content")
    .then(response => response.json())
    .then(res => {
        const data = res.service;
    let rows = '';
        data.forEach(service => {
        rows += `<tr><td>${service.id}</td><td>${service.name}</td><td>${service.title}</td><td>${service.information}</td></tr>`;
        })
    document.getElementById('tableBody').innerHTML = rows;
    })
    .catch(error => console.log(error));
</script> */


// -----------------------=get data id--------------------------


