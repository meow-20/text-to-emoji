
var result = document.querySelector(".result");
var encryptionBtn = document.querySelector("#encryption-btn");
var decryptionBtn = document.querySelector("#decryption-btn");
var encBtn = document.querySelector(".enc-btn");
var decBtn = document.querySelector(".dec-btn");
var encForm = document.querySelector(".enc-form");
var decForm = document.querySelector(".dec-form");
var arrow = document.querySelector("#arrow");
var setpass = document.querySelector("#setpass");

var data_codes = [];

var clutter = "";
function btnClick(){

    encBtn.addEventListener("click",function(){
        encForm.style.display = "block";
        decForm.style.display = "none";
        encBtn.style.backgroundColor = "#282828";
        decBtn.style.backgroundColor = "#1c1c1c";
        arrow.style.rotate = "0deg";
        result.style.display = "none";

    })
    decBtn.addEventListener("click",function(){
        encForm.style.display = "none";
        decForm.style.display = "block";
        encBtn.style.backgroundColor = "#1c1c1c"
        decBtn.style.backgroundColor = "#282828"
        arrow.style.rotate = "180deg"
        result.style.display = "none"
    })

    encryptionBtn.addEventListener("click", function(){
        result.style.display = "block"
    })
    decryptionBtn.addEventListener("click",function(){
        result.style.display = "block"
    })
}
btnClick();


// var clutter = "";
function encryption(){

    encryptionBtn.addEventListener("click",function(){
        clutter = "";
        data_codes = "";
        //get input
        var input = document.getElementById("enc-txt").value
        // console.log(input);
        //get password
        var pass = document.getElementById("setpass").value
        // console.log(pass)

        //split input
        const str = input.split("");
        // console.log(str)
        str.forEach(element => {
            data_codes += `&#${element.charCodeAt()}`
            clutter += `&#128${element.charCodeAt(0)}`
        });
        console.log(data_codes)
        console.log(clutter)

        // result.style.display = "block"

        //storing encrypted text in result
        result.innerHTML = clutter;

        //getting data into array with localStorage
        var dataArr = [];
        if(JSON.parse(localStorage.getItem('data'))){
            dataArr = JSON.parse(localStorage.getItem('data'))
            dataArr.push({text:input, key:pass, encrypted:clutter, charcode:data_codes});
        } else {
            dataArr = [{text:input, key:pass, encrypted:clutter, charcode:data_codes}];
        }
        localStorage.setItem('data', JSON.stringify(dataArr))
    })
}
encryption();

function decryption(){

    decryptionBtn.addEventListener("click",async function(){
        var clutter2 = "";
        var d_input = document.getElementById("dec-txt").value;
        var cpass = document.getElementById("checkpass").value;

    
        //get data from local storage
        var user = JSON.parse(localStorage.getItem('data'))
        // console.log(user)

        //using Graphemer library to split Emojis
        let Graphemer = await import("https://cdn.jsdelivr.net/npm/graphemer@1.4.0/+esm")
            .then(m => m.default.default);
        let splitter = new Graphemer();
        let graphemes = splitter.splitGraphemes(d_input); // ['👨‍👨‍👧‍👧', '👦🏾']

        // var str2 = d_input.split("");
        // console.log(str2)

        graphemes.forEach(element =>{
            // console.log(element)
            clutter2 += `&#${element.codePointAt(0)}`
        })
        // console.log(clutter2)

        let found;
        for(let i of user){
            if(i.encrypted == clutter2){
                found = i
                // console.log(found)
            }
        }
            if(found.key === cpass){
            result.style.display = "block";
            result.style.color = "#eee"
            result.innerHTML = found.charcode;
        }else{
            result.innerHTML = "Wrong Password!";
            result.style.display = "block";
            result.style.color = "red"
        }
    })
}
decryption();


