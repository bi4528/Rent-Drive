const hbs = require('hbs');
hbs.registerHelper('ifEquals', (vsebina) => {
  if (vsebina)
  return "checked";
  else return "";
});