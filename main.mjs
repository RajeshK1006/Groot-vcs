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

// Parse the command-line arguments
program.parse(process.argv);