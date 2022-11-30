export function createNode({ element, children, className, innerText, props }) {
	if (children) {
		element.append(...children);
	}

	if (className) {
		element.classList.add(className);
	}

	if (innerText) {
		element.innerText = innerText;
	}

	if (props) {
		Object.entries(props).forEach(([key, value]) => {
			element.setAttribute(key, value);
		});
	}

	return element;
}
