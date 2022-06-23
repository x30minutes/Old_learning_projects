//require modules
const {execSync} = require('child_process');

const calculateSizeD = (itemFullStaticPath) => {
    //escape spaces, tabs, etc.
    const itemFullStaticPathCleaned = itemFullStaticPath.replace(/\s/g,'\ ');
    
    const commandOutput = execSync(`du -sh "${itemFullStaticPathCleaned}"`).toString();
    
    //remove spaces, tabs, etc. (use for linux, mac)
//    let filesize = commandOutput.split(/\s/g,'');
    
    //split filesize using the '/' separator (Linux, Mac)
    //filesize = filesize.split('/');
    
    //split filesize for Windows paths
    let filesize = commandOutput.split("\t", 1);
    
    //human size is the first item of the array
    filesize = filesize[0];
    
    //unit \d gets rid of digits, \. gets rid of dots
    const filesizeUnit = filesize.replace(/\d|\./g, '');
    
    //size number
    const filesizeNumber = parseFloat(filesize.replace(/[a-z]/i, ''));
    
    const units = "BKMGT";
    
    const filesizeBytes = filesizeNumber * Math.pow(1000, units.indexOf(filesizeUnit));
    
    
    
    console.log(filesizeNumber);
    console.log(filesizeBytes);
    
//    const filesizeBytes = 1;
    
    return [filesize, filesizeBytes];
};

module.exports = calculateSizeD;