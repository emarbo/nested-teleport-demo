# nested-teleport-demo

## Project setup

```
npm install
npm run build
```

## Run the server production mode (SSR)

```
npm run serve-prod
```

## Tests

### Happy path

Access to the home at <a href="http://localhost:8010/">http://localhost:8010/</a> and browse through the different pages:

* Home
* One teleport
* Two teleport
* Nested teleport

Everything works as expected.

### One teleport case

Access to <a href="http://localhost:8010/one-teleport">http://localhost:8010/one-teleport</a> directly to trigger the SSR. What happens:

* No hydration errors
* After browsing to another page, the app disappears from the DOM.

### Two teleport case

Access to <a href="http://localhost:8010/two-teleport">http://localhost:8010/two-teleport</a> directly to trigger the SSR. What happens:

* Hydration errors on the console
* After re-rendering (due to hydration errors), the second teleport appears twice in the DOM.
* After browsing to another page, the app disappears from the DOM.

### Nested teleport case

Access to <a href="http://localhost:8010/nested-teleport">http://localhost:8010/nested-teleport</a> directly to trigger the SSR. What happens:

* Hydration errors on the console
* After re-rendering (due to hydration errors), the app disappears from the DOM
