const rAmp = /&/g;
const rLt = /</g;
const rGt = />/g;
const rApos = /'/g;
const rQuot = /"/g;
const hChars = /[&<>"']/;

const sanitize = ({str}) => {
  if (hChars.test(String(str)))
    return str
      .replace(rAmp, '&amp;')
      .replace(rLt, '&lt;')
      .replace(rGt, '&gt;')
      .replace(rApos, '&apos;')
      .replace(rQuot, '&quot;');
  return str;
}

module.exports = {
  sanitize
}
