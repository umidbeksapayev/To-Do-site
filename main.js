let input = document.querySelector("input");
let main = document.getElementsByClassName("main")[0];
let h3 = document.getElementsByClassName("hhh")[0];
let modal = document.getElementById("modal");
let save = document.getElementById("saveBtn");
let cancel = document.getElementById("cancelBtn");
let inp = document.getElementById("input");


id = 0;
let goals = [];

// Add new goal
add = () => {
  if (input.value.trim() !== "") {
    const goal = {
      id: goals.length,
      title: input.value,
      complated: false,
    };

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
    goals.push(goal);
    input.value = "";
    id++;
    // h3.innerHTML = null;
  }
};

// Delete a goal
const deletee = (id) => {
  for (i = 0; i < main.children.length; i++) {
    if (id == main.children[i].id) {
      main.children[i].remove();
      break;
    }
  }

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
      goals[i].complated = !goals[i].complated;

      if (goals[i].complated) {
        main.children[i].childNodes[1].style.textDecoration = "line-through";
        main.children[i].getElementsByClassName("com")[0].innerText = "UNCOMPLETE";
      } else {
        main.children[i].childNodes[1].style.textDecoration = "none";
        main.children[i].getElementsByClassName("com")[0].innerText = "COMPLETE";
      }
    }
  }
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
