var fs = require("fs")

//console.log("Going to read directory /");

var dirsChecked = 1;

function searchDir(root, level) {
  //dirsChecked++;
  fs.readdir(root, function (err, files) {
    if (files === null || files === undefined)
      return;
    files.forEach(function (file) {
      var path = root === '/' ? root + file : root + '/' + file;
      fs.stat(path, function (err, stats) {
        if (stats === undefined || stats === null) {
          //console.log(root, file, level, 'stats undefined')
          return;
        }
        //console.log(stats);
        if (!stats || !stats.isDirectory())
          return;
        dirsChecked++;
        if (dirsChecked % 1000 === 0)
          console.log('checked:', dirsChecked, '@', level);
        if (file.startsWith('foto')) {
          console.log(path, '@', level);
        }
        else if (level < 4) {
          searchDir(path, level + 1);
        }
      })
    })
  })
}

searchDir('/', 1);

console.log('done', dirsChecked);

/*
fs.readdir("/",function(err, files){
   if (err) {
       return console.error(err);
   }
   files.forEach( function (file){
       console.log( file );
   });
});

var count = 5;
console.log('count: %d', count);
*/
