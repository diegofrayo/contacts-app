import contacts from "./data/contacts.js";
import People from "./components/ContactsList.js";
import SearchInput from "./components/SearchInput.js";

// TODO: Execute this code when DOMContent has been loaded, remove this setTimeout, it was a temp and bad solution, beacuse if you remove the timeout, the code will not work
setTimeout(() => {
	document.getElementById("app").append(SearchInput(), People({ contacts }));
}, 2000);

/*
// TODO: Implement this code in a JavaScript file using template literals, create a component for the
// layout and that component should contain and render the other components (PeopleList and SearchInput)
<!-- <div class="wrapper">
  <div class="contacts">
    <h2>All contacts</h2>
    <form>
      <input
        id="search"
        type="text"
        placeholder="Find contact"
      />
      <button
        id="btn-submit"
        type="submit"
      >
        Submit
      </button>
    </form>
    <ul></ul>
  </div>
</div> -->
*/
