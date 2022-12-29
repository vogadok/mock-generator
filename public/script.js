// Let's display this object in a nicely formatted <pre> tag
const myJSON = {
    Name: "friendly",
    Description: "Default Land Unit",
    ShippingAddress: "none",
    Id : ""
  };

const select = document.getElementById('objs')  
const getBtn = document.getElementById('get')  

getBtn.addEventListener('click', getData)
async function getData(e){
    const res = await fetch('http://localhost:3000/data', {
        method: 'GET'
    })
    const data = await res.json()
    console.log('valor: ', data)
    data.forEach(element => {
      select.options[select.options.length] = new Option(element, 'Value1');
    });
}


function generate(){

    const dynamic1 = document.getElementById('field1').value;
    const dynamic2 = document.getElementById('field2').value;
    const user = {
                    Name : "GeeksForGeeks",
                    [dynamic1] : "57",
                    [dynamic2] : "42"
                };

    console.log(user);
    
    myJSON.Name = document.getElementById('field1').value;
    myJSON.Description = document.getElementById('field2').value;
    myJSON.ShippingAddress = document.getElementById('field3').value;
    myJSON.Id = '0018W0000274HTJQA2';

    const myJSONString = JSON.stringify(myJSON);
    let regexString = "";
    // for tracking matches, in particular the curly braces
    const brace = {
      brace: 0
    };
    
    document.querySelector("#myJSONString").innerHTML = myJSONString;
    
    regexString = myJSONString.replace(
      /({|}[,]*|[^{}:]+:[^{}:,]*[,{]*)/g,
      (m, p1) => {
        const returnFunction = () =>
          `<div style="text-indent: ${brace["brace"] * 20}px;">${p1}</div>`;
        let returnString = 0;
        if (p1.lastIndexOf("{") === p1.length - 1) {
          returnString = returnFunction();
          brace["brace"] += 1;
        } else if (p1.indexOf("}") === 0) {
          brace["brace"] -= 1;
          returnString = returnFunction();
        } else {
          returnString = returnFunction();
        }
        return returnString;
      }
    );
    
}
      
  