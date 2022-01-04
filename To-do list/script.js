const addNewTask = (e) => {
    toggleModalDisplay();
}

const cancelClick = (e) => {
    e.preventDefault();
    document.forms[0].reset();
    toggleModalDisplay();
};

const toggleModalDisplay = () => {
    document.getElementsByClassName('modal')[0].classList.toggle("display-none");
}

let data = [];

class Task {
    constructor(text, priority) {
        this.text = text;
        this.priority = priority;
        this.isActive = true;
    }
}

const addTaskEvent = () => {
    for (let j = data.length - 1; j >= 0; j--) {
        document.getElementsByClassName("content__check_mark")[j].addEventListener('click', markFinishedTask);
        document.getElementsByClassName("content__cross")[j].addEventListener('click', deleteTask);
    }
}

const addTask = (e) => {
    e.preventDefault();
    const plusTaskForm = document.getElementById("plusTaskForm");
    const text = plusTaskForm.elements['taskText'].value;
    const priority = plusTaskForm.elements['priority'].value;
    let task = new Task(text, priority);
    data.push(task);
    addTaskToPage();
    toggleModalDisplay();
    plusTaskForm.reset();
    addTaskEvent();
}

const addBackgroundColorByPriority = () => {
    for (let i = data.length - 1; i >= 0; i--) {
        switch (data[i].priority) {
            case "high":
                document.getElementsByClassName("content__task")[i].style.backgroundColor = "#fccad0";
                document.getElementsByClassName("content__task")[i].style.borderColor = "#f52c44";
                break;
            case "medium":
                document.getElementsByClassName("content__task")[i].style.backgroundColor = "#faeac5";
                document.getElementsByClassName("content__task")[i].style.borderColor = "#f5c32c";
                break;
            case "low":
                document.getElementsByClassName("content__task")[i].style.backgroundColor = "#c1f7e0";
                document.getElementsByClassName("content__task")[i].style.borderColor = "#2cf591"; 
                
        }
    }
}

const addTaskToPage = () => {
    let div = document.createElement("div");
    div.className = "content__item";
    let formContent = document.getElementsByClassName("content__form")[0];
    formContent.append(div);
    let contentCheckMark = document.createElement("img");
    contentCheckMark.className = "content__check_mark";
    contentCheckMark.src = "./images/check-mark.svg";
    div.append(contentCheckMark);
    let contentTask = document.createElement("p");
    contentTask.className = "content__task";
    contentTask.innerHTML = data[data.length - 1].text;
    div.append(contentTask);
    let contentCross = document.createElement("img");
    contentCross.className = "content__cross";
    contentCross.src = "./images/cross.svg";
    div.append(contentCross);
    addBackgroundColorByPriority();
}

const cleanAll = (e) => {
    for (let i = data.length - 1; i >= 0; i--) {
        document.getElementsByClassName("content__item")[i].remove();
    }
    data = [];
}

const markFinishedTask = (e) => {
    e.target.parentElement.style.textDecoration = "line-through";
    e.target.style.opacity = "1";
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].text == e.target.parentElement.getElementsByClassName("content__task")[0].innerHTML && data[i].isActive === false) {
            e.target.style.opacity = "0.7";
            e.target.parentElement.style.textDecoration = "none";
            data[i].isActive = true;
        } else if (data[i].text == e.target.parentElement.getElementsByClassName("content__task")[0].innerHTML) {
            data[i].isActive = false;
        }
    }
}

const deleteTask = (e) => {
    e.target.parentElement.remove();
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].text == e.target.parentElement.getElementsByClassName("content__task")[0].innerHTML) {
            return data.splice(i, 1);
        }
    }
}

const showActive = (e) => {
    document.getElementById("active").style.opacity = "1";
    document.getElementById("finished").style.opacity = "0.7";
    document.getElementById("all").style.opacity = "0.7";
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].isActive === false) {
            document.getElementsByClassName("content__item")[i].style.display = "none";
        } else {
            document.getElementsByClassName("content__item")[i].style.display = "flex";
        }
    }
}

const showFinished = (e) => {
    document.getElementById("active").style.opacity = "0.7";
    document.getElementById("finished").style.opacity = "1";
    document.getElementById("all").style.opacity = "0.7";
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].isActive === true) {
            document.getElementsByClassName("content__item")[i].style.display = "none";
        } else {
            document.getElementsByClassName("content__item")[i].style.display = "flex";
        }
    }
}

const showAll = (e) => {
    document.getElementById("active").style.opacity = "0.7";
    document.getElementById("finished").style.opacity = "0.7";
    document.getElementById("all").style.opacity = "1";
    for (let i = data.length - 1; i >= 0; i--) {
        document.getElementsByClassName("content__item")[i].style.display = "flex";
    }
}

document.getElementById("plusTask").addEventListener('click', addNewTask);
document.getElementById("addBtn").addEventListener('click', addTask);
document.getElementById("cancelBtn").addEventListener('click', cancelClick);
document.getElementById("cleanAll").addEventListener('click', cleanAll);
document.getElementById("active").addEventListener('click', showActive);
document.getElementById("finished").addEventListener('click', showFinished);
document.getElementById("all").addEventListener('click', showAll);