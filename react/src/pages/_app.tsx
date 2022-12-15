import "~/styles/app.scss";
import "~/styles/tailwind.css";

import * as React from "react";
import { AppProps } from "next/app";

import { Provider, store } from "~/modules/state-management";
import type { T_ReactElement } from "~/types";

function CustomApp({ Component, pageProps }: AppProps): T_ReactElement {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default CustomApp;
