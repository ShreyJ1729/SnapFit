import './Wardrobe.css';

function Wardrobe() {


  return (
    <div class="scrollmenu">
      
    </div>
  );
}

const fs = require('fs');
function formatFilesInDirectory(dir) {
  var ret

  fs.readdirSync(dir).forEach(file => {
    ret += <img src={file}></img>
  });
  return ret
}

export default Wardrobe;