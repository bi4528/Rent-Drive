const hbs = require('hbs');
hbs.registerHelper('helper', (vsebina) => {
  let rezultat ="";
  if(vsebina!=null){
    for (i = 0; i < vsebina.length; i++) {
      rezultat += "<tr class='review'><td class='profile' colspan='2'>";
      rezultat += "<img class='avatar' src='" + vsebina[i].img + "'>";
      rezultat += "<strong>" + vsebina[i].username  +"</strong></td>";
      rezultat += "<td class='stars'><span>" + vsebina[i].rating + "</span></td>";
      rezultat += "<td class='comment'>" + vsebina[i].comment + "</td>"
      rezultat += "<td> <input type='button' class='btn btn-danger delete' value='Delete' owner='" +vsebina[i]._id + "' hidden='true'></input> </td>";
    }
    rezultat += "</tr>";
  }
  return rezultat;
});