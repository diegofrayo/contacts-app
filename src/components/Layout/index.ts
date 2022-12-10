import SearchInput from "~/components/SearchInput";
import ContactsList from "~/components/ContactsList";
import Separator from "~/components/Separator";
import Contacts from "~/data/contacts";
import Ryakt from "~/lib/ryakt";
import Modal from "../Modal";
 
function Layout() {

	

	function showClick(e: Event): void {
		e.preventDefault();
        document.querySelector('.modal')?.classList.toggle('show'); 
		const target = e.target as HTMLElement; 
		const btn = document.querySelector('.heading__add-button') as HTMLElement; 
		if(target.innerText === "+"){
			btn.innerHTML = "&#215;"
		} else {
			btn.innerHTML = "&#43;"
		}
	}
	 
	const children = `
		<div class="heading">
			<h2 class="fw-text-center fw-mb-10">Contacts</h2>
			<div class="heading__heading-button">
			${Ryakt.createElement('span', { className: "heading__add-button", onClick: [
                ".heading__add-button",
                showClick
            ]}, ["&#43;"])}
			</div>

 		</div>
		${SearchInput()}
		${Separator({ size: 2 })}
		${ContactsList()}
		${Modal()}

  `;
 
	return Ryakt.createElement("div", { className: "Layout" }, [children], {
		didMount: function LayoutDidMount() {
			Contacts.loadDefaultData();
		},
	});
}

export default Layout;
