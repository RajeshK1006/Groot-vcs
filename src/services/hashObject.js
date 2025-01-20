import crypto from 'crypto';

const hashObject = (content) =>
    crypto.createHash('sha1').update(content, "utf-8").digest('hex');

export { hashObject };