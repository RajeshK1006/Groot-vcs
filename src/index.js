// src/index.js
import initRepo from './services/initRepo.js';
import addFile from './services/addFile.js';
import commitChanges from './services/commitChanges.js';
import showLog from './services/showLog.js';
import showCommitDiff from './services/showCommitDiff.js';

import createBranch from './services/createBranch.js';
import pushToBranch from './services/pushToBranch.js';
import listBranches from './services/listBranches.js';
import deleteBranch from './services/deleteBranch.js';

const groot = async () => {
    const repo = await initRepo();

    return {
        init: () => initRepo(),
        add: (file) => addFile(repo, file),
        commit: (message) => commitChanges(repo, message),
        log: () => showLog(repo),
        show: (commitHash) => showCommitDiff(repo, commitHash),
        createBranch: (repo, branchName) => createBranch(repo, branchName),
        push: (commitMessage) => pushToBranch(repo, commitMessage),
        listBranches: () => listBranches(repo.grootFolder),
        deleteBranch: (branchName) => deleteBranch(repo, branchName),
    };
};

export default groot;
