// src/services/initRepo.js
import fs from 'fs/promises';
import path from 'path';

const initRepo = async (repoPath = ".") => {
    const grootFolder = path.join(repoPath, '.groot');
    const objectsPath = path.join(grootFolder, 'objects');
    const headPath = path.join(grootFolder, 'HEAD');
    const indexPath = path.join(grootFolder, 'index');

    await fs.mkdir(objectsPath, { recursive: true });
    try {
        await fs.writeFile(headPath, '', { flag: 'wx' });
        await fs.writeFile(indexPath, JSON.stringify([]), { flag: 'wx' });
        console.log("Initialized .groot folder");
    } catch (error) {
        console.log("Already initialized the .groot folder");
    }

    return { grootFolder, objectsPath, headPath, indexPath };
};

export default initRepo;
