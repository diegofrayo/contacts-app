const personContent = document.querySelector('.contacts ul');

function showPeople() {
    contacts.map(person => {
        const contact = document.createElement('li');
        const img = document.createElement('img');
        const personInfoDiv = document.createElement('div');

        const personName = document.createElement('span');
        const tel = document.createElement('span');

        contact.classList.add('person');
        personInfoDiv.classList.add('person-info');
        personName.classList.add('name');
        tel.classList.add('tel');

        img.src = person.img;
        personName.innerText = person.name;
        tel.innerText = person.tel;

        personInfoDiv.append(personName, tel);

        contact.append(img, personInfoDiv);
        personContent.appendChild(contact);
    });

}

window.addEventListener('load', showPeople);
