
export function createHtmlWithCreateElement(todos, targetEl) {
    targetEl.innerHTML = ''

    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];

        // Prepare elements
        const inputEl = document.createElement('input');
        inputEl.classList.add('toggle');
        inputEl.type = 'checkbox';
        inputEl.checked = todo.completed;

        const labelEl = document.createElement('label');
        labelEl.textContent = todo.text;

        const buttonEl = document.createElement('button');
        buttonEl.classList.add('destroy');

        // Append these elements to the todo wrapper element
        const todoEl = document.createElement('li');
        todoEl.append(inputEl, labelEl, buttonEl)

        // Append todo to the page
        targetEl.append(todoEl);
    }
}

export function createHtmlWithStrings(todos, targetEl) {
    targetEl.innerHTML = ''

    for (const todo of todos) {
        let html =
            '<li>' +
            '  <input class="toggle" type="checkbox" ' + (todo.completed ? 'checked' : '')  + '>' +
            '  <label>' + todo.text + '</label>' +
            '  <button class="destroy"></button>' +
            '</li>';

        targetEl.insertAdjacentHTML('beforeend', html);
    }
}

export function createHtmlWithStrings(todos,targetEl){
    targetEl.innerHTML = "";
     
    // var funguje i s redeklarací
    // var má funkcionální scope, všude ve funkci. 
    // pokud není ve funkci tak je prakticky globální
    // let a const mají blokový scope.

    
    var todosHTMLArray = todos.map(function (todo){
        var html = `
        <li>
            <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
            <label>${todo.text}</label>
            <button class="destroy"></button>
        </li>
    `;
    return html;
    

        
    })


    var todosHtml = todosHTMLArray.join(""); // tohle bude nějaký string
    targetEl.innerHTML = todosHtml;






}