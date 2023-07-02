//chrome://extensions/
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")
let myLeads=[];

let leadFronLocal=JSON.parse(localStorage.getItem("myLeads"));
if (leadFronLocal){
    myLeads=leadFronLocal
    render(myLeads);
}


tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){ //chrome and tab are object method is query  function will trigger function() and will get acces to tabs
        const tabUrl = tabs[0].url;

        if (!myLeads.includes(tabUrl)) {
            myLeads.push(tabUrl)


localStorage.setItem("myLeads", JSON.stringify(myLeads));
render(myLeads);
        }else{
            alert("This URL is already in the list!");
        }
    })
})
// to take the input from user
inputBtn.addEventListener("click",function(){
   myLeads.push(inputEl.value);
   inputEl.value="";  //clearin the input field
   localStorage.setItem("myLeads",JSON.stringify(myLeads));

   render(myLeads)
})
// to delete all the links stored
deleteBtn.addEventListener("dblclick",function(){
    
    localStorage.clear()
    myLeads=[]
     render(myLeads)
})

function render(leads){
let listItems="";
for(let i=0;i<leads.length;i++){
  listItems+=`<li>
  <a target='_blank'href=${leads[i]}">
  ${leads[i]}
  </a>
  </li>`;
}
ulEl.innerHTML=listItems;
}


// it's a way for sus developers to store and send data  and it's often used a send a piece of data from a server to a client browser
