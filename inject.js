const { parse } = require('node-html-parser');
const fs = require('fs');

function inject(dir, hostFileName, sources) {
  const htmlFile = fs.readFileSync(`${dir}/${hostFileName}`, 'utf8');
  const html = parse(htmlFile);
  const body = html.querySelector('body');

  sources.forEach((source) => {
    body.appendChild(_getScriptNode(source));
  });

  return html.outerHTML;
}

function _getScriptNode(src) {
  return parse(`<script type="text/javascript" src="${src}"></script>`);
}

module.exports = { inject };
