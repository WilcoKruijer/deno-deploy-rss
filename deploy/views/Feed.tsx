/** @jsx h */

// deno-lint-ignore no-unused-vars
import { h, jsx } from "../../deps.ts";
import App from "./App.tsx";
import NotFoundPage from "./status/404.tsx";
import { deserializeFeed } from "https://deno.land/x/rss@0.3.3/mod.ts";

export interface FeedOptions {
  path: string;
}

export default async function ({ path }: FeedOptions) {
  try {
    path = new URL(path).toString();
  } catch (_) {
    return NotFoundPage("Invalid RSS feed.");
  }

  const response = await fetch(path);
  const xml = await response.text();
  const { feed } = await deserializeFeed(xml, { outputJsonFeed: true });

  if (!feed || !feed.items) {
    console.dir(feed);
    return NotFoundPage("Invalid RSS feed.");
  }

  const items = feed.items.map((feedItem) => {
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: "full",
    };

    const dateStr = feedItem.date_modified
      ? feedItem.date_modified.toLocaleString(undefined, options)
      : feedItem.date_published?.toLocaleString(undefined, options) ||
        "Unknown Date";

    return <div class="content">
      <h1>
        <a href={feedItem.external_url || feedItem.url}>{feedItem.title}</a>
      </h1>
      <div class="post-head">
        <div>{dateStr}</div>
      </div>
      <p>
        {feedItem.content_text}
      </p>
    </div>;
  });

  return App({
    title: "RSS Reader",
    message: items,
  });
}
