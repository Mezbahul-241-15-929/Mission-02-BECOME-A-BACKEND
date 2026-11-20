import { createServer, IncomingMessage, Server, ServerResponse } from "http";
const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request : ",req)  //"GET", "POST"
    // console.log("Response : ",res)
    // console.log(req.url);
    // console.log(req.method);

    const url = req.url; // "/" , "/products" , "/course"
    const method = req.method; // "GET" "POST"

    if (url === "/" && method === "GET") {
      // console.log("This is root router");
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "This is root route" }));
    } else if (url?.startsWith("/products")) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "This is product route" }));
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "This is not root route" }));
    }
  },
);

server.listen(5000, () => {
  console.log("Server is running!");
});
