
const fs = require('fs');

//callback asynchronous function

//arguments -> (path,callback function)
fs.readFile('./docs/blog1.txt', (err,data)=>{
    if(err){
        console.log(err);
    }
    //console.log(data);  //buffer is a package of data being sent when we read this file
    console.log(data.toString());
});

// as javascript  asynchronous wr work krto..tr
//file madhla data read karayla vel lagto So, aadhi hi khalchi line execute houn jail mean time madhe
console.log('last line....');


//write File
fs.writeFile('./docs/blog1.txt', 'hello world', ()=>{
     console.log("file is written");
})

//blog2 exist navhti tr new create krun lihun takle apoaap tyane
fs.writeFile('./docs/blog2.txt', 'hello Vaidehi', ()=>{
    console.log("file is written");
})


//directory,folder create krne
//ani jr he code parat lihila ani run kela tr yeil folder already exists
if(!fs.existsSync('./assets')){
   
    fs.mkdir('./assets', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('folder created');
    });
}
else{
    fs.rmdir('./assets', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('folder deleted');
    })
}


//deleting filess

if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('file deleted...');
    })
}



