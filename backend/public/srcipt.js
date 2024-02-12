let loginUser = () => {

    let email = document.getElementById('email-l').value;
    let password = document.getElementById('password-l').value;
    // Create user object with username, email, and password
    let user = {
        "email": email,
        "password": password
    };

    // Fetch API to register user
    fetch('/api/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            // Alert result
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

let registerUser = () => {
    //Get UNAME, EMAIL, AND PASSWORD FROM DOM
    let uname = document.getElementById('username-r').value;
    let email = document.getElementById('email-r').value;
    let password = document.getElementById('password-r').value;
    console.log(uname, email, password);
    // Create user object with username, email, and password
    let user = {
        "username": uname,
        "email": email,
        "password": password
    };

    // Fetch API to register user
    fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            if (response.status == 200) {
                alert("Success!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error!");
        });
};

// /////////////////////
let blogurl = '/api/blog';
let createBlog = () => {

}

let readUserBlogs = () => {

}

let readAllBlogs = () => {

}