const hbs = require('hbs');
hbs.registerHelper('ifEquals', (vsebina) => {
    if (vsebina=="on")
  return "checked";
  else return "";
});