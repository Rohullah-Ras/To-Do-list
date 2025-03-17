addEventsToInputs();
changeTitleToInput();

function addEventsToInputs() {
    var input = document.getElementsByClassName("toDo__input");
    for (var i = 0; i < input.length; i++) {
        input[i].onkeyup = function (event) {
            newTask(event);
        }
    }
}
var list = document.getElementById("js--list")

function changeTitleToInput() {
    var headers = document.getElementsByClassName("toDo__header");
    for (var i = 0; i < headers.length; i++) {
        headers[i].onclick = function () {
            var oldTitle = this.children[0].innerText;
            this.children[0].remove();
            var newInput = document.createElement("input");
            newInput.classList = "toDo__headerInput";
            newInput.value = oldTitle;
            this.appendChild(newInput);
            newInput.focus();


            newInput.onkeyup = function (event) {
                if (event.key === "Enter"){
                    var newTitle = event.target.value;
                    var newHeading = document.createElement("h2");
                    event.target.parentElement.appendChild(newHeading);
                    newHeading.innerText = newTitle;
                    newHeading.classList = "toDo__heading";
                    this.remove();
                }
            }

        }
    }
}


function newTask(event) {
    if (event.key === "Enter") {
        var tasks = event.target.parentElement.parentElement.children[1].children[0];
        var newTask = document.createElement("li");
        newTask.innerText = event.target.value;
        newTask.classList = "toDo__task";
        newTask.dataset.running = "false";
        tasks.appendChild(newTask);
        event.target.value = "";
        newTask.onclick = function (event) {
            setOrClearTimer(event);
        }
    }
}

var tasks = document.getElementsByClassName("toDo__task");
var timer = null;
for (var i = 0; i < tasks.length; i++) {
    tasks[i].onclick = function (event) {
        setOrClearTimer(event);
    }
}




var fab = document.getElementById("js--fab");
fab.onclick = function () {
    makeNewCard();
}




function toDone(event) {
    timer = setTimeout(function () {
        var doneTask = document.createElement("li");
        doneTask.innerText = event.target.innerText;
        doneTask.classList = "toDo__task toDo__task--done";
        document.getElementById("js--done").appendChild(doneTask);
        event.target.remove();
    }, 3000);
}


function setOrClearTimer(event) {
    if (event.target.dataset.running === "false") {
        event.target.classList.toggle("toDo__task--done");
        event.target.dataset.running = "true";
        toDone(event);

    }
    else if (event.target.dataset.running === "true") {
        event.target.classList.toggle("toDo__task--done");
        clearTimeout(timer);
        event.target.dataset.running = "false";
    }
}


function makeNewCard() {
    // make the card
    var newToDo = document.createElement("article");
    newToDo.classList = "toDo";

    // make the header
    var newHeader = document.createElement("header");
    newHeader.classList = "toDo__header";

    // make the heading
    var newHeading = document.createElement("h2");
    newHeading.classList = "toDo__heading";
    newHeading.innerText = "Default";

    // make the section
    var newSection = document.createElement("section");
    newSection.classList = "toDo__body";

    // make the ul
    var newList = document.createElement("ul");
    newList.classList = "toDo__tasks";

    // make the footer
    var newFooter = document.createElement("footer");
    newFooter.classList = "toDo__footer";

    // make the input
    var newInput = document.createElement("input");
    newInput.classList = "toDo__input";
    newInput.type = "text";
    newInput.placeholder = "Enter a task...";

    newFooter.appendChild(newInput);
    newSection.appendChild(newList);
    newHeader.appendChild(newHeading);
    newToDo.appendChild(newHeader);
    newToDo.appendChild(newSection);
    newToDo.appendChild(newFooter);

    document.getElementsByTagName("body")[0].appendChild(newToDo);
    addEventsToInputs();
    changeTitleToInput();
}


