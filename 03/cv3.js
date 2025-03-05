import { createHtmlWithCreateElement, createHtmlWithStrings } from "./render.js";


/* Predefined initial state */
const initialState = {
    todos: [
        { text: 'Hi', completed: true  },
        { text: 'Hello', completed: false },
        { text: 'Hi there!', completed: true },
    ],
    filter: 'all'
};

// Add method on Object prototype. This method will modify the object
// and add current timestamp to it. All created objects inherit from
// Object prototype and will have this method.
Object.prototype.addTimestamp = function () {
    this.timestamp = Date.now();
}
// You should generally avoid modifying prototypes of basic JavaScript
// objects, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// But it can be sometimes useful, for example, if we want to polyfill
// some language feature to older browsers.


//
// 2. New class syntax
//
class State {
    #todos;
    #filter;

    constructor(initialTodos, initialFilter) {
        // # privátní vlastnoti
        this.#todos = initialTodos;
        this.#filter = initialFilter;
    }

    addTodo(todo) {
        this.#todos.push(todo);
    }

    setFilter(filter) {
        this.#filter = filter;
    }

    getTodos() {
        //
        // 3. Arrow functions
        // 
        return this.#todos.filter((todo) => {
            
            console.log(this);


            if (this.#filter === 'all') {
                return true;
            } else if (this.#filter === 'completed') {
                return todo.completed === true;
            } else if (this.#filter === 'active') {
                return todo.completed === false;
            }
        });
    }
}

console.log("test")


const state = new State(initialState.todos, initialState.filter);
const todoListEl = document.querySelector('.todo-list');
createHtmlWithStrings(state.getTodos(), todoListEl);

const inputEl = document.querySelector('.new-todo');
inputEl.addEventListener('keyup', function (event) {
    // EXERCISE: inspect the event object in dev console

    if (event.key !== "Enter") {
        return;
    }

    // Update app state
    let todo = {
        text: inputEl.value,
        completed: false
    };
    state.addTodo(todo);

    // Update html
    inputEl.value = '';
    createHtmlWithStrings(state.getTodos(), todoListEl);
});


const filters = {
    all: document.querySelector('#filter-all'),
    active: document.querySelector('#filter-active'),
    completed: document.querySelector('#filter-completed')
};

//
// 3. arrow functions
// 4. `for of` loop
// 5. destructuring
//

//
//for (let value of Object.keys(filters)){
//    console.log(value)
//}

for (const [filterName, filterEl] of Object.entries(filters)) {
    filterEl.addEventListener('click', () => {
        filtersClick(filterName);
    });
}
/* 

for (let [filterName, filterEL]of Object.keys(filters)){
    console.log(value)
    // entries je pole 
    let [filterName,filterEL] = value;

    filter.addEventListener("click", funciton({
        filtersClick([filterName, filterEl]);
    }
    ))


    console.log(filterName, filterEl)
}

// destrukturalizace
let [a,b] = ["podle","indexu"]
console.log(a)

// v objektu je potřeba mít {} závorky
let {c,d} = {c: "podle", d: "klice"}

 */

function filtersClick (newFilterType) {
    
    // přepsání for in na for of

    for (const filterEl in Object.values(filters)){
        filterEL.classList.remove("selected");
    }
    
    // Add 'selected' class to clicked filter button
    filters[newFilterType].classList.add('selected');

    // Update state
    state.setFilter(newFilterType);

    // Render todos view
    createHtmlWithCreateElement(state.getTodos(), todoListEl);

        
    // Another approach to rendering the view, manually update html
    // nodes that need to be updated instead of rerendering the whole
    // part of the UI, as we did in createHtmlWithStrings or in
    // createHtmlWithCreateElement functions.

    // Remove 'selected' class on all filter buttons
   /*  for (var key in filters) {
        if (filters.hasOwnProperty(key)) {
            var filter = filters[key];
            filter.classList.remove('selected');
        }
    }

    // Add 'selected' class to clicked filter button
    filters[newFilterType].classList.add('selected');

    // Update state
    state.setFilter(newFilterType);

    // Render todos view
    createHtmlWithCreateElement(state.getTodos(), todoListEl); */
}