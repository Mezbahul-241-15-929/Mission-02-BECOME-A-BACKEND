import type { IncomingMessage, ServerResponse } from "node:http";
import { productService } from "../service/product.service";

const productController = (req: IncomingMessage, res: ServerResponse) => {
  // /product -> GET,POST,PUT
  const url = req.url;
  const method = req.method;

  if (url === "/products" && method === "GET") {
    const products= productService()


    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Products retrived succesfully",
        data: products,
     }));
  }
};

export default productController;
