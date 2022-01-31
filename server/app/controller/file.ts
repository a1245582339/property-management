import { Controller } from 'egg';
import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
export default class File extends Controller {
  public async upload() {
    const file = this.ctx.request.files[0];
    console.log(file);
    const fileName = Math.random().toString(36).slice(-6) + Date.now() + file.filename;
    const data = readFileSync(file.filepath);
    const base64str = Buffer.from(data).toString('base64');
    const bufferData = Buffer.from(base64str, 'base64');
    const uplaodBasePath = '../../app/public';
    const src = path.join(__dirname, uplaodBasePath, fileName);
    writeFileSync(src, bufferData);
    this.ctx.body = {
      code: 0,
      data: {
        url: '/public/' + fileName,
      },
    };
  }
}
