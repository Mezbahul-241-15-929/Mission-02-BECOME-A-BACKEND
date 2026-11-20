import type { IncomingMessage, ServerResponse } from "node:http";
import { productService } from "../service/product.service";
import type { IProduct } from "../types/products";

const productController = (req: IncomingMessage, res: ServerResponse) => {
  // /product -> GET,POST,PUT
  const url = req.url;
  const method = req.method;
  //   console.log(url); //products
  const urlParams = url?.split("/");
  //console.log(urlParams); //[ '', 'products' ]
  const id =
    urlParams && urlParams[1] == "products" ? Number(urlParams[2]) : null;
  //console.log(id); //http://localhost:5000/products/1 output: 1

  if (url === "/products" && method === "GET") {
    const products = productService();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrived succesfully",
        data: products,
      }),
    );
  } else if (method === "GET" && id !== null) {
    const products = productService();
    const product= products.find((p:IProduct)=> p.id ===id);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrived succesfully",
        data: product,
      }),
    );
  }
};

export default productController;
