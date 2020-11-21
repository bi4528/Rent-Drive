const e = require('express');
var fs = require('fs');
var dataJSON = require('../models/avti-seznam.json');
var locationJSON = require('../models/avti-seznam-cords.json');

function isEmpty(str) {
    return (!str || 0 === str.length);
}
function isLater(str1, str2)
{
    return new Date(str1) >= new Date(str2);
}

/* GET home page */
const home = (req, res) => {
    res.render('home', dataJSON);
};

const search = (req, res) => {
    const keyWord= req.query.value;
    const city=req.query.city;
    const dateFrom=req.query.dateFrom;
    const dateTo=req.query.dateTo;
    const category=req.query.category;

    console.log(city+" "+dateFrom+" "+dateTo);

    if(isEmpty(keyWord) && isEmpty(city) && isEmpty(category)){
        dataJSON.filter="<H3>No filter applied</H3>";
        res.render('search',dataJSON);
    }
    else if(!isEmpty(keyWord)){
        newData={
            "title": "Seznam avtomobilov",
            "filter": "<H3>Filtered by keyword: \""+keyWord+"\"</H3>",
            "cars": []
        }

        dataJSON.cars.forEach(function (item, index) {
            if (item.model.toLowerCase().includes(keyWord.toLowerCase()) || item.make.toLowerCase().includes(keyWord.toLowerCase()) ){
                newData.cars.push(item);
            }
        });
        res.render('search',newData);

    }
    else if(!isEmpty(city)){
        newData={
            "title": "Seznam avtomobilov",
            "filter": "<H3>Filtered by city of pick-up: \""+city+"\", date from: \""+dateFrom+"\" and date to: \""+dateTo+"\"</H3>",
            "cars": []
        }
        dataJSON.cars.forEach(function (item, index) {
            //console.log(typeof(item.date[0])+" "+typeof(dateFrom));
            //console.log(item.date[0]+" "+dateFrom);
            if (item.city.localeCompare(city)==0 && isLater(dateFrom, item.date[0]) && isLater(item.date[1], dateTo) ){
                newData.cars.push(item);
            }
        });
        res.render('search',newData);
    }
    else if(!isEmpty(category)){
        newData={
            "title": "Seznam avtomobilov",
            "filter": "<H3>Filtered by category: \""+category.toLowerCase()+"\"</H3>",
            "cars": []
        }
        dataJSON.cars.forEach(function (item, index) {
            //console.log(typeof(item.date[0])+" "+typeof(dateFrom));
            //console.log(item.date[0]+" "+dateFrom);
            if (item.category.localeCompare(category)==0){
                newData.cars.push(item);
            }
        });
        res.render('search',newData);
    }
};

const nearby = (req, res) => {
    //var myJSON = JSON.stringify(dataJSON);

    res.render('nearby',
        {cars: JSON.stringify(locationJSON.cars)});
};

module.exports = {
    home,
    search,
    nearby
};