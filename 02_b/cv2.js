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


//
// 1. Prototype expansion
//
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
// 2. Class containing state
//
var State = function (initialTodos, initialFilter) {
    this._todos = initialTodos;
    this._filter = initialFilter;
}

State.prototype.addTodo = function (todo) {
    this._todos.push(todo);
}

State.prototype.setFilter = function (filter) {
    this._filter = filter;
}
State.prototype.getTodos = function(){
    return this._todos.filter(function(todo){
        if (this._filter === "all"){
            return true;
        } else if (this._filter == true){
            return todo.completed == "Completed"

        } else if  (this._filter == false){
            return todo.completed == "Active"


        }
    }.bind(this)) 

    // co dělá bind
    // vezme ten objekt, který je parametr bindu, this nastvaí na 

    //call provede tu funkci jenom jednou
    // bind žádnou funkci nevolá, ale vrací kompletne novnou funkci, tím prvním paramterem nahradí všechny slovíčka this uvnitř tý funkce

}

// memotechnická pomůcka na this.
// na ten objekt na kterým ten objekt voláme

// když je tam tečka něco.sasdfasf, tak to this ukazuje an to co je před tečkou (někdy)




var state = new State(initialState.todos, initialState.filter);
var todoListEl = document.querySelector('.todo-list');
createHtmlWithStrings(state.getTodos(), todoListEl);


//
// 4. Handle main input
//
var inputEl = document.querySelector('.new-todo');
inputEl.addEventListener('keyup', function (event) {
    
    // EXCERCISE: inspect the event object in dev console

    if (event.key !== "Enter") { // tady je input
        return;
    }

    // Update app state
    var todo = {
        text: inputEl.value,
        completed: false // todo pole je o 1 delší 
    };
    state.addTodo(todo);

    // Update html
    inputEl.value = '';
    createHtmlWithStrings(state.getTodos(), todoListEl);
});

//
// 5. Handle filters
//
var filters = {
    all: document.querySelector('#filter-all'),
    active: document.querySelector('#filter-active'),
    completed: document.querySelector('#filter-completed')
};


// přes for in cyklus
// for in prochází i těmi vlastnotmi z těch prototypů, má to i Timestamp, který má každý objekt
// to musíme ošetřit
// nejdřív se snaží najít vlastnoti k tomu a až nakonec ty prototypy.

Object.prototype.addTimestamp = function(){
this.timestamp = Date.now();

}



for (var filterName in filters) {
    console.log("this is filter:" + filterName)


    // ty listnery dáme jan na tlačítka, která mají vlastní property
    // když to má, tak na něj dáme listenery
    if (filters.hasOwnProperty(filterName)) {
        var filterEl = filters[filterName];
        
        
        // toto je IIFE
       // (function(capcutredFilterName){
        //    filterEl.addEventListener("click", function(e){
         //       console.log(capcutredFilterName);
          //  });
       // })(filterName);

        (function(capcutredFilterName){
            filterEl.addEventListener("click", function(e){
                filtersClick(capcutredFilterName)
            
            });
        })(filterName);
    }

// tady přidávám selected class
// hasOwnproperty, je to je vlasní a ne zděděná. 
    function filtersClick(newFilterType){
        
        // všem smažeme classu selected
        for (var key in filters) {
            if (filters.hasOwnProperty(key)){
                var filter = filters[key];
                filters.classList.remove["selected"]

                // Kdyby se použilo className = "selected"

            }

        }

        // Přidat jenom na element, který chceme
        filters[newFilterType].classList.add("selected");

        state.setFilter(newFilterType);

        createHtmlWithStrings(state.getTodos(),todoListEl);



    }
}
