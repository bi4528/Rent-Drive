const hbs = require('hbs');
hbs.registerHelper('ifEquals', (vsebina) => {
  if (vsebina==1 || vsebina=="on")
  return "checked";
  else return "";
});