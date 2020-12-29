const btnSubmit = document.getElementById("btnSubmit")
btnSubmit.addEventListener("click",inputHandler)



function inputHandler(){
    let username = prompt("Enter Username")
    //mainFun(username)
}

/*
Main 
*/ 
async function main(username){
    //url
    let url = `https://api.github.com/users/${username}/repos`
    let repoData = await getRequest(url).catch(error => console.error(error))

    //TreeMap
    languageTreeMap(repoData, username)

    //Social Graph
    parseSocialData(repoData)
}

/*
Get Request
*/
async function getRequest(url){
    const response = await fetch(url)
    let result = await response.json()
    return result
}
