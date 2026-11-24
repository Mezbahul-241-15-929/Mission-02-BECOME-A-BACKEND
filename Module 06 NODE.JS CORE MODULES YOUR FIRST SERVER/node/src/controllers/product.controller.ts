import type { IncomingMessage, ServerResponse } from "node:http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/products";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  // /product -> GET,POST,PUT
  const url = req.url;
  const method = req.method;
  //   console.log(url); //products
  const urlParams = url?.split("/");
  //console.log(urlParams); //[ '', 'products' ]
  const id =
    urlParams && urlParams[1] == "products" ? Number(urlParams[2]) : null;
  //console.log(id); //http://localhost:5000/products/1 output: 1

  // GET all Product
  if (url === "/products" && method === "GET") {
    const products = productService();

    if (!products) {
      return sendResponse(res, false, 404, "Products not found");
    }

    try {
      sendResponse(res, true, 200, "Products retrieved successfully", products);
    } catch (error) {
      sendResponse(res, false, 500, "Internal Server error");
    }
  }

  // GET Single Product
  if (urlParams && urlParams[1] === "products" && id && method === "GET") {
    const products=productService();
    const product=products.find((p:IProduct)=>p.id===id);

    if (!product) {
      return sendResponse(res, false, 404, "Product not found");
    }

    try {
      sendResponse(res, true, 200, "Product retrieved successfully", product);
    } catch (error) {
      sendResponse(res, false, 500, "Internal Server error");
    }
  }

  // Post Method:
  else if (method === "POST" && url === "/products") {
    const body = await bodyParser(req);
    // console.log(body);
    const newProduct = {
      id: Date.now(),
      ...body,
    };

    console.log(newProduct);

    const products = productService();

    products.push(newProduct);

    createProduct(products);

    res.writeHead(201, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products create successfully",
        data: newProduct,
      }),
    );
  }

  // Put Method:
  else if (method === "PUT" && url !== null) {
    const body = await bodyParser(req);
    // console.log(body);
    const products = productService();

    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "not found",
          // data: newProduct,
        }),
      );
    }
    // console.log(products[index]);
    products[index] = { id: products[index].id, ...body };
    createProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products update successfully",
        data: products[index],
      }),
    );
  }

  // Delete Method:
  else if (method === "DELETE" && url !== null) {
    // console.log(body);
    const products = productService();
    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
        }),
      );
    }
    // console.log(products[index]);
    products.slice(index, 1);

    createProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products deleted successfully",
      }),
    );
  }
};

export default productController;
