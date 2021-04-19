# Bug

Create a file `a.ts`:

```typescript
import { deserializeFeed } from "https://deno.land/x/rss@0.3.3/mod.ts";

const response = await fetch("https://hnrss.org/newest");
const xml = await response.text();
const { feed } = await deserializeFeed(xml, { outputJsonFeed: true });

console.dir(feed);
```

Run using: `deno run --allow-net a.ts`

This will work no problem.

Now we rerun using `--no-check`:

This gives us the following error:

```
$ deno run --allow-net --no-check a.ts

error: Uncaught SyntaxError: The requested module './types/mod.ts' does not provide an export named 'JsonFeed'
        JsonFeed,
        ~~~~~~~~
    at <anonymous> (https://deno.land/x/rss@0.3.3/src/deserializer.ts:7:2)
```

Removing `--no-check` will still give us the error:

```
$ deno run --allow-net a.ts

error: Uncaught SyntaxError: The requested module './types/mod.ts' does not provide an export named 'JsonFeed'
        JsonFeed,
        ~~~~~~~~
    at <anonymous> (https://deno.land/x/rss@0.3.3/src/deserializer.ts:7:2)
```

Even using `--reload` will not help.

```
$ deno run --allow-net --reload a.ts

error: Uncaught SyntaxError: The requested module './types/mod.ts' does not provide an export named 'JsonFeed'
        JsonFeed,
        ~~~~~~~~
    at <anonymous> (https://deno.land/x/rss@0.3.3/src/deserializer.ts:7:2)
```

Now we rename the file: `mv a.ts b.ts`

And rerun the original command which will work just fine:
`deno run --allow-net b.ts`
