import Ryakt from "~/lib/ryakt";

function CreateContactModal() {
	// TODO: [David] The modal has to have a close button on the right corner
	const children = `
		<div class="CreateContactModal__content">
			<h2 class="CreateContactModal__content__title">Add Contact</h2>
			<form class="CreateContactModal__content__form">
				<input type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--name" placeholder="Name" />
				<input type="file" hidden />
				<input type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--tel" placeholder="Telephone" />
				<input type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--instagram" placeholder="Instagram" />
				<input type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--whatsapp" placeholder="WhatsApp" />
				<input type="text" class="CreateContactModal__content__form__input CreateContactModal__content__form__input--mail" placeholder="Mail" />
				<button type="submit" class="CreateContactModal__content__form__submit-btn">Create</button>
			</form>
		</div>
	`;

	return Ryakt.createElement("div", { className: "CreateContactModal" }, [children]);
}

export default CreateContactModal;
