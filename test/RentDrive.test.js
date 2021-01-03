(async function EduGeoCache() {
  // Knjižnice
  const { exec } = require("child_process");
  const { describe, it, after, before } = require("mocha");
  const { Builder, By, until } = require("selenium-webdriver");
  const chrome = require("selenium-webdriver/chrome");
  const expect = require("chai").expect;

  // Parametri
  let aplikacijaUrl = "https://rentdrive-sp.herokuapp.com/"; //"http://localhost:4200/"
  let apiUrl = "http://localhost:3000/"; //Na koncu bo vse na url produkcije
  let seleniumStreznikUrl = "http://localhost:4444/wd/hub";
  let brskalnik, jwtZeton;
  /*
  const axios = require('axios').create({
    baseURL: aplikacijaUrl + "api/",
    timeout: 5000
  });
  */
  const axios = require('axios').create({
    baseURL: aplikacijaUrl + "api/",
    timeout: 5000
  });


  // Obvladovanje napak
  process.on("unhandledRejection", (napaka) => {
    console.log(napaka);
  });

  // Počakaj določeno število sekund na zahtevani element na strani
  let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
    await brskalnik.wait(() => {
      return brskalnik.findElements(By.xpath(xpath)).then(elementi => {
        return elementi[0];
      });
    }, casVS * 1000, `Stran se ni naložila v ${casVS} s.`);
  };

  try {

    before(() => {
      brskalnik = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options()
          .addArguments("start-maximized")
          .addArguments("disable-infobars")
          .addArguments("allow-insecure-localhost")
          .addArguments("allow-running-insecure-content")
        )
        .usingServer(seleniumStreznikUrl)
        .build();
    });

    describe("Register", function () {
      this.timeout(30 * 1000);
      before(() => { brskalnik.get(aplikacijaUrl); });

      it("Go to register", async function () {
        await pocakajStranNalozena(brskalnik, 40, "//h4");
        let povezava = await brskalnik.findElement(
          By.xpath("//a[contains(text(), 'Register')]"));
        expect(povezava).to.not.be.empty;
        await povezava.click();
      });

      it("Input the new user data in register form", async function () {
        await pocakajStranNalozena(brskalnik, 10,
          "//a[contains(text(), 'Back to homepage')]");
        let name = await brskalnik.findElement(By.css("input[name='firstname']"));
        expect(name).to.not.be.empty;
        name.sendKeys("Chuck");
        let lastname = await brskalnik.findElement(By.css("input[name='lastname']"));
        expect(lastname).to.not.be.empty;
        lastname.sendKeys("Noris");
        let email = await brskalnik.findElement(
          By.css("input[name='email']"));
        expect(email).to.not.be.empty;
        email.sendKeys("chucknoris@gmail.com");
        let username = await brskalnik.findElement(By.css("input[name='username']"));
        expect(username).to.not.be.empty;
        username.sendKeys("chuckchuck");
        let password = await brskalnik.findElement(By.css("input[name='password']"));
        expect(password).to.not.be.empty;
        password.sendKeys("Test123#");
        let repeatPassword = await brskalnik.findElement(By.css("input[name='repeat-password']"));
        expect(repeatPassword).to.not.be.empty;
        repeatPassword.sendKeys("Test123#");
        let gumbPrijava = brskalnik.findElement(
          By.xpath("//input[@type='submit']"));
        await gumbPrijava.click();
      });

      context("Check is Chuck is really logged in now", function () {
        it("check if navbar has changed", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//h4");
          let myProfileButton = await brskalnik.findElement(
            By.xpath("//a[contains(text(), 'My profile')]"));
          expect(myProfileButton).to.not.be.empty;
        });

        it("go to my_profile", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//h4");
          let myProfileButton = await brskalnik.findElement(
            By.xpath("//a[contains(text(), 'My profile')]"));
          expect(myProfileButton).to.not.be.empty;
          await myProfileButton.click();
          await pocakajStranNalozena(brskalnik, 40, "//h2[contains(text(), 'My vehicles')]");
        });
      });
    });

    describe("List of cars", function () {
      this.timeout(30 * 1000);
      before(() => { brskalnik.get(aplikacijaUrl); });

      it("number of cars on search", async () => {
        await pocakajStranNalozena(brskalnik, 40, "//h4");
        let povezava = await brskalnik.findElement(
          By.xpath("//a[contains(text(), 'Search')]"));
        expect(povezava).to.not.be.empty;
        await povezava.click();

        await pocakajStranNalozena(brskalnik, 10, "//h4");
        let cars = await brskalnik.findElements(By.css(".card"));
        expect(cars).to.be.an("array").to.have.lengthOf(12);
      });


      it("write toyota supra and expect 1 result", async function () {
        let searchBar = await brskalnik.findElement(By.css("input[name='Search']"));
        expect(searchBar).to.not.be.empty;
        searchBar.sendKeys("Toyota Supra");

        let gumb = await brskalnik.findElement(
          By.xpath("//button[contains(text(), 'Search')]"));

        await gumb.click();
        //await pocakajStranNalozena(brskalnik, 10, "//h3[contains(text(), 'Filtered by keyword: \"Tesla\"')]");
        await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Book for only 139')]");
        let cars = await brskalnik.findElements(By.css(".card"));
        expect(cars).to.be.an("array").to.have.lengthOf(1);
      });


    });

    describe("Car details", function () {
      this.timeout(30 * 1000);
      before(() => { brskalnik.get(aplikacijaUrl + '/search?page=1'); });


      it("choose Tesla Model 3", async function () {
        await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Book for only 85')]");
        let povezava = await brskalnik.findElement(
          By.xpath("//a[contains(text(), 'Book for only 85')]"));
        expect(povezava).to.not.be.empty;
        await povezava.click();
      });

      context("car details validation", function () {
        it("make and model", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//h2");
          let naslov = await brskalnik.findElement(By.css(".car-name"));
          expect(naslov).to.not.be.empty;
          expect(await naslov.getText()).to.be.equal("Tesla Model 3 2019");
        });

        it("vehicle features", async function () {
          let typeoffuel = await brskalnik.findElement(
            By.xpath("//div[contains(text(), 'Electric')]"));
          expect(typeoffuel).to.not.be.empty;
          expect(await typeoffuel.getText())
            .to.be.equal("Electric");

          let maxspeed = await brskalnik.findElement(
            By.xpath("//div[contains(text(), '209')]"));
          expect(maxspeed).to.not.be.empty;
          expect(await maxspeed.getText())
            .to.be.equal("209 km/h");

          let acceleration = await brskalnik.findElement(
            By.xpath("//div[contains(text(), '9 s')]"));
          expect(acceleration).to.not.be.empty;
          expect(await acceleration.getText())
            .to.be.equal("9 s (0-60 km/h)");

          let hp = await brskalnik.findElement(
            By.xpath("//div[contains(text(), '450')]"));
          expect(hp).to.not.be.empty;
          expect(await hp.getText())
            .to.be.equal("450 kW");

          let consumption = await brskalnik.findElement(
            By.xpath("//div[contains(text(), '6.8')]"));
          expect(consumption).to.not.be.empty;
          expect(await consumption.getText())
            .to.be.equal("6.8 l");

          let seats = await brskalnik.findElement(
            By.xpath("//div[contains(text(), '5 seats')]"));
          expect(seats).to.not.be.empty;
          expect(await seats.getText())
            .to.be.equal("5 seats");

          let doors = await brskalnik.findElement(
            By.xpath("//div[contains(text(), '4 doors')]"));
          expect(doors).to.not.be.empty;
          expect(await doors.getText())
            .to.be.equal("4 doors");

          let luggage = await brskalnik.findElement(
            By.xpath("//div[contains(text(), '425 l')]"));
          expect(luggage).to.not.be.empty;
          expect(await luggage.getText())
            .to.be.equal("425 l");

          let minage = await brskalnik.findElement(
            By.xpath("//div[contains(text(), '18')]"));
          expect(minage).to.not.be.empty;
          expect(await minage.getText())
            .to.be.equal("18 (minimum age)");
        });

        it("pickup location", async function () {
          let naslov = await brskalnik.findElement(By.css("#cars"));
          expect(naslov).to.not.be.empty;
          expect(await naslov.getText()).to.be.equal("Kolodvorska 15, 1000 Ljubljana");
        });
      });

      context("reviews validation", function () {

        it("number of reviews", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//table");
          let reviews = await brskalnik.findElements(
            By.xpath("//tr[@class='review']")
          );
          expect(reviews).to.not.be.empty;
          console.log(reviews);
          expect(reviews).to.be.an("array").to.have.lengthOf(4);
        });
        it("review content", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//table");
          let review = await brskalnik.findElements(By.css(".comment"));
          expect(review).to.not.be.empty;
          expect(await review[3].getText()).to.be.equal("The car is pure genius.");
        });

      });

      context("Post a review", function () {
        it("show form", async function () {
          let prikaziObrazec = brskalnik.findElement(
            By.xpath("//input[@value='Add review']"));
          await prikaziObrazec.click();
        });

        it("fill in form for review and submit it", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//h2[contains(text(), 'Leave your review:')]");
          let desc = await brskalnik.findElement(By.css("textarea[name='comment']"));
          expect(desc).to.not.be.empty;
          desc.sendKeys("Chuck Noris approves!");

          let rating = await brskalnik.findElement(By.css("input[value='1']"));
          expect(rating).to.not.be.empty;
          await rating.click();

          let gumb = brskalnik.findElement(
            By.xpath("//input[@name='postReview']"));
          expect(gumb).to.not.be.empty;
          await gumb.click();
        });

        it("added review actually exists", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//td[contains(text(), 'Chuck Noris approves!')]");
          let novi_komentar = await brskalnik.findElement(By.xpath("//td[contains(text(), 'Chuck Noris approves!')]"));
          expect(novi_komentar).to.not.be.empty;
        });

      });

      context("Delete the review", function () {
        it("delete the new review", async function () {
          let gumb = await brskalnik.findElement(By.xpath("//input[@value='Delete']"));
          expect(gumb).to.not.be.empty;
          await gumb.click();
        });

        //nasljedni test ne dela ker ne vem kateri await naj napisem da bi chrome pocakal da se review izbrise
        /*it("check if the new review has been deleted", async function() {
          let novi_komentar=await brskalnik.findElements(By.xpath("//strong[contains(text(), 'chuckchuck')]"));
          expect(novi_komentar).to.be.empty;
        });*/

      });

    });

    describe("Publish a car", function () {
      this.timeout(30 * 1000);
      before(() => { brskalnik.get(aplikacijaUrl); });

      it("Go to list your car", async function () {
        await pocakajStranNalozena(brskalnik, 40, "//h4");
        let povezava = await brskalnik.findElement(
          By.xpath("//a[contains(text(), 'List your car')]"));
        expect(povezava).to.not.be.empty;
        await povezava.click();
      })

      it("Input vehicle data", async function () {
        await pocakajStranNalozena(brskalnik, 10,
          "//h2[contains(text(), 'Publish your vehicle')]");
        let make = await brskalnik.findElement(By.css("input[name='make']"));
        expect(make).to.not.be.empty;
        make.sendKeys("Ford");
        let model = await brskalnik.findElement(By.css("input[name='model']"));
        expect(model).to.not.be.empty;
        model.sendKeys("Focus");


        //await brskalnik.findElement(By.css("select[name='typeoffuel']")).click();
        //await brskalnik.findElement(By.xpath("//select[name='typeoffuel']/option[1]")).click();

        //let category = await brskalnik.findElement(By.css("select[name='category']"));
        //expect(category).to.not.be.empty;
        //category.selectByIndex(1);
        let hp = await brskalnik.findElement(By.css("input[name='hp']"));
        expect(hp).to.not.be.empty;
        hp.sendKeys("130");
        let maxspeed = await brskalnik.findElement(By.css("input[name='maxspeed']"));
        expect(maxspeed).to.not.be.empty;
        maxspeed.sendKeys("210");
        let acceleration = await brskalnik.findElement(By.css("input[name='acceleration']"));
        expect(acceleration).to.not.be.empty;
        acceleration.sendKeys("9.5");
        let consumption = await brskalnik.findElement(By.css("input[name='consumption']"));
        expect(consumption).to.not.be.empty;
        consumption.sendKeys("9.5");
        let seats = await brskalnik.findElement(By.css("input[name='seats']"));
        expect(seats).to.not.be.empty;
        seats.sendKeys("5");
        let doors = await brskalnik.findElement(By.css("input[name='doors']"));
        expect(doors).to.not.be.empty;
        doors.sendKeys("5");
        let luggage = await brskalnik.findElement(By.css("input[name='luggage']"));
        expect(luggage).to.not.be.empty;
        luggage.sendKeys("450");
        //let minage = await brskalnik.findElement(By.css("select[name='minage']"));
        //expect(minage).to.not.be.empty;
        //minage.selectByIndex(1);
        /*let AirConditioning = await brskalnik.findElement(By.css("input[name='AirConditioning']"));
        expect(AirConditioning).to.not.be.empty;
        AirConditioning.click();*/
        let description = await brskalnik.findElement(By.css("textarea[name='description']"));
        expect(description).to.not.be.empty;
        description.sendKeys("You have never seen a car like this");
        let addres = await brskalnik.findElement(By.css("input[name='addres']"));
        expect(addres).to.not.be.empty;
        addres.sendKeys("Best Street in the world");
        let city = await brskalnik.findElement(By.css("input[name='city']"));
        expect(city).to.not.be.empty;
        city.sendKeys("Best-City");
        let zip = await brskalnik.findElement(By.css("input[name='zip']"));
        expect(zip).to.not.be.empty;
        zip.sendKeys("1000");
        let country = await brskalnik.findElement(By.css("input[name='country']"));
        expect(country).to.not.be.empty;
        country.sendKeys("ChucksCountry");
        let price = await brskalnik.findElement(By.css("input[name='price']"));
        expect(price).to.not.be.empty;
        price.sendKeys("999");
        let dateFrom = await brskalnik.findElement(By.css("input[name='datefrom']"));
        expect(dateFrom).to.not.be.empty;
        dateFrom.sendKeys("10-10-2021");
        let dateTo = await brskalnik.findElement(By.css("input[name='dateto']"));
        expect(dateTo).to.not.be.empty;
        dateTo.sendKeys("12-12-2021");

        let selects = await brskalnik.findElements(By.css("option:nth-child(1)"));
        selects[0].click();
        selects[1].click();
        selects[2].click();

        let gumbPrijava = brskalnik.findElement(
          By.xpath("//input[@type='submit']"));
        await gumbPrijava.click();
        await pocakajStranNalozena(brskalnik, 40, "//span[contains(text(), 'Category')]");
      });

      it("check if the car published is in my profile", async function () {
        await pocakajStranNalozena(brskalnik, 40, "//h4");
        let myProfileButton = await brskalnik.findElement(
          By.xpath("//a[contains(text(), 'My profile')]"));
        expect(myProfileButton).to.not.be.empty;
        myProfileButton.click();

        await pocakajStranNalozena(brskalnik, 40, "//h5[contains(text(), 'Ford')]");
        let make = await brskalnik.findElement(By.xpath("//h5[contains(text(), 'Ford')]"));
        expect(make).to.not.be.empty;
      });

    });
    
    describe("Edit profile and favourite a car", function() {
      this.timeout(30 * 1000);
      before(() => { brskalnik.get(aplikacijaUrl); });

      context("edit my profile", function() {
        it("go to my profile and click on button edit", async function(){ 
          await pocakajStranNalozena(brskalnik, 40, "//h4");
          let povezava = await brskalnik.findElement(
            By.xpath("//a[contains(text(), 'My profile')]"));
          expect(povezava).to.not.be.empty;
          await povezava.click();
          await pocakajStranNalozena(brskalnik, 40, "//span[contains(text(), 'Chuck')]");

          brskalnik.findElement(
            By.xpath("//button[contains(text(), 'Edit')]")).click();
        });

        it("fill in form - change firstname and lastname", async function(){ 
          await pocakajStranNalozena(brskalnik, 40, "//h2[contains(text(), 'Edit')]");
          let name = await brskalnik.findElement(By.css("input[name='firstname']"));
          expect(name).to.not.be.empty;
          name.clear();
          name.sendKeys("Skupina");
          let lastname = await brskalnik.findElement(By.css("input[name='lastname']"));
          expect(lastname).to.not.be.empty;
          lastname.clear();
          lastname.sendKeys("Ena");

          brskalnik.findElement(
            By.xpath("//button[contains(text(), 'Save')]")).click();
          await pocakajStranNalozena(brskalnik, 40, "//span[contains(text(), 'Chuck')]");
        });

        it("check if firstname and lastname have been changes", async function(){ 
          await pocakajStranNalozena(brskalnik, 40, "//h2[contains(text(), 'My vehicles')]");
          let fn = brskalnik.findElement(By.css('#ime_uporabnika'));
          expect(fn).to.not.be.empty;
          await fn.getText().then(function(vsebina) {
            expect(vsebina).to.be.equal("Skupina");
          });
          let ln = brskalnik.findElement(By.css('#priimek_uporabnika'));
          expect(ln).to.not.be.empty;
          await ln.getText().then(function(vsebina) {
            expect(vsebina).to.be.equal("Ena");
          });
        });
      });


      context("favourite a car", function() { 
        it("go to search, click on the Tesla, and favourite it, do the same for the Aveo", async function(){ 
          let povezava = await brskalnik.findElement(
            By.xpath("//a[contains(text(), 'Search')]"));
          expect(povezava).to.not.be.empty;
          await povezava.click();
          await pocakajStranNalozena(brskalnik, 10, "//h4");
            
          povezava = await brskalnik.findElement(
            By.xpath("//a[contains(text(), 'Book for only 85$/day')]"));
          expect(povezava).to.not.be.empty;
          await povezava.click();

          await pocakajStranNalozena(brskalnik, 10, "//h2");
          let heart= await brskalnik.findElements(By.css("#favorite"));
          expect(heart).to.not.be.empty;
          await heart[0].click();
          //repetition
          povezava = await brskalnik.findElement(
            By.xpath("//a[contains(text(), 'Search')]"));
          expect(povezava).to.not.be.empty;
          await povezava.click();
          await pocakajStranNalozena(brskalnik, 10, "//h4");
            
          povezava = await brskalnik.findElement(
            By.xpath("//a[contains(text(), 'Book for only 30$/day')]"));
          expect(povezava).to.not.be.empty;
          await povezava.click();

          await pocakajStranNalozena(brskalnik, 10, "//h2");
          heart= await brskalnik.findElements(By.css("#favorite"));
          expect(heart).to.not.be.empty;
          await heart[0].click();
        });

        it("go to my profile, check if the Tesla and Chevrolet are now in the favourte vehicles tab", async function(){ 
          let myProfileButton = await brskalnik.findElement(
            By.xpath("//a[contains(text(), 'My profile')]"));
          expect(myProfileButton).to.not.be.empty;
          await myProfileButton.click();
          await pocakajStranNalozena(brskalnik, 40, "//h5[contains(text(), 'Ford')]");

          let favourites = await brskalnik.findElement(
            By.xpath("//h5[contains(text(), 'Tesla')]"));
          expect(favourites).to.not.be.empty;

          favourites = await brskalnik.findElements(
            By.xpath("//h5[contains(text(), 'Chevrolet')]"));
          expect(favourites).to.not.be.empty;

          /*sem poskusil z h2//h5 tabela favourites
          await favourites[0].getText().then(function(vsebina) {
            expect(vsebina).to.be.equal("Tesla");
          });
          await favourites[1].getText().then(function(vsebina) {
            expect(vsebina).to.be.equal("Chevrolet");
          });*/
        });

      });
    });


    describe("Delete profile", function () {
      this.timeout(30 * 1000);
      before(() => { brskalnik.get(aplikacijaUrl); });
      it("go to my_profile", async function () {
        await pocakajStranNalozena(brskalnik, 10, "//h4");
        let myProfileButton = await brskalnik.findElement(
          By.xpath("//a[contains(text(), 'My profile')]"));
        expect(myProfileButton).to.not.be.empty;
        await myProfileButton.click();
      });

      it("click on delete profile", async function () {
        await pocakajStranNalozena(brskalnik, 10, "//h5[contains(text(), 'Ford')]");
        let deleteButton = await brskalnik.findElement(
          By.xpath("//button[contains(text(), 'Delete')]"));
        expect(deleteButton).to.not.be.empty;
        await deleteButton.click();
      });

      it("check if navbar has register button", async function () {
        await pocakajStranNalozena(brskalnik, 10, "//h4");
        let registerButton = await brskalnik.findElement(
          By.xpath("//a[contains(text(), 'Register')]"));
        expect(registerButton).to.not.be.empty;
      });
    });

    after(async () => {
      //brskalnik.quit();
    });

  } catch (napaka) {
    console.log("Med testom je prišlo do napake!");
  }
})();