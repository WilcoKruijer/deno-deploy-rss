/** @jsx h */
import { h, jsx } from "../../../deps.ts";

import App from "../App.tsx";

export default (extraText?: string) => {
  const extra = extraText ? <p>{extraText}</p> : "";

  return App({
    title: "RSS Reader",
    message: <div class="content">
      <h1>Page not found.</h1>
      <p>This page could not be found. :(</p>
      {extra}
    </div>,
  });
};
