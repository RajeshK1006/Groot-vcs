import fs from 'fs/promises';
import path from 'path';
import commitChanges from './commitChanges.js';


const pushToBranch = async (repoPath, commitMessage) => {
    const branchesDir = path.join(repoPath, '.groot', 'branches');
    const currentBranchFile = path.join(repoPath, '.groot', 'currentBranch');
    const objectsDir = path.join(repoPath, '.groot', 'objects');
    const indexPath = path.join(repoPath, '.groot', 'index');
    const headPath = path.join(repoPath, '.groot', 'HEAD');

    try {
        // Get the current branch name
        const currentBranchName = await fs.readFile(currentBranchFile, 'utf-8');
        const currentBranchPath = path.join(branchesDir, currentBranchName.trim());

        // Ensure the branch directory exists
        await fs.mkdir(currentBranchPath, { recursive: true });

        // Commit changes as per the current branch
        await commitChanges({ objectsPath: objectsDir, indexPath, headPath }, commitMessage);

        // Now push the commit to the current branch
        const commitHash = await fs.readFile(headPath, 'utf-8');  // Fetch the latest commit hash

        // Store the commit in the branch folder
        const branchCommitPath = path.join(currentBranchPath, commitHash);
        await fs.writeFile(branchCommitPath, JSON.stringify({ commitHash, commitMessage, timeStamp: new Date().toISOString() }));

        console.log(`Pushed commit to branch "${currentBranchName.trim()}": ${commitHash}`);
    } catch (error) {
        console.error("Error pushing commit:", error);
    }
};

export default pushToBranch;
