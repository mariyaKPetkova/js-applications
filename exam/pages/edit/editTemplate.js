import { html } from './../../node_modules/lit-html/lit-html.js';

export let editTemplate = (form) => html`
<section id="edit-page" class="auth">
            <form id="edit" @submit=${form.submitHandler}>
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value="">

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" value="">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value="">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value="">

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary"></textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>`;


{/* <section id="edit-page" class="edit">
            <form id="edit-form" action="#" method="" @submit=${form.submitHandler}>
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" value="A Court of Thorns and Roses">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description"
                                id="description"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" value="/images/book1.png">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" value="Fiction">
                                <option value="Fiction" selected>Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section> */}
{/* <div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${form.submitHandler}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control${form.invalidFields.make ? ' is-invalid' : ' is-valid'}" id="new-make" type="text" name="make" .value=${form.values.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control${form.invalidFields.model ? ' is-invalid' : ' is-valid'}" id="new-model" type="text" name="model" .value=${form.values.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control${form.invalidFields.year ? ' is-invalid' : ' is-valid'}" id="new-year" type="number" name="year" .value=${form.values.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control${form.invalidFields.description ? ' is-invalid' : ' is-valid'}" id="new-description" type="text" name="description" .value=${form.values.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control${form.invalidFields.price ? ' is-invalid' : ' is-valid'}" id="new-price" type="number" name="price" .value=${form.values.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control${form.invalidFields.img ? ' is-invalid' : ' is-valid'}" id="new-image" type="text" name="img" .value=${form.values.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value=${form.values.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form> */}