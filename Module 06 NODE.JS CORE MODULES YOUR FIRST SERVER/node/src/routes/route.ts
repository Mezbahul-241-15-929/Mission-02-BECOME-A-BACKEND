import type { IncomingMessage, ServerResponse } from "node:http";
import productController from "../controllers/product.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url; // "/" , "/products" , "/course"
  const method = req.method; // "GET" "POST"

  if (url === "/" && method === "GET") {
    // console.log("This is root router");
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is root route" }));
  } else if (url?.startsWith("/products")) {
    productController(req,res);
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is not root route" }));
  }
};

export default routeHandler;
