import fs from 'fs/promises';
import path from 'path';

const initBranch = async (repoPath) => {
    const branchesDir = path.join(repoPath, '.groot','branches');
    const currentBranchFile  = path.join(repoPath, '.groot', 'currentBranch');
    const mainBranchPath = path.join(branchesDir,'main');


    try{
        // create the branches folder

        await fs.mkdir(branchesDir ,{recursive : true});

        //  Initialize the main branch
        await fs.mkdir(mainBranchPath , {recursive : true});
        console.log('Initialized default "main" branch.');
        // set currrent branc to main

        await fs.writeFile(currentBranchFile, 'main');
        console.log('Set current branch to "main".');



    }

    catch (error){
        
        console.error('Error initializing the branches: ',error);

    }
}

export default initBranch;