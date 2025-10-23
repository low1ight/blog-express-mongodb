import fs from 'fs';
import path from "node:path";

const filePath = path.join(process.cwd(), 'public', 'swagger-styles.css');

const myCss = fs.readFileSync(filePath, 'utf8');

console.log(myCss);


export const swaggerOptions = {
    customCss:myCss,
};