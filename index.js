const puppeteer = require('puppeteer')
const fs = require('fs')
async function run(){
    // First, we must launch a browser instance
    const browser = await puppeteer.launch({
        // headless: false,
        ignoreHTTPSErrors: true,
    })
    // then we need to start a browser tab
    let page = await browser.newPage();
    //insert url here
    let url = " "
    // and tell it to go to some URL
    await page.goto(url, {
        waitUntil: 'domcontentloaded',
    });
    // print html content of the website

    const data = await page.evaluate(()=>{
            const ins = document.querySelector('.section-list')?.innerText
            const newIns = ins.replace(/\n/g, "|"); 
            const insArray = newIns.split("|")

            const special = document.querySelector('.attributes-group')?.innerText
            const newSp = special.replace(/\n/g, "|"); 
            const sArray = newSp.split("|")

            const fullName = document.querySelector('.profile-title')?.innerText
            const nameArr = fullName.split(" ")
            const fName = nameArr[0]
            const lName = nameArr[1]

            console.log(nameArr)
            console.log(sArray)
        return{
            password: "1",
            firstName: fName,
            lastName: lName,
            email: (nameArr.join("") + "@test.com"),
            credentials: document.querySelector('.profile-suffix-container')?.innerText,
            bio: document.querySelector('.personal-statement')?.innerText,
            location: document.querySelector('.addresses')?.innerText.replace(/\n/g, ""),
            yearsOfExperience: document.querySelector('.primary-details')?.innerText,
            insuranceAccepted: insArray,
            specialties: sArray,
            yearsOfExperience: Math.floor(Math.random() * 100),
            languages: [],
            acceptingClients: true,
            licensureState: "new york",
            licenseNumber: Math.floor(Math.random() * 100000),
            telehealth: true,
            inPerson: true,
            sessionTypes: [],
        }
    })
    // close everything
    fs.writeFileSync(`kelly-fletcher.json`,JSON.stringify(data,null,2))

    await page.close();
    await browser.close();
}

run();

//our model
/*
        "sessionTypes": [],
        "_id": "671ff2f6dcd98237c36fce4c",
        "email": "manny@rosario.com",
        "firstName": "Manny",
        "lastName": "Rosario",
        "credentials": "PHD",
        "bio": "love",
        "location": "Queens, NY",
        "insuranceAccepted": [
            "Tri-care"
        ],
        "specialties": [],
        "yearsOfExperience": 4,
        "languages": [],
        "acceptingClients": true,
        "licensureState": "New York",
        "licenseNumber": "123456",
        "telehealth": true,
        "inPerson": true,
        "createdAt": "2024-10-28T20:24:22.201Z",
        "updatedAt": "2024-10-28T20:24:22.201Z",
        "__v": 0
*/