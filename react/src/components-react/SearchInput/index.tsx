import { KeyboardEvent } from "react";
import Ryakt from "~/lib/ryakt";
import EventsManager from "~/modules/events-manager";
import { getTargetElement } from "~/utils";

function SearchInput() {
  // handlers
  function onKeyUpHandler(event: KeyboardEvent<HTMLInputElement>): void {
    const inputValue = event.currentTarget.value;

    EventsManager.dispatchEvent(
      EventsManager.events.REFRESH_CONTACTS_LIST,
      inputValue
    );
  }

  return (
    <form className="SearchInput">
      <input
        className="SearchInput__input"
        type="text"
        placeholder="Search"
        onKeyUp={onKeyUpHandler}
      />
    </form>
  );
}

export default SearchInput;