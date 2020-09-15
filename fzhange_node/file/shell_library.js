var shell = require('shelljs');
const path = require('path');
 
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

shell.rm('-rf',path.join(__dirname,"./outCDN"));
shell.mkdir('-p',path.join(__dirname,"./outCDN"));
shell.mv(path.join(__dirname,"./dist"),path.join(__dirname,"./outCDN"));