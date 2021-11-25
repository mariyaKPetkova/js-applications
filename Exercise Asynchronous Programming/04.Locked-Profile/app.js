function lockedProfile() {
    (async () => {
        let prRes = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
        let profiles = await prRes.json();

        let mainEl = document.getElementById('main');
        let templateProfile = document.querySelector('.profile');
        templateProfile.remove();

        Object.keys(profiles).map((profile, i) => {
            let prof = createProfile(i + 1, profiles[profile].username, profiles[profile].email, profiles[profile].age);
            mainEl.appendChild(prof);
        })
    })();

    function createProfile(userIndex, username, email, age) {

        let profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        let imgEl = document.createElement('img');
        imgEl.src = './iconProfile2.png';
        imgEl.classList.add('userIcon');

        let lockLabel = document.createElement('label');
        lockLabel.textContent = 'Lock';

        let lockR = document.createElement('input');
        lockR.type = 'radio';
        lockR.name = `user${userIndex}Locked`;
        lockR.value = 'lock';
        lockR.checked = true;

        let unlockLabel = document.createElement('label');
        unlockLabel.textContent = 'Unlock';

        let unlockR = document.createElement('input');
        unlockR.type = 'radio';
        unlockR.name = `user${userIndex}Locked`;
        unlockR.value = 'unlock';

        let br = document.createElement('br');
        let hr = document.createElement('hr');

        let usernameLabel = document.createElement('label');
        usernameLabel.textContent = 'Username';

        let usernameInp = document.createElement('input');
        usernameInp.name = `user${userIndex}Username`;
        usernameInp.value = username;
        usernameInp.readOnly = true;
        usernameInp.disabled = true;

        let hiddenFieldsDiv = document.createElement('div');
        hiddenFieldsDiv.id = `user${userIndex}HiddenFields`;

        let hiddenFieldsHr = document.createElement('hr');

        let emailLabel = document.createElement('label');
        emailLabel.textContent = 'Email:';

        let emailInp = document.createElement('input');
        emailInp.type = 'email';
        emailInp.name = `user${userIndex}Email`;
        emailInp.value = email;
        emailInp.readOnly = true;
        emailInp.disabled = true;

        let ageLabel = document.createElement('label');
        ageLabel.textContent = 'Age:';

        let ageInp = document.createElement('input');
        ageInp.type = 'email';
        ageInp.name = `user${userIndex}Age`;
        ageInp.value = age;
        ageInp.readOnly = true;
        ageInp.disabled = true;

        hiddenFieldsDiv.appendChild(hiddenFieldsHr);
        hiddenFieldsDiv.appendChild(emailLabel);
        hiddenFieldsDiv.appendChild(emailInp);
        hiddenFieldsDiv.appendChild(ageLabel);
        hiddenFieldsDiv.appendChild(ageInp);

        let showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show More';
        showMoreButton.addEventListener('click', showHiddenInfo);

        profileDiv.appendChild(imgEl);
        profileDiv.appendChild(lockLabel);
        profileDiv.appendChild(lockR);
        profileDiv.appendChild(unlockLabel);
        profileDiv.appendChild(unlockR);
        profileDiv.appendChild(br);
        profileDiv.appendChild(hr);
        profileDiv.appendChild(usernameLabel);
        profileDiv.appendChild(usernameInp);
        profileDiv.appendChild(hiddenFieldsDiv);
        profileDiv.appendChild(showMoreButton);

        return profileDiv;
    }

    function showHiddenInfo(e) {
        let pro = e.target.parentElement;
        let moreInfoBtn = e.target;
        let hiddenF = e.target.previousElementSibling;
        let radioButton = pro.querySelector('input[type="radio"]:checked');
        if (radioButton.value !== 'unlock') {
            return;
        }
        moreInfoBtn.textContent = moreInfoBtn.textContent === 'Show More'
            ? 'Hide it'
            : 'Show More';
        hiddenF.style.display = hiddenF.style.display === 'block'
            ? 'none'
            : 'block';
    }
}