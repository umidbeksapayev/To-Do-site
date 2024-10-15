let input = document.querySelector("input");
let main = document.getElementsByClassName("main")[0];
let h3 = document.getElementsByClassName("hhh")[0];
let modal = document.getElementById("modal");
let save = document.getElementById("saveBtn");
let cancel = document.getElementById("cancelBtn");
let inp = document.getElementById("input");

let goals = JSON.parse(localStorage.getItem("toDos")) || [];
// id = 0;

const showToDO = ()=>{
  if (goals.length){
    for (i=0; i<goals.length; i++){
      let div = document.createElement("div");
      div.id = goals[i].id
      div.innerHTML = `
      <div class="posts">
        <p style="${goals[i].complated ? "text-decoration:line-through":"text-decoration:none"}">${goals[i].title}</p>
        <button class = "btn" id="co" onclick="deletee(${goals[i].id})">Delete</button>
        <button class = "btn" id = "ed" onclick="modalToDo(${goals[i].id})">Edit</button>
        <button class="com btn" onclick="com(${goals[i].id})">${goals[i].complated ? "UNCOMLATE":"COMPLATE"}</button>
      </div>
      `;

      main.append(div);
    }
  }
}

showToDO()

// Add new goal
add = () => {
  if (input.value.trim() !== "") {
    const goal = {
      id: goals.length,
      title: input.value,
      complated: false,
    };
    goals.push(goal);

    let div = document.createElement("div");
    div.id = goal.id;
    div.innerHTML = `
    <div class="posts">
      <p>${input.value}</p>
      <button class = "btn" id="co" onclick="deletee(${goal.id})">Delete</button>
      <button class = "btn" id = "ed" onclick="modalToDo(${goal.id})">Edit</button>
      <button class="com btn" onclick="com(${goal.id})">Complete</button>
    </div>
    `;

    document.querySelector(".b").style.display = "inline-block";
    main.append(div);
    localStorage.setItem("toDos",JSON.stringify(goals))
    input.value = "";

    // h3.innerHTML = null;
  }
};

// Delete a goal
const deletee = (id) => {
  for (i = 0; i < main.children.length; i++) {
    if (id == main.children[i].id) {
      main.children[i].remove();
      console.log(goals = goals.filter((goal)=>goal.id !== i));
      
      goals = goals.filter((goal) => goal.id !== i)
    }
  }
  localStorage.setItem("toDos", JSON.stringify(goals));
  
  if (main.children.length === 0) {
    document.querySelector(".b").style.display = "none";
  }
};

// Delete all goals
const deleteall = () => {
  main.innerHTML = ``;
  document.querySelector(".b").style.display = "none";
};

// Toggle goal completion
const com = (id) => {
  for (i = 0; i < main.children.length; i++) {
    if (id == main.children[i].id) {
      
      if (goals[i].complated) {
        main.children[i].childNodes[1].children[0].style.textDecoration = "none";
        main.children[i].getElementsByClassName("com")[0].innerText = "COMPLETE";
        goals[i].complated = false
      } else {
        main.children[i].childNodes[1].children[0].style.textDecoration = "line-through";
        main.children[i].getElementsByClassName("com")[0].innerText = "UNCOMPLETE";
        goals[i].complated = true
      }
    }
  }
  localStorage.setItem("toDos",JSON.stringify(goals))
  // goals[i].complated = goals[i].complated;
};

// Edit a goal using modal
const modalToDo = (id) => {
  inp.value = goals[id].title; 
  modal.style.display = "block";

  // Save changes
  save.onclick = () => {
    goals[id].title = inp.value;
    for (i = 0; i < main.children.length; i++) {
      if (id == main.children[i].id) {
        const pTag  =  main.children[i].querySelector("p");
        pTag.textContent = inp.value;
        break
      }
    }
    modal.style.display = "none";
  };

  // Cancel changes
  cancel.onclick = () => {
    modal.style.display = "none";
  };
};
