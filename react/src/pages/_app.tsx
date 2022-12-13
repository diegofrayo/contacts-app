import "~/styles/app.scss";

import * as React from "react";
import { AppProps } from "next/app";

import { T_ReactElement } from "~/types";

function CustomApp({ Component, pageProps }: AppProps): T_ReactElement {
  return <Component {...pageProps} />;
}

export default CustomApp;
