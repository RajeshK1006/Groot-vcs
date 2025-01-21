import fs from 'fs/promises';
import path from 'path';

const listBranches = async (repoPath) => {

    const branchesDir = path.join(repoPath , '.groot' , 'branches');

    try{
        const branches = await fs.readdir(branchesDir);
        console.log("Available branches: ");
        branches.forEach((branch) => console.log(`- ${branch}`));
    }
    catch(error){
        console.error("Error listing branches: ",error);
    }
};
export default listBranches;