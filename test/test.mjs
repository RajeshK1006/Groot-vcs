// main.js
import groot from './src/index.js';

(async () => {
    const Groot = await groot();

    await Groot.init();                    // Initialize repo
    await Groot.add('sample.txt');          // Add a file
    await Groot.commit("Initial commit");   // Commit changes
    await Groot.log();                      // Show log of commits
    await Groot.show('b1379ef12e78215c4e8e1c4fedcef1f846383710');        // Show commit diff for a specific commit
})();
