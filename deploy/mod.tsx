/** @jsx h */

// deno-lint-ignore no-unused-vars
import { h, jsx, serve, serveStatic } from "../deps.ts";
import App from "./views/App.tsx";
import Feed from "./views/Feed.tsx";
import NotFoundPage from "./views/status/404.tsx";

serve({
  "/": () =>
    jsx(App({
      title: "RSS Reader",
      message: <div class="content">
        <h1>Welcome</h1>
        <p>Navigate to a sub-url to read RSS content.</p>
        <p>
          For example <a href="/svia.nl/activities/rss/nl/">via-activities.</a>
        </p>
      </div>,
    })),
  "/public/:filename+": serveStatic("public", { baseUrl: import.meta.url }),
  "/:slug(.*)": async (_, params) => {
    if (typeof params?.slug !== "string") {
      console.error("Invalid slug parameter.");
      throw new Error(
        "Invalid Request: " + params?.slug + ", " + typeof params?.slug,
      );
    }

    let rssUrl: string = params.slug;
    if (!rssUrl.startsWith("http://") && !rssUrl.startsWith("https://")) {
      rssUrl = "https://" + rssUrl;
    }

    return jsx(
      await Feed({
        path: rssUrl,
      }),
    );
  },
  404: () => jsx(NotFoundPage()),
});
