// src/index.js
import initRepo from './services/initRepo.js';
import addFile from './services/addFile.js';
import commitChanges from './services/commitChanges.js';
import showLog from './services/showLog.js';
import showCommitDiff from './services/showCommitDiff.js';

const groot = async () => {
    const repo = await initRepo();

    return {
        init: () => initRepo(),
        add: (file) => addFile(repo, file),
        commit: (message) => commitChanges(repo, message),
        log: () => showLog(repo),
        show: (commitHash) => showCommitDiff(repo, commitHash),
    };
};

export default groot;
