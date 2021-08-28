import {
  createReadStream
} from 'fs';
import { argv } from 'process';
const {
  createHmac
} = await import('crypto');

const filename = argv[2];

const hmac = createHmac('sha256', 'a secret');

const input = createReadStream(filename);
input.on('readable', () => {
  // 哈希流只生成
  // 一个元素。
  const data = input.read();
  if (data)
    hmac.update(data);
  else {
    console.log(`${hmac.digest('hex')} ${filename}`);
  }
});