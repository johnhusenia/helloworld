const LegoData = require("./modules/legoSets");
const legoData = new LegoData


legoData.initialize()

async function practiceAsync(a,b){
try {
    await legoData.initialize();
    console.log(await legoData.getSetsByTheme(a));
    console.log(await legoData.getSetByNum(b));

} catch (error) {
    console.error(error);
    // Respond with a 500 status code for internal server errors
}
}

practiceAsync("abc","0013-1");