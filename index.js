const btnSubmit = document.getElementById("btnSubmit")
btnSubmit.addEventListener("click",inputHandler)



function inputHandler(){
    let username = prompt("Enter Username")
    mainFun(username)
}

/*
Main 
*/ 
async function mainFun(username){
    //url
    let url = `https://api.github.com/users/${username}/repos`
    let repoData = await getRequest(url).catch(error => console.error(error))

    //TreeMap
    languageTreeMap(repoData, username)

    //Social Graph
    //parseSocialData(repoData)
}

/*
Get Request
*/
async function getRequest(url){
    const response = await fetch(url)
    let result = await response.json()
    return result
}
/**
 * Data Parser Functions
 */
async function languageTreeMap(userReposData, user) {
    let languages = new Set();
    let repoLangObj = []
    for (let i = 0; i < userReposData.length; i++) 
    {
      const repo = userReposData[i].name;
      let a = await getRequest(`https://api.github.com/repos/${user}/${repo}/languages`).catch((error) => console.error(error));
      repoLangObj.push(a)
    }
  
    
  
    for (let i = 0; i < repoLangObj.length; i++) 
    {
      let keyArr = Object.keys(repoLangObj[i]);
        for (let j = 0; j < keyArr.length; j++) 
        {
          languages.add(keyArr[j])
        }
    }
    
  
    let langSize = new Map()
    for (let value of languages) langSize.set(value, 0);   // initialise map
  
   
  
    for (let i = 0; i < repoLangObj.length; i++) 
    {
      let obj = repoLangObj[i]
      for (const [key, value] of Object.entries(obj)) {
  
        let oldVal = langSize.get(key);
        let newVal = value + oldVal
        const newMap = langSize.set(key, newVal)
        langSize = newMap
      }
  
    }
  
    let children = []
    let values = []
    for (const [key, value] of langSize.entries()) 
    {
      let node = {
        "name":key,
        "group":"A",
        "value":value,
        "colname":"languages"
      }
      values.push(value)
      children.push(node)
  
    }
    let big = Math.max(...values)
  
    for (const e of children) {
      e.value = scale(e.value, 0, big, 1, 500)
    }
  
    D3_TreeMap(children);
  }


 /**
  * D3.js Grapher Functions
  */
 function D3_TreeMap(childrenData){


    var svg = d3.select(".chartTree");
    svg.selectAll("*").remove()
    var width = svg.attr("width");
    var height = svg.attr("height");
    var color = d3.scaleOrdinal(d3.schemeCategory20);
  
    var data = {
      name: "Languages",
      children: childrenData
    };
  
  
    // Give the data to this cluster layout:
    var root = d3.hierarchy(data).sum(function(d){ return d.value}) // Here the size of each leave is given in the 'value' field in input data
  
    // Then d3.treemap computes the position of each element of the hierarchy
    d3.treemap()
      .size([width, height])
      .padding(2)
      (root)
  
    // use this information to add rectangles:
    svg
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
        .attr('x', function (d) { return d.x0; })
        .attr('y', function (d) { return d.y0; })
        .attr('width', function (d) { return d.x1 - d.x0; })
        .attr('height', function (d) { return d.y1 - d.y0; })
        .style("stroke", "black")
        .attr("fill", function (d, i) {
          return color(i);
        })


    // and to add the text labels
    svg
      .selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
        .attr("x", function(d){ return d.x0+5})    
        .attr("y", function(d){ return d.y0+15})   
        .text(function(d){ return d.data.name })
        .attr("font-size", "15px")
        .attr("fill", "black")
  }
  
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }