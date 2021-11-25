import { html } from "./../../node_modules/lit-html/lit-html.js";

export const loginTemplate = (form) => html`
<section id="login">
    <form @submit=${form.submitHandler} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`
{/* <div class="row space-top">
<div class="col-md-12">
<h1>Login User</h1>
<p>Please fill all fields.</p>
</div>
</div>
<form @submit=${form.submitHandler}>
<div class="row space-top">
<div class="col-md-4">
    <div class="form-group">
        <label class="form-control-label" for="email">Email</label>
        <input class="form-control" id="email" type="text" name="email">
    </div>
    <div class="form-group">
        <label class="form-control-label" for="password">Password</label>
        <input class="form-control" id="password" type="password" name="password">
    </div>
    <input type="submit" class="btn btn-primary" value="Login" />
</div>
</div>
</form> */}