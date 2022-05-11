import { defineConfig, ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import bodyParser from "body-parser";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), psApi()],
});

function psApi() {
  let list = ["Mike", "Standish", "hello_world"];
  const sendJson = (res, data) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };
  return {
    name: "ps-api",
    configureServer(server) {
      server.middlewares.use(bodyParser.json());
      server.middlewares.use("/list", (req, res, next) => {
        switch (req.method) {
          case "GET":
            sendJson(res, list);
            break;
          case "POST":
            if (Math.random() > 0.5) {
              list = req.body;
              sendJson(res, list);
            } else {
              res.statusCode = 500;
              res.end();
            }
          default:
            break;
        }
      });
    },
  };
}
