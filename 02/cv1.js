import { createHtmlWithCreateElement, createHtmlWithStrings } from "./render.js";

console.log('Module cv1.js is loaded.');

const state = {
    todos: [
        { text: 'Hi', completed: true },
        { text: 'Hello', completed: false },
        { text: 'Hi there!', completed: true },
        { text: 'tohle',completed: false}
    ],
    filter: 'all'
};

const todoListEl = document.querySelector('.todo-list');
createHtmlWithCreateElement(state.todos, todoListEl);
// createHtmlWithStrings(state.todos, todoListEl);


Object.prototype.addTimestamp = function () {
    this.timestamp = Date.now();
} // my jsem libovolnýmu objektu nastavili vlastnost .addTimestamp
createHtmlWithStrings(state.todos, todoListEl);


var filters = {
    all: document.querySelector('#filter-all'),
    active: document.querySelector('#filter-active'),
    completed: document.querySelector('#filter-completed')
};

for (var filterName in filters) {
    // TODO
}