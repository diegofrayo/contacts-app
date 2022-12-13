import * as React from "react";

import Layout from "~/components/Layout";
import { useDidMount } from "~/hooks";
import Ryakt from "~/lib/ryakt";

function App() {
  // states & refs
  const containerRef = React.useRef(null);

  // effects
  useDidMount(() => {
    Ryakt.renderDOM(Layout(), containerRef.current);
  });

  return <div ref={containerRef} id="app" />;
}

export default App;
