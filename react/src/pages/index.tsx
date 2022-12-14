import * as React from "react";
import Head from "next/head";

import App from "~/components-react/App";

function Home() {
	return (
		<React.Fragment>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no"
				/>
				<meta
					httpEquiv="X-UA-Compatible"
					content="IE=edge"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<link
					rel="icon"
					href="https://fav.farm/🧪"
				/>
				<title>Contacts App</title>
			</Head>
			<App />
		</React.Fragment>
	);
}

export default Home;
