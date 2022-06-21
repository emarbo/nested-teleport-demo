/* eslint @typescript-eslint/no-var-requires: "off" */

/*
 * https://v3.vuejs.org/guide/ssr/server.html
 */
const path = require("path");
const mime = require("mime-types");
const express = require("express");
const fs = require("fs");
const { renderToString } = require("@vue/server-renderer");
const manifest = require("./dist/server/ssr-manifest.json");

const appPath = path.join(__dirname, "./dist", "server", manifest["app.js"]);
const createApp = require(appPath).default;

const server = express();

// Generated assets
server.get("*", async (req, res, next) => {
  const file = path.join(__dirname, "/dist/client", req.path);
  fs.readFile(file, (err, buff) => {
    if (err) {
      next();
      return;
    }
    const contentType = mime.lookup(req.path);
    console.log("----");
    console.log(`Serving static (${contentType}): ${req.path}`);
    res.contentType(contentType);
    res.send(buff.toString());
  });
});

// App routes
server.get("*", async (req, res) => {
  console.log("----");
  console.log(`Serving dynamic: ${req.url}`);
  const { app, router } = await createApp();

  await router.push(req.url);
  await router.isReady();

  const context = {};
  const appContent = await renderToString(app, context);
  const teleportContent = context.teleports ? context.teleports["#body-teleports"] : "";

  console.log("Context is:");
  console.log(JSON.stringify(context, null, "  "));
  console.log("Rendered app is:");
  console.log(appContent);
  console.log("Rendered teleport is:");
  console.log(teleportContent);
  console.log("Teleport target is:");
  console.log(context.teleports);

  fs.readFile(path.join(__dirname, "/dist/client/index.html"), (err, html) => {
    if (err) {
      throw err;
    }

    const content = html
      .toString()
      .replace('<div id="app">', `<div id="app">${appContent}`)
      .replace("</body>", `<div id="body-teleports">${teleportContent}</div></body>`);
    console.log("Rendered HTML is:");
    console.log(content);
    res.setHeader("Content-Type", "text/html");
    res.send(content);
  });
});

const port = 8010;

console.log(`You can navigate to http://localhost:${port}`);

server.listen(port);
