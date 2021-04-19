run:
	deployctl run --libs=fetchevent,dom.iterable,ns ./deploy/mod.tsx

watch:
	deployctl run --libs=fetchevent,dom.iterable,ns --watch ./deploy/mod.tsx

#  Reloads the dependencies, this is required when deps.ts is changed.
reload:
	deployctl run --libs=fetchevent,dom.iterable,ns --reload ./deploy/mod.tsx

fmt:
	deno fmt

lint:
	deno lint --unstable

test_full:
	deno test --unstable --allow-read=.
