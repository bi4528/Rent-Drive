const hbs = require('hbs');
hbs.registerHelper('helper', (vsebina, vehicleId) => {
  let rezultat ="";
  if(vsebina!=null){
    for (i = 0; i < vsebina.length; i++) {
      rezultat += "<tr class='review'><td class='profile' colspan='2'>";
      rezultat += "<img class='avatar' src='/uploads/" + vsebina[i].img + "'>";
      rezultat += "<strong>" + vsebina[i].username  +"</strong></td>";
      rezultat += "<td class='stars'><span>" + vsebina[i].rating + "</span></td>";
      rezultat += "<td class='comment'>" + vsebina[i].comment + "</td>"
      rezultat += "<td> <input type='button' class='btn btn-danger delete' value='Delete' onclick=\"location.href='/vehicles/"  + vehicleId + "/reviews/" +   vsebina[i]._id + "/delete'\" owner='" + vsebina[i].username + "' ></input> </td>"; //hidden='true'
    }
    rezultat += "</tr>";
  }
  return rezultat;
});