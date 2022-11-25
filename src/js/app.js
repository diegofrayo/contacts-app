import contacts from "./modules/contactsList.js";
import createNode from "./modules/createNode.js";

function showPeople() {
  const personContent = document.querySelector(".contacts ul");

  contacts.map((person) => {
    const contact = createNode({
      element: document.createElement("li"),
      className: "person",
      children: [
        createNode({
          element: document.createElement("img"),
          props: {
            src: person.img,
          },
        }),
        createNode({
          element: document.createElement("div"),
          className: "person-info",
          children: [
            createNode({
              element: document.createElement("span"),
              className: "name",
              innerText: person.name,
            }),
            createNode({
              element: document.createElement("span"),
              className: "tel",
              innerText: person.tel,
            }),
          ],
        }),
      ],
    });
    personContent.appendChild(contact);
  });
}

showPeople();
