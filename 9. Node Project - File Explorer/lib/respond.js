//require node modules
const url = require('url');
const path = require('path');
const fs = require('fs');
//file imports
const buildBreadcrumb = require('./breadcrumb.js');
const buildMainContent = require('./mainContent.js');
const getMimeType = require('./getMimeType.js');

//static base path: location of your static folder
const staticBasePath = path.join(__dirname, '..', 'static');

//respond to a request
//Following is function passed to createServer used to create the server
const respond = (request, response) => {
    console.log('respond function fires!');
    
    //before working with the pathname you need to decode it
    let pathname = url.parse(request.url, true).pathname;
    
    //if favicon.ico stop
    if(pathname === '/favicon.ico'){
        return false;
    }
    pathname = decodeURIComponent(pathname);
    
    //get the corresponding full static path located in the static folder
    const fullStaticPath = path.join(staticBasePath, pathname);
    
    //Can we find something in fullStaticPath?
    
        //no: send '404: File Not Found!'
    if(!fs.existsSync(fullStaticPath)){
        console.log(`${fullStaticPath} does not exist`);
        response.write('404: File not found!');
        response.end();
        return false;
    }
        //We found something
        //is it a file or directory?
    let stats;    
    try{
        stats = fs.lstatSync(fullStaticPath);
    }catch(err){
        console.log(`lstatSync Error: ${err}`);
    }
            //It is a directory:
    if(stats.isDirectory()){
                //get content from the template server.html
        let data = fs.readFileSync(path.join(staticBasePath, 'project_files/index.html'), 'utf-8');
        
                //build the page title
        let pathElements = pathname.split('/').reverse();
        pathElements = pathElements.filter(element => element !== '');
        let folderName = pathElements[0];
        if (folderName === undefined){
            folderName = 'Home';
        }
        
                //build breadcrumb
        const breadcrumb = buildBreadcrumb(pathname);
        
                //build table rows (main_content)
        const mainContent = buildMainContent(fullStaticPath, pathname);
        
                //fill the template data with: the page title, breadcrumb, and table rows (main_content)
        data = data.replace('page_title', folderName);
        data = data.replace('pathname', breadcrumb);
        data = data.replace('mainContent', mainContent);
        
                //print data to the webpage        
        response.statusCode = 200;
        response.write(data);
        return response.end();
    }

    
            //It is not a directory but not a file either
                //send: '401: Access denied!
    if(!stats.isFile()){
        response.statusCode = 401;
        response.write('401: Acces denied!');
        console.log('not a file');
        return response.end();
    }
            //It is a file
    let fileDetails = {};
    
                //Let's get the file extension
    fileDetails.extname = path.extname(fullStaticPath);
    
    //file size
    let stat;
    try{
        stat = fs.statSync(fullStaticPath);
    }catch(err){
        console.log(`err: ${err}`);
    }
    fileDetails.size = stat.size;
    
                //get the file mime type and add it to the response header
    getMimeType(fileDetails.extname).then(mime => {
        //store headers here
        let head = {};
        let options = {};
        
        //response status code
        let statusCode = 200;
        
        //set "Content-Type" for all file types
        head['Content-Type'] = mime;
        
                //get the file size and add it to the response header
                //pdf file? -> display in browser
        if(fileDetails.extname === '/.pdf'){
            head['Content-Disposition'] = 'inline'; // for it to be shown on webpage
            
//            head['Content-Disposition'] = 'attachment; filename=file.pdf'; //for it to be downloadable
        }
                //audio/video file? -> stream in ranges
        if(RegExp('audio').test(mime) || RegExp('video').test(mime)){
            //header
            head['Accept-Ranges'] = 'bytes';
            
            const range = request.headers.range;
                if(range){
                    const start_end = range.replace(/bytes=/, "").split('-');
                    const start = parseInt(start_end[0]);
                    const end = start_end[1]? parseInt(start_end[1]) : fileDetails.size - 1;
                    // 0 ... last byte
                    
                    //headers
        //          Content-Range
                    
                    head['Content-Range'] = `bytes ${start}-${end} /${fileDetails.size}`;
                    
        //          Content-Lenght
                    head['Content-Length'] = start - begin +1;
                    statusCode = 206;
                    
                    //options
                    options = {start, end};
                }
            }
            
           
                //all other files stream in a normal way
        
        //reading the file using fs.readFile
//        fs.promises.readFile(fullStaticPath, 'utf-8')
//            .then(data => {
//            response.writeHead(statusCode, head);
//            response.write(data);
//            return response.end();
//        })
//        .catch(err => {
//            console.log(error);
//            response.statusCode = 404;
//            response.write('404: File reading error!');
//            return response.end();
//        });
        
        //streaming method:
        const fileStream = fs.createReadStream(fullStaticPath, options);
        
        //Stream chunks to your response object
        response.writeHead(statusCode, head);
        fileStream.pipe(response);
        
        
        //events: close and error
        fileStream.on('close', () => {
            return response.end();
        });
        fileStream.on('error', error => {
            console.log(error);
            response.statusCode = 404;
            response.write('404: File stream error!');
            return response.end();
        });
    })
    .catch(err => {
        response.statusCode = 500; //internal server error
        response.write('500: Internal server error!');
        console.log(`Promise error: ${err}`);
        return response.end();
    });

}

module.exports = respond;