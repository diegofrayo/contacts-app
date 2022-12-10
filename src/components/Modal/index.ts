import Ryakt from "~/lib/ryakt";

function Modal() {

    window.addEventListener('click', (e: Event) => {
        let target = e.target as HTMLElement; 
        const modal = document.querySelector('.modal')?.contains(target); 
        const btnCheck = document.querySelector('.heading__add-button')?.contains(target); 
        const btn = document.querySelector('.heading__add-button') as HTMLElement;


        if(!modal && !btnCheck){
            document.querySelector('.modal')?.classList.remove('show');
			btn.innerHTML = "&#43;"
        }
        
     })

	const children = `
    <div class="modal__modal-content">
        <h2 class="modal__modal-content__modal-content-title">Add Contact</h2>
        <form>
            <input type="text" id="name" placeholder="Name" />
            <input type="file" id="avatar" hidden />
            <input type="text" id="tel" placeholder="Telephone" />
            <input type="text" id="instagram" placeholder="Instagram" />
            <input type="text" id="whatsApp" placeholder="WhatsApp" />
            <input type="text" id="mail" placeholder="Mail" />
            ${Ryakt.createElement('button', {type: "submit", className: "submit"}, ["create"])}
        </form>
    </div>
	`;

   return Ryakt.createElement("div", { className: "modal"}, [children]);
}

export default Modal;
