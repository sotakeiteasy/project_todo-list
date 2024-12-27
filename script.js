class Task {
    constructor(title, description, dueDate, priority, checkList) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checkList = checkList;
        // this.project = project;
    }

    markAsComplete() {
        this.completed = true;
        console.log(`${this.title} is complete!`);
      }
    
    setPriority(priority) {
    this.priority = priority;
    }

    toHTML(index) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const headerDiv = document.createElement('div');
        headerDiv.classList.add('taskHeader');
        const title = document.createElement('span');
        title.textContent = this.title;

        const removeBtn = document.createElement('div');
        removeBtn.classList.add('removeBtn');
        removeBtn.innerHTML = '&times;';
        removeBtn.onclick = () => removeTask(index);

        headerDiv.appendChild(title);
        headerDiv.appendChild(removeBtn);

        const description = document.createElement('p');
        description.innerHTML = `<strong>Description:</strong> ${this.description}`;

        const priority = document.createElement('p');
        priority.innerHTML = `<strong>Priority:</strong> ${this.priority}`;

        const notes = document.createElement('p');
        notes.innerHTML = `<strong>Priority:</strong> ${this.notes}`;

        const checkList = document.createElement('p');
        checkList.innerHTML = `<strong>Priority:</strong> ${this.checkList}`;

        taskDiv.appendChild(headerDiv);
        taskDiv.appendChild(description);
        taskDiv.appendChild(priority);
        taskDiv.appendChild(notes);
        taskDiv.appendChild(checkList);

        return taskDiv;
    }

    // Add rename title and change description
    // Add date
}

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.project = []
    }

    addTask(task) {
        this.project.push(task)
    }

    removeTaskFromProject(task) {
        const index = this.project.indexOf(task);
        if (index !== -1) {
          this.task.splice(index, 1);
        }
    }
}

class AllProjects {
    constructor() {
        this.projects = [];
    }

    // duplicate of function for global storage
    addTask(task) {
        this.projects.push(task); 
    }

    createProject(title, description) {
        const project = new Project(title, description);
        this.projects.push(project);
    }

    addTaskToProject(task, project) {
        if (project) {
            project.addTask(task); // if we know project, add to this project
        } else {
            this.addTask(task); // if there are no project, add to global space 
        } 
    }
}

const allTasks = new AllProjects();




// DOM part
const addBtn = document.querySelector("#addBtn");
const addDialog = document.querySelector("#addDialog");
const confirmBrn = document.querySelector("#confirmBrn");

addBtn.addEventListener("click", (event) => {
    addDialog.showModal;
});

function displayTasks() {
    const taskContainer = document.querySelector("#tasks-list");
    const tasks = taskContainer.querySelectorAll('.task');
    tasks.forEach(task => task.remove());

    allTasks.projects.forEach((taskItem, index) => {
        const task = taskItem.toHTML(index); 
        taskContainer.appendChild(task); 
    });
}

function removeTask(index) {
    allTasks.projects.splice(index, 1);
    displayTasks();
}






document.querySelector("#showDialogButton").onclick = () => {
    document.querySelector("#taskDialog").classList.remove("hidden");
    displayTasks();

};

document.querySelector("#closeDialogButton").onclick = () => {
    document.querySelector("#taskDialog").classList.add("hidden");

    document.querySelector("#taskTitle").value = "";
    document.querySelector("#taskDescription").value = "";
    document.querySelector("#taskPriority").value = "Low";

};

document.querySelector("#addTaskButton").onclick = () => {
    const title = document.querySelector("#taskTitle").value.trim();
    const description = document.querySelector("#taskDescription").value.trim();
    const priority = document.querySelector("#taskPriority").value;
    const date = '' 
    const checkList = '';
    
    if (!title) {
        alert("Task title is required!");
        return;
    }

    const newTask = new Task(title, description, date, priority, checkList);

    allTasks.addTaskToProject(newTask);

    displayTasks();

    document.querySelector("#taskTitle").value = "";
    document.querySelector("#taskDescription").value = "";
    document.querySelector("#taskPriority").value = "Low";

    document.querySelector("#taskDialog").classList.add("hidden");
};

