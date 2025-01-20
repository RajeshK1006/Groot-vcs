import fs from 'fs/promises'
import path from 'path';
import { hashObject } from './hashObject.js';


const addFile = async ({objectsPath, indexPath }, fileToBeAdded) => {
    const fileData = await fs.readFile(fileToBeAdded , {encoding : "utf-8"});
    const fileHash = hashObject(fileData);

    const newFileHashedObjectPath = path.join(objectsPath,fileHash);
    await fs.writeFile(newFileHashedObjectPath, fileData);
    
    const index = JSON.parse(await fs.readFile(indexPath , { encoding : 'utf-8'}));
    index.push({ path: fileToBeAdded ,hash :fileHash});
    await fs.writeFile(indexPath,JSON.stringify(index));

    console.log(`Added ${fileToBeAdded}`);
};

export default addFile;