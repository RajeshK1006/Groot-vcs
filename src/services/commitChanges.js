// src/services/commitChanges.js
import fs from 'fs/promises';
import path from 'path';
import { hashObject } from './hashObject.js';

const commitChanges = async ({ objectsPath, indexPath, headPath }, message) => {
    const index = JSON.parse(await fs.readFile(indexPath, { encoding: 'utf-8' }));
    const parentCommit = await fs.readFile(headPath, { encoding: 'utf-8' });
    const commitData = {
        timeStamp: new Date().toString(),
        message,
        files: index,
        parent: parentCommit || null,
    };

    const commitHash = hashObject(JSON.stringify(commitData));
    const commitPath = path.join(objectsPath, commitHash);

    await fs.writeFile(commitPath, JSON.stringify(commitData));
    await fs.writeFile(headPath, commitHash);
    await fs.writeFile(indexPath, JSON.stringify([]));

    console.log(`Commit successfully created: ${commitHash}`);
};

export default commitChanges;
