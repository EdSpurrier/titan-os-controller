const fs = require('fs-extra');

const { exec } = require("child_process");
var rimraf = require("rimraf");


//  -----------------------------------------
//  Copy IOHOOK into node_modules folder....
const srcDir = `./installer/packages/iohook/builds`;
const destDir = `./node_modules/iohook/builds`;
                                 
// To copy a folder or file, select overwrite accordingly
try {
    console.log('|=============================|')
    console.log('Installing iohook Packages...')
    fs.copySync(srcDir, destDir, { overwrite: true|false })
 
    console.log('Complete.')
    console.log('|=============================|')
} catch (err) {
  console.error(err)
}
//  -----------------------------------------

rimraf("./TitanCore", function () { 
    console.log("./TitanCore - Removed."); 

    exec("git clone git@github.com:EdSpurrier/TitanCore.git", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);

    
        exec('npm install --prefix TitanCore/ ', (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);

    
            exec('npm start --prefix TitanCore/ ', (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);

                exec('npm install', (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                });
            });
        });
    });


});
