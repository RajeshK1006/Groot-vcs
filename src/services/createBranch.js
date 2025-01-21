import fs from 'fs/promises';
import path from 'path';

const createBranch = async (repoPath = ".", branchName) => {
    const branchesDir = path.join(repoPath, '.groot', 'branches');
    const currentBranchFile = path.join(repoPath , '.groot', 'currentBranch');
    // const currentBranchName = await fs.readFile(currentBranchFile, {encoding : 'utf-8'});


    let currentBranchName;
    try{
        currentBranchName = await fs.readFile(currentBranchFile, { encoding : 'utf-8'});
    }
    catch(error){
        console.log("Error reading current branch: " ,error);
    }

    const currentBranchPath = path.join(branchesDir , currentBranchName.trim());
    const newBranchPath = path.join(branchesDir, branchName);

    try{
        // Check if the new branch already exists
        try {
            await fs.access(newBranchPath);
            console.log(`Branch '${branchName}' already exists.`);
            return;
        } catch (error) {
            // The branch does not exist, proceed with creation
            await fs.cp(currentBranchPath, newBranchPath, { recursive: true });
            console.log(`Created new branch: ${branchName}`);
    }
}

    catch(error){

        console.log('Error creating branch: ', error);
    }

};

export default createBranch;