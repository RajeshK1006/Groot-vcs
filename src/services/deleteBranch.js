import fs from 'fs/promises';
import path from 'path';

const deleteBranch = async (repoPath, branchName) => {
    const branchPath = path.join(repoPath, '.groot', 'branches', branchName);
    const currentBranchFile = path.join(repoPath, '.groot', 'currentBranch');  // Define the currentBranchFile path

    try {
        // Read the current active branch
        const currentBranchName = await fs.readFile(currentBranchFile, { encoding: 'utf-8' });

        // If the branch being deleted is the current active branch, warn the user
        if (branchName === currentBranchName.trim()) {
            console.log(`Cannot delete the current branch: ${branchName}. Please switch to another branch first.`);
            return;
        }

        // Check if the branch exists
        try {
            await fs.access(branchPath);
        } catch (error) {
            console.log(`Branch '${branchName}' does not exist.`);
            return;
        }

        // Delete the branch
        await fs.rm(branchPath, { recursive: true, force: true });
        console.log(`Deleted branch: ${branchName}`);
    } catch (error) {
        console.error("Error deleting the branch:", error);
    }
};

export default deleteBranch;
