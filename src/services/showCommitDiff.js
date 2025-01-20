// src/services/showCommitDiff.js
import fs from 'fs/promises';
import path from 'path';

const showCommitDiff = async ({ objectsPath }, commitHash) => {
    const commitPath = path.join(objectsPath, commitHash);
    const commitData = JSON.parse(await fs.readFile(commitPath, { encoding: 'utf-8' }));

    console.log("Changes in the last commit are:");

    for (const file of commitData.files) {
        const filePath = path.join(objectsPath, file.hash);
        const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' });

        console.log(`File: ${file.path}\nContent:\n${fileContent}`);
    }
};

export default showCommitDiff;
