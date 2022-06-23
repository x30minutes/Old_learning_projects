const child_process = require('child_process');

try{
    const result = console.log(child_process.execSync(`du -sh "/c/Users/Hubert Kulicki/Desktop/Programming/websites/9.\ Node\ Project\ -\ File\ Explorer
"`).toString());
    console.log(result);
}catch(err){
    console.log(`Error: ${err}`);
}