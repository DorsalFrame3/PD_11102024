window.onload = function() {
    // Handle showing registration or login form
    document.getElementById('register-button').onclick = function() {
        document.querySelector('.login').classList.add('hidden');
        document.querySelector('.register').classList.remove('hidden');
        document.querySelector('.registered').classList.add('hidden');
    };

    document.getElementById('login-button').onclick = function() {
        document.querySelector('.register').classList.add('hidden');
        document.querySelector('.login').classList.remove('hidden');
        document.querySelector('.registered').classList.add('hidden');
    };

    // Handle Registration
    document.getElementById('submit-registration').onclick = async function() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirmation = document.getElementById('password_confirmation').value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation
                })
            });

            if (response.ok) {
                alert("Registration successful! You can now log in.");
                document.querySelector('.register').classList.add('hidden');
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Handle Login
    document.getElementById('submit-login').onclick = async function() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token in localStorage or sessionStorage
                localStorage.setItem('token', data.token);
                document.querySelector('.login').classList.add('hidden');
                document.querySelector('.registered').classList.remove('hidden');
                document.getElementById('user-data').innerHTML = `<p>User Email: ${data.user.email}<br>
                                                                  User Name: ${data.user.name}</p>`;
                await fetchAllPosts(data.token);
            } else {
                alert(`Login failed: ${data.message}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getForm = document.getElementById('get-user-form');
    getForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let token = localStorage.getItem('token'); // Use token from storage

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user-data', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('user-data').innerHTML = `<p>User Email: ${data.email}<br>
                                                                    User Name: ${data.name}</p>`;
                await fetchAllPosts(token);
            }

        } catch (error) {
            console.log(error);
        }
    });

    const postForm = document.getElementById('create-post-form');
    postForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        let token = localStorage.getItem('token'); // Use token from storage

        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: formData.get('title'),
                    body: formData.get('body')
                })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('post-data').innerHTML = `<p>Post Created Successfully!</p>
                                                                  <p><strong>Title:</strong> ${data.title}, <strong>Body:</strong> ${data.body}</p>`;
                await fetchAllPosts(token);

                document.getElementById('title').value = '';
                document.getElementById('body').value = '';
            }

        } catch (error) {
            console.log(error);
        }
    });

    async function fetchAllPosts(token) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const posts = await response.json();

            if (response.ok) {
                const postsContainer = document.getElementById('user-posts');
                postsContainer.innerHTML = '';
                posts.forEach(post => {
                    postsContainer.innerHTML += `
                        <div class="post">
                            <p><strong>Title:</strong> ${post.title}</p>
                            <p><strong>Body:</strong> ${post.body}</p>
                        </div>
                    `;
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Check for a token on page load
    const token = localStorage.getItem('token');
    if (token) {
        fetchAllPosts(token);
    }
};
