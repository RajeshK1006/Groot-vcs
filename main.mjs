import { program } from  'commander'
import groot from './src/index.js';

async function initializeRepository(){
    const Groot  = await groot();
    Groot.init();
    console.log("groot Repository initialized successfully");
}

async function addFile(file){
    const Groot = await groot();
    await Groot.add(file);
    console.log(`File ${file} added.`);
}

async function commiting(messages){
    const Groot = await groot();
    await Groot.commit(messages);
    console.log(`Commit made with the message -> "${messages}"`);
}

async function showLog() {
    const Groot = await groot();
    await Groot.log();  // Show log of commits
    console.log("Showing commit logs...");
}

async function showCommitDiff(commitHash) {
    const Groot = await groot();
    await Groot.show(commitHash);  // Show commit diff for a specific commit
    console.log(`Showing commit diff for commit: ${commitHash}`);
}

async function listBranches() {
    const Groot = await groot();  // Initialize the Groot repo
    await Groot.listBranches();  // List all branches
    console.log("Listing all branches...");
}

async function createBranch(branchName) {
    const Groot = await groot();  // Initialize the Groot repo
    await Groot.createBranch(branchName);  // Create a new branch
    console.log(`Branch ${branchName} created.`);
}

async function pushToBranch(message) {
    const Groot = await groot();  // Initialize the Groot repo
    await Groot.push(message);  // Push commit to current branch
    console.log(`Commit pushed with message -> "${message}"`);
}

async function deleteBranch(branchName) {
    const Groot = await groot();  // Initialize the Groot repo
    await Groot.deleteBranch(branchName);  // Delete the specified branch
    console.log(`Branch ${branchName} deleted.`);
}

program
    .command('init')
    .description('Initialize the repository')
    .action(initializeRepository);

program
    .command('add <file>')
    .description('Add a file to the repo')
    .action(addFile);

program
    .command('commit <message>')
    .description('Commit changes with a message')
    .action(commiting);

program
    .command('log')
    .description('Show the commit log')
    .action(showLog);

program
    .command('show <commitHash>')
    .description('Show commit diff for a specific commit')
    .action(showCommitDiff);

program
    .command('list-branches')
    .description('List all branches')
    .action(listBranches);

program
    .command('create-branch <branchName>')
    .description('Create a new branch')
    .action(createBranch);

program
    .command('push <message>')
    .description('Push changes to the current branch')
    .action(pushToBranch);

program
    .command('delete-branch <branchName>')
    .description('Delete a branch')
    .action(deleteBranch);


// Parse the command-line arguments
program.parse(process.argv);