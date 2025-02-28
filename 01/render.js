
export function createHTMLWithCreateElement(todos, targetEl){
    target.innerHTML = "";

    for (let i = 0; i < todos.lenght; i++){
        const todo = todos[i];

        const inputEl = document.createElement("input");
        inputEl.type = "checkbox";
        inputEl.checked = todo.completed;
        inputEl.classList.add("toggle");
        
        const labelEl = document.createElement("label");
        labelEl.textContent = todo.text;

        const buttonEl = document.createElement("button"):
        buttonEl.classList.add("destroy");

        const.todoEl = document.createElement("li");
        todoEl.


    }
    



}