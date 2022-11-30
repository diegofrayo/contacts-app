import contacts from "./data/contacts.js";
import ContactsList from "./components/ContactsList.js";

// TODO: Execute this code when DOMContent has been loaded
setTimeout(() => {
	document.getElementById("app").appendChild(ContactsList({ contacts }));
}, 2000);

/*
const personContent = document.querySelector(".contacts ul"),
	submitBtn = document.querySelector("#btn-submit");

const search = document.querySelector("#search");

let value = "";

function submit(e) {
	e.preventDefault();
	let items = document.querySelectorAll(".contacts ul li");

	contacts.filter((person, i) => {
		if (person.name.toUpperCase().indexOf(value) > -1) {
			items[i].style.display = "";
		} else {
			items[i].style.display = "none";
		}
	});
	search.value = "";
}

function showPeople() {
	contacts.map((person) => {
		personContent.innerHTML += `
		<li class="person">
			<img src="${person.img}"/>
			<div class="person-info">
				<span class="name">${person.name}</span>
				<span class="tel">${person.tel}</span>
			</div>
		</li>`;
	});
}

search.addEventListener("keyup", () => {
	value = search.value.toUpperCase();
});

submitBtn.addEventListener("click", submit);
*/
