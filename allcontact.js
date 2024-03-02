

var jwtToken = localStorage.getItem('jwtToken');

document.addEventListener('DOMContentLoaded', getData);

function getData() {
    var jwtToken = localStorage.getItem('jwtToken');


    fetch('http://localhost:8181/ibg-infotech/auth/get-all-contact-count', {
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
            updateContactCount(data.data);
        })
        .catch(error => {
            console.error('Error fetching contact data:', error);
        });





    fetch('http://localhost:8181/ibg-infotech/auth/get-all-subscribed-member-count', {
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
            updateMailCount(data.data);
        })
        .catch(error => {
            console.error('Error fetching mail data:', error);
        });




    fetch('http://localhost:8181/ibg-infotech/auth/get-all-team-member-count', {
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
            updateTeamMemberCount(data.data);
        })
        .catch(error => {
            console.error('Error fetching team member data:', error);
        });
}





function updateContactCount(count) {
    var contactCountElement = document.getElementById('contact-data');
    if (contactCountElement) {
        contactCountElement.textContent = count;
    } else {
        console.error('Element with id "contact-data" not found.');
    }
}



function updateMailCount(count) {
    var mailCountElement = document.getElementById('mail-data');
    if (mailCountElement) {
        mailCountElement.textContent = count;
    } else {
        console.error('Element with id "mail-data" not found.');
    }
}




function updateTeamMemberCount(count) {
    var teamMemberCountElement = document.getElementById('team-member-data');
    if (teamMemberCountElement) {
        teamMemberCountElement.textContent = count;
    } else {
        console.error('Element with id "team-member-data" not found.');
    }
}
