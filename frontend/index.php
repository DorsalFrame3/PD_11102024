<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Front</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Laravel API frontend</h1>

    <div class="container">
    <input type="submit" value="Register" id="register-button">
    <input type="submit" value="Login" id="login-button">
</div>

<div class="register hidden">
    <div class="container">
        <h2>Registration</h2>
        <label for="name">Name: </label>
        <input type="text" name="name" id="name">

        <label for="email">Email: </label>
        <input type="text" name="email" id="email">

        <label for="password">Password: </label>
        <input type="password" name="password" id="password">

        <label for="password_confirmation">Password Confirmation: </label>
        <input type="password" name="password_confirmation" id="password_confirmation">

        <input type="submit" id="submit-registration" value="Submit">
    </div>
</div>

<div class="login hidden">
    <div class="container">
        <h2>Login</h2>
        <label for="email">Email: </label>
        <input type="text" name="email" id="login-email">

        <label for="password">Password: </label>
        <input type="password" name="password" id="login-password">
        <input type="submit" id="submit-login" value="Submit">
    </div>
</div>

<div class="registered hidden">
    <div class="container">
        <h2>Get user</h2>
        <form action="/api/user" method="get" id="get-user-form">
            <label for="token">Token</label>
            <input type="text" name="token" id="token">

            <input type="submit" value="Get">
        </form>
    </div>
    <div class="container">
        <h2>Create post</h2>
        <form action="/api/posts" method="post" id="create-post-form">
            <label for="token">Token</label>
            <input type="text" name="token" id="token">

            <label for="title">Title</label>
            <input type="text" name="title" id="title">

            <label for="body">Body</label>
            <textarea name="body" id="body"></textarea>

            <input type="submit" value="Create">
        </form>
        <div id="post-data"></div>
    </div>
    <div class="container">
        <h2>Posts</h2>
        <div id="user-posts"></div>
    </div>
</div>
    <script src="js/app.js"></script>
</body>
</html>