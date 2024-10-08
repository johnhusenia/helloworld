/********************************************************************************
* WEB700 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: John Clarence C. Husenia Student ID: 174280230 Date: September 26, 2024
*
********************************************************************************/

class legoData{
    sets;
    constructor(){
        this.sets = [];
        // this.newsets = [];
    }
    initialize(){
        return new Promise((resolve,reject)=>{
        const setData = require("./data/setData");
        const themeData = require("./data/themeData");
        for (let i=0; i<setData.length; i++){

            let setTobeAdded = setData[i]
            for (let j=0; j<themeData.length; j++){
            if (setData[i].theme_id == themeData[j].id){
                setTobeAdded.theme = themeData[j].name
            }
        }
            this.sets.push(setTobeAdded)
        }
        if(this.sets != 0){
            resolve("The sets array is filled with objects.")
        }else{
            reject("no data")
        }
        
    });
    }

    getAllSets(){
        return new Promise((resolve,reject)=>{
            let setTobeAdded = [];
            if(this.sets != 0){
                resolve(this.sets);
            }else{
                reject('No data sets');

            }

        });
        
    }

    getSetByNum(setNum){
        return new Promise((resolve,reject)=>{
        let num1=0;
        for (let i=0; i<this.sets.length; i++){
        if(this.sets[i].set_num==setNum){
            num1=this.sets[i];
        }
        }
        if(num1!=0){
            resolve(num1)
        }else{
            reject("Unable to find requested set.")
        }

    });
    }

    getSetsByTheme(theme){
        return new Promise((resolve,reject)=>{
        const lowerCaseTheme = theme.toLowerCase();
        let setTobeAdded = [];
        let j=0;
        for (let i=0; i<this.sets.length; i++){
            // console.log(lowerCaseTheme + ' ' + this.sets[i].theme.toLowerCase())
            if(this.sets[i].theme.toLowerCase().includes(lowerCaseTheme)== 1 ){
                setTobeAdded[j] = this.sets[i];
                j++;
                // this.newsets.push(setTobeAdded)
            }
        }
        if(setTobeAdded != 0){
            resolve(setTobeAdded)
        }else{
            reject("unable to find requested sets")
        }
        
    });
    }
}

let data = new legoData();
async function practiceAsync(set_num,theme){
try{

    console.log(await data.initialize());
    const numSets = await data.getAllSets()
    console.log(`Number of Sets: ${numSets.length}`);
    console.log(await data.getSetByNum(set_num));
    const themeSets = await data.getSetsByTheme(theme);
    console.log(`Number of 'tech' sets: ${themeSets.length}`);

  }catch(err){
    console.log(err);
  }
}

practiceAsync("0012-1",'123');

