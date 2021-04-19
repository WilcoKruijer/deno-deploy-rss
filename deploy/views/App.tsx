/** @jsx h */

// deno-lint-ignore no-unused-vars
import { h, jsx } from "../../deps.ts";
// import type { VNode } from "../deps.ts";

export interface TemplateOptions {
  title: string;
  message?: string | h.JSX.Element | h.JSX.Element[];
}

export default function ({ title, message }: TemplateOptions) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" type="text/css" href="/public/style.css" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body>
        <div class="head">
          <a href="/" class="logo">
            Wilco's RSS reader ;)
          </a>
          <div class="menu">
            <a href="/" class="active">Reader</a>
            <a href="/about">About</a>
          </div>
        </div>

        {message}
      </body>
    </html>
  );
}
