let tasks = [];
let taskIdCounter = 1;
let current_filter = "all";
let filtertaskat;
function addTask(){
const inputValue = document.getElementById("Add_bar").value;
if (inputValue.trim() ==="") {
    return;}


////thats for the counter//----
const newtask = {
    //id,input,false/true//
        id: taskIdCounter,
    title: inputValue,
    completed: false,
    
   
////////////here we just add tasks and get them ready////----
}

taskIdCounter++
tasks.push(newtask);
document.getElementById("Add_bar").value = "";
}

function render () {
    
    const list = document.getElementById("todolist");
    list.innerHTML = "";


    if ( current_filter === "active" ) {
      filtertaskat = tasks.filter((A) => {
        return A.completed === false;
      })
    } else if  (current_filter === "completed") { 
      filtertaskat = tasks.filter((t) => {
        return t.completed === true;
      })

    } else{
      filtertaskat   = tasks;
    };

    filtertaskat.forEach((taskaeah) => {
    
        const li = document.createElement("li");
        li.textContent = taskaeah.title;
        list.appendChild(li);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = taskaeah.completed;
        li.appendChild(checkbox);


        let delete_btn = document.createElement("button");
        delete_btn.textContent = "Delete";
        li.appendChild(delete_btn);
        delete_btn.addEventListener("click", () => {
          tasks = tasks.filter((delet_shit) =>{
         return delet_shit.id !== taskaeah.id;
          });
            render();  
          });


          let edit_btn = document.createElement("button");
          edit_btn.textContent = "edit";
          li.appendChild(edit_btn);
          edit_btn.addEventListener("click", () => {
           const newTitle = prompt("edit shit", taskaeah.title);
           if (newTitle !== null && newTitle.trim() !== "") {
            taskaeah.title = newTitle;
              render(); 
           } 
            });







        checkbox.addEventListener("click", () => {
            taskaeah.completed = !taskaeah.completed;
            console.log(taskaeah.completed); 
            render();   
          });
         
          });
        //////---tmm render---////

        function zawed_adaad (){

          const remain = tasks.filter((num) => {
             return num.completed === false;
         });
         const remainCount = remain.length;
         document.getElementById("counter").textContent = `${remainCount} remain tasks`;
         }
         zawed_adaad();
         
      }
   
      const add_but = document.getElementById("add_but");
      add_but.addEventListener("click", () => {
        console.log("btn");
          addTask();
          render();
      });

      
      const All_btn = document.getElementById("All_btn");
      All_btn.addEventListener("click", () => {
        current_filter = "all";
        console.log("all");
        render();
      });

      const Active_btn = document.getElementById("Active_btn");
      Active_btn.addEventListener("click", () => {
        current_filter = "active";
        console.log("active");
        render();
      });


      const completed_btn = document.getElementById("Completed_btn");
      completed_btn.addEventListener("click", () => {
        current_filter = "completed";
        console.log("completed");
        render();
      });




      const textInput = document.getElementById("Add_bar");
      textInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          console.log("Enter pressed");
          addTask();
          render();
        }
      });
