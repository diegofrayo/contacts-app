export function createNode({ tag, children, className, innerText, props }) {
	const Element = document.createElement(tag);

	if (children) {
		Element.append(...children);
	}

	if (className) {
		Element.classList.add(className);
	}

	if (innerText) {
		Element.innerText = innerText;
	}

	if (props) {
		Object.entries(props).forEach(([key, value]) => {
			Element.setAttribute(key, value);
		});
	}

	return Element;
}
