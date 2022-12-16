import { updateSearchInputValueAction, useDispatch } from "~/modules/state-management";
import type { T_ReactOnChangeEventObject } from "~/types";

function SearchInput() {
	// hooks
	const dispatch = useDispatch();

	// handlers
	function onChangeHandler(event: T_ReactOnChangeEventObject<HTMLInputElement>): void {
		const inputValue = event.currentTarget.value;

		dispatch(updateSearchInputValueAction(inputValue));
	}

	return (
		<div className="SearchInput">
			<input
				className="SearchInput__input"
				type="text"
				placeholder="Search"
				onChange={onChangeHandler}
			/>
		</div>
	);
}

export default SearchInput;
