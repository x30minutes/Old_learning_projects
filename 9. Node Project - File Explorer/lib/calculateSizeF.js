//require modules


const calculateSizeF = stats => {
    
    //size in bytes
    const filesizeBytes = stats.size; //bytes
    
    //size in human readable format
    const units = "BKMGT";
    const index = Math.floor(Math.log10(filesizeBytes)/3)
    const filesizeHuman = (filesizeBytes/Math.pow(1000, index)).toFixed(1);
    const unit = units[index];
    const filesize = `${filesizeHuman}${unit}`;
    
    return [filesize, filesizeBytes];
};

module.exports = calculateSizeF;