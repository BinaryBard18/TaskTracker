let countEl = document.getElementById("count")//Targeting the orange div "1/5"
let listElements = []//creating an empty array
let done = 0//initializing the completed task variable to zero
let textEl = document.getElementById("text")//our input field
let allTasksEl = document.querySelector(".allTasks")//contains our list of tasks
let tasks = listElements.length//Storing the length in var (never used)

countEl.textContent = done + "/" + listElements.length//Modifying the element on DOM


function addTask(){
    //Initializing a data object for each new Task after the addTask button is clicked
    let data = {
        text : "",
        check : false,
    }

    //Will add the list item only when it is having a length inn the input field greater than zero
    if(textEl.value.length===0){
        alert("Please write a To Do");
    }
    if(textEl.value.length > 0){
        newTaskAdd(data)//passing data object so that we can use it
        listElements.push(data)//pushing each and every object once the text property is set into our listElements array
    }
    textEl.value = ""//Once the listItem is created we want our input field to become empty
    countEl.textContent = done + "/" + listElements.length
}

function newTaskAdd(data){
    data.text = textEl.value

    //Structure goes like this : mainDiv(check -> textDiv -> deleteIcon)
    let mainDiv = document.createElement("div")
    let textDiv = document.createElement("div")
    // let editDeleteDiv = document.createElement("div")
    let check = document.createElement("div")

    let toDoText = document.createTextNode(textEl.value)
    mainDiv.appendChild(check)
    textDiv.appendChild(toDoText)


    // let editIcon = document.createElement("i")
    // editIcon.setAttribute("class","bx bx-edit");
    // editDeleteDiv.appendChild(editIcon);
    
    let deleteIcon = document.createElement("i")
    deleteIcon.setAttribute("class","bx bx-trash");
    // mainDiv.appendChild(deleteIcon);

    deleteIcon.addEventListener("click" , (e) => {//here e is an event that is passed because we want to access it
        let task = e.target.previousElementSibling.textContent//In our mainDiv we have order as checkbox-text-removeButton
        
        for (let i=0; i<listElements.length; i++) {
            listElements = listElements.filter((item) => item.text !== task)//finding the element and filter it out so that our remaining array is not having that object basically its deleted
            // countEl.textContent = done + "/" + listElements.length
            break//as soon as we get the object to be deleted we just stop
        }
        e.target.parentElement.remove()//removing its parentElement ie mainDiv..
        if(done>0)
        {
            done -= 1
        }
        countEl.textContent = done + "/" + listElements.length

    })


    check.addEventListener("click",(e) => checked(e, check))

    mainDiv.style.cssText = "display:flex;justify-content:space-between;align-items:center;border:1px solid #aea18b; border-radius:15px;width:40rem;height:auto;"
    textDiv.style.cssText = "height:auto;width:35rem;font-size:1.5rem;display:flex;justify-content:space-between;align-items:center;vertical-align:center;text-indent:10px;padding:0.7rem;color:#dacaad;font-weight:400;"
    // editIcon.style.cssText = "font-size:2rem;cursor:pointer;color:#dacaad;"
    deleteIcon.style.cssText = "font-size:2rem;cursor:pointer;color:#dacaad;margin-right:20px;"
    // editDeleteDiv.style.cssText = "display:flex;align-items:center;gap:1rem;padding-right:10px;"
    check.style.cssText = "width:25px;height:25px;border:2px solid #e35a33;border-radius:50%;cursor:pointer;margin-left:20px; "

    // check.addEventListener("click", () => {
    //     // check.style.cssText = "width:25px;height:25px;border:2px solid #57cb4c;background-color:#57cb4c;border-radius:50%;cursor:pointer;margin-left:10px; "
    // })

    mainDiv.appendChild(textDiv)
    mainDiv.appendChild(deleteIcon);
    // mainDiv.appendChild(editDeleteDiv)
    allTasksEl.appendChild(mainDiv)

}


function checked(e){
    let text1 = e.target.nextElementSibling.textContent;
    let nextEl = e.target.nextElementSibling
    let checkEl = e.target

    //Styles
    const style1 = "width:25px;height:25px;border:2px solid #57cb4c;background-color:#57cb4c;border-radius:50%;cursor:pointer;margin-left:20px;"
    const style2 = "width:25px;height:25px;border:2px solid #e35a33;border-radius:50%;cursor:pointer;margin-left:20px; "
    const style3 = "text-decoration:line-through;text-decoration-color:#ccbda3;height:auto;width:35rem;font-size:1.5rem;display:flex;justify-content:space-between;align-items:center;vertical-align:center;padding:0.7rem;color:#dacaad;font-weight:400;text-indent:10px;cursor:pointer"
    const style4 = "height:auto;width:35rem;font-size:1.5rem; display:flex;justify-content:space-between;align-items:center;vertical-align:center;padding:0.7rem;color:#dacaad;font-weight:400;text-indent:10px; cursor:pointer"
    
    
    for(let i = 0; i < listElements.length; i++){
        if(listElements[i]['text'] === text1 ){
            listElements[i]['check'] = !listElements[i]['check']

            checkEl.style.cssText = listElements[i]['check'] ? style1 : style2;
            nextEl.style.cssText = listElements[i]['check'] ? style3 : style4;
            if(listElements[i]['check']){
                done += 1
            }
            else{
                if(done > 0)
                    done -=1
            }
            countEl.textContent = done + "/" + listElements.length
            break;
        }
    }
}