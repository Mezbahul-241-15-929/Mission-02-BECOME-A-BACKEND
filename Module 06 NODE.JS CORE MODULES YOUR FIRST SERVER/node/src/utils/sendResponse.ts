import type { ServerResponse } from "node:http";

export const sendResponse = (
  res: ServerResponse,
  success: boolean,
  statusCode: number,
  message: string,
  data?: any,
) => {
  const response = {
    success,
    message,
    data,
  };
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(
    JSON.stringify(response),
  );
};
