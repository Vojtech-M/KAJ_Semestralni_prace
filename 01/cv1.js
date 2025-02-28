import {createHTMLWithCreateElement } from "render.js"

console.log("tohle je modul");


const state = {
    todos: [
        { text: 'Hi', completed: true },
        { text: 'Hello', completed: false },
        { text: 'Hi there!', completed: true },
    ],
    filter: 'all'
};

const todoList = document.querySelector(".todo-list");
createHTMLWithCreateElement(state.todos, todolistElement);



// document.createElement("li"); takhle se da vytvorit element

/*
    Template:

    <li>
        <div class="view">
            <input class="toggle" type="checkbox">
            <label>aaa</label>
            <button class="destroy"></button>
        </div>
    </li>
*/