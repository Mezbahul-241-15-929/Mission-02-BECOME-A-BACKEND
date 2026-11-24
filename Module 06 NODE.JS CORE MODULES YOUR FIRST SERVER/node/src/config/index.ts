import dotenv from "dotenv"
import { prototype } from "events";
import path from "path"

dotenv.config({path: path.resolve(process.cwd(),".env")});

const config={
    port: Number(process.env.PORT),
};

export default config;