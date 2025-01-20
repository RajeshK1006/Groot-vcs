// // you can execute shell script alone from the terminal;
// // to make thsi file an shell shell Script, we can make it as terminal;
// // inorder to do so lets make it as a shabam

// #!/usr/bin/env node


// import path from "path";
// import fs from 'fs/promises';
// import crypto, { hash } from 'crypto';
// import chalk from "chalk";
// import {diffLines} from "diff";
// import { Command } from "commander";
 

// // git uses an SHA-1 HASH to track the changews in the files

// class groot{

//     constructor(repoPath = "."){
//         this.repoPath = path.join(repoPath ,'.groot'); //repository path of our groot
//         this.objectsPath  = path.join(this.repoPath,'objects'); //.groot/objects
//         this.headPath = path.join(this.repoPath , 'HEAD'); //.groot/HEAD
//         this.indexPath = path.join(this.repoPath, 'index');  //.groot/index
//         this.init();
//     }

//     async init(){
//         // fs stands for sile system module
//         await fs.mkdir(this.objectsPath, {recursive : true});
//         try{
//             await fs.writeFile(this.headPath, '' // content you want to write 
//                 ,{flag :'wx'} // write the file if the file exists or else throw an error
//                 ) ;
//             await fs.writeFile(this.indexPath, JSON.stringify([]),{flag:'wx'});
//         }
//         catch(error){
//             console.log("Alreay initialized the .groot folder");
//         }
//     }
//     hashObject(content){
//         return crypto.createHash('sha1').update(content, "utf-8").digest('hex') ;
//     }

//     async add(fileToBeAdded){
//         const fileData = await fs.readFile(fileToBeAdded, {encoding: 'utf-8'});
//         const fileHash = this.hashObject(fileData);
//         console.log(fileHash);

//         // this feature has to be leveld up 
//         // first 2 characters of the hash is to create a folder name
//         // the remainning 38 should be to create a file name

//         // as of now this uses entirely 40 characters to create the file name without the folder

//         const newFileHashedObjectPath = path.join(this.objectsPath, fileHash);
//         await fs.writeFile(newFileHashedObjectPath, fileData);
//         // toDo : adding files to the staging area

//         await this.updateStagingArea(newFileHashedObjectPath,fileHash);
//         console.log(`Added ${fileToBeAdded}`);

//     }

//     async updateStagingArea(filePath, fileHash){
//         const index = JSON.parse(await fs.readFile(this.indexPath, {encoding : "utf-8"}
//         ));
//         index.push({
//             path:filePath ,hash : fileHash
//         });

//         await fs.writeFile(this.indexPath,JSON.stringify(index));
//     }

//     async commit(message){
//         const index = JSON.parse(await fs.readFile(this.indexPath , {encoding : 'utf-8'}));
//         const parentCommit = await this.getCurrentHead();

//         const commitData = {
//             timeStamp : new Date().toString(),
//             message,
//             files: index,
//             parent:parentCommit,
//         };

//         const commitHash = this.hashObject(JSON.stringify(commitData));
//         const commitPath = path.join(this.objectsPath,commitHash);
//         await fs.writeFile(commitPath,JSON.stringify(commitData));
//         await fs.writeFile(this.headPath,commitHash);
//         await fs.writeFile(this.indexPath,JSON.stringify([]));
//         console.log(`Commit successfully create : ${commitHash}`);


//     }

//     async getCurrentHead(){
//         try{
//             return await fs.readFile(this.headPath, {encoding : 'utf-8'});
//         }
//         catch(error){
//             return null;
//         }
//     }

//     async log(){
//         let currentCommitHash = await this.getCurrentHead();
//         while(currentCommitHash){
//             const commitData = JSON.parse(await fs.readFile(path.join(this.objectsPath,currentCommitHash),{
//                 encoding: 'utf-8'
//             }));

//             console.log(`Commit : ${currentCommitHash}\nDate: ${commitData.timeStamp}\n\n${commitData.message}\n\n`);

//             currentCommitHash = commitData.parent;


//         }
//     }


//     async getCommitData(commitHash){
//         const commitPath = path.join(this.objectsPath,commitHash);
//         try{
//             return await fs.readFile(commitPath, {encoding : "utf-8"});

//         }
//         catch(error){
//             console.log("Failed to read the commit data", error);
//             return null;
//         }
//     }


//     // async showCommitDiff(commitHash){
//     //     const commitData = JSON.parse(await this.getCommitData(commitHash));
//     //     if(!commitData){
//     //         console.log("commit not found");
//     //         return ;
//     //     }
//     //     console.log("Changes in the last commit are: ");

//     //     for(const file of commitData.files){
//     //         console.log(`file is: ${file.path}`)
//     //         const fileContent = await this.getFileContent(file.hash);
//     //         console.log(fileContent);

//     //         if(commitData.parent){
//     //             // get the parent commit data
//     //             const parentCommitData = JSON.parse(await this.getCommitData(commitData.parent));
//     //             const getParentFileContent = await this.getParentFileContent(parentCommitData,file.path);
//     //             if(getParentFileContent != undefined){
//     //                 console.log('\nDiff:');
//     //                 const diff = diffLines(getParentFileContent,fileContent);

//     //                 // console.log(diff);

//     //                 diff.forEach(part => {
//     //                     if(part.added){
//     //                         process.stdout.write(chalk.green(part.value));
//     //                     }
//     //                     else if(part.removed){
//     //                         process.stdout.write(chalk.red(part.value));
//     //                     }
//     //                     else{
//     //                         process.stdout.write(chalk.grey(part.value));
//     //                     }
//     //                 });
//     //                 console.log();

//     //             }


//     //         }
//     //         else{
//     //             console.log("first Commit");
//     //         }
//     //     }
//     // }
//     async showCommitDiff(commitHash) {
//         const commitData = JSON.parse(await this.getCommitData(commitHash));
//         if (!commitData) {
//             console.log("Commit not found");
//             return;
//         }
//         console.log("Changes in the last commit are:");
    
//         for (const file of commitData.files) {
//             console.log(`File is: ${file.path}`);
//             const fileContent = await this.getFileContent(file.hash);
//             console.log(fileContent);
    
//             if (commitData.parent) {
//                 // Get the parent commit data
//                 const parentCommitData = JSON.parse(await this.getCommitData(commitData.parent));
//                 const parentFileContent = await this.getParentFileContent(parentCommitData, file.path);
    
//                 if (parentFileContent !== undefined) {
//                     console.log('\nDiff:');
//                     const diff = diffLines(parentFileContent, fileContent);
    
//                     diff.forEach(part => {
//                         if (part.added) {
//                             process.stdout.write(chalk.green(part.value)); // Added content in green
//                         } else if (part.removed) {
//                             process.stdout.write(chalk.red(part.value)); // Removed content in red
//                         } else {
//                             process.stdout.write(chalk.gray(part.value)); // Unchanged content in gray
//                         }
//                     });
//                     console.log(); // Ensure a newline at the end of the diff
//                 } else {
//                     console.log("No parent file content found.");
//                 }
//             } else {
//                 console.log("First commit");
//             }
//         }
//     }
    

//     async getParentFileContent(parentCommitData,filePath){
//         const parentFile = parentCommitData.files.find(file => file.path === filePath);
//         if(parentFile){
//             return await this.getFileContent(parentFile.hash);
//         }
//     }

//     async getFileContent(fileHash){
//         const objectsPath = path.join(this.objectsPath,fileHash);
//         return fs.readFile(objectsPath,{encoding :'utf-8'});
//     }


// }

// // (   async()=> {
// //     const Groot = new groot();
// //     // await Groot.add('sample.txt');
// //     // await Groot.add('sample2.txt');
// //     // await Groot.commit("last commit");
// //     await Groot.showCommitDiff("dfb68c78ac62e53c82fa4e3e428e3a9eb8475a53");
// //     // await Groot.log();

// // })();



// program.command('init').action(async () => {
//     const Groot = new groot();
// });

// program.command('add <file>').action(async (file) => {
//     const Groot = new groot();
//     await Groot.add(file);
// });

// program.command('commit <message>').action(async (message) => {
//     const Groot = new groot();
//     await Groot.commit(message);
// });

// program.command('log').action(async () => {
//     const Groot = new groot();
//     await Groot.log();
// });

// program.command('show <commitHash>').action(async (commitHash) => {
//     const Groot = new groot();
//     await Groot.showCommitDiff(commitHash);
// });

// // console.log(process.argv);
// program.parse(process.argv);
