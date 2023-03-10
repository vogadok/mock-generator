// Let's display this object in a nicely formatted <pre> tag
const myJSON = {
    Name: "friendly",
    Description: "Default Land Unit",
    ShippingAddress: "none",
    Id : ""
  };

const select = document.getElementById('objs')  
const select2 = document.getElementById('objs2')  

const getBtn = document.getElementById('get')  

// getBtn.addEventListener('click', getData)

createOptions()
createOptions2()
async function createOptions(){
    const res = await fetch('http://localhost:3000/data', {
        method: 'GET'
    })
    const data = await res.json()
    console.log('valor: ', data)

    data.forEach(element => {
      select.options[select.options.length] = new Option(element, 'Campo');
    });
}

async function createOptions2(){
  const res = await fetch('http://localhost:3000/data/data1', {
      method: 'GET'
  })
  const data = await res.json()
  let uniqueChars = [...new Set(data)];

  console.log('valor: ', data)

  uniqueChars.forEach(element => {
    select2.options[select2.options.length] = new Option(element, 'Campo');
  });
}


function generate(){

    const input = document.getElementById('field1');
    const dynamic1 = document.getElementById('objs').value;
    const dynamic2 = document.getElementById('field2').value;

    input.value = dynamic1;
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
      
  