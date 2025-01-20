import fs from 'fs/promises';
import path from 'path';


const showLog  = async ( {objectsPath, headPath } ) => {
    let currentCommitHash = await fs.readFile(
        headPath,{encoding : 'utf-8'}
    );

    while(currentCommitHash){
        const commitPath  = path.join(objectsPath, currentCommitHash);
        const commitData =  JSON.parse(await fs.readFile(commitPath , {encoding : 'utf-8'}));

        console.log(`Commit: ${currentCommitHash}\nDate: ${commitData.timeStamp}\n\n${commitData.message}\n`);

        currentCommitHash = commitData.parent;
    }

};

export default showLog;

