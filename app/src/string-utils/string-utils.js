export default {
  collapseWhitespaces,
  capitalizeFirstLetter,
  isEmpty,
  trim
};

function collapseWhitespaces (string) {
  return string.replace(/\s+/g, ' ');
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}

function isEmpty (string) {
  return string.length === 0;
}

function trim (string) {
  return string.trim();
}
