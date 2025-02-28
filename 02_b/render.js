
/*
    Template example:
    <li>
        <input class="toggle" type="checkbox" checked>
        <label>aaa</label>
        <button class="destroy"></button>
    </li>
*/
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

// 3. Rewrite the function
export function createHtmlWithStrings(todos, targetEl) {
    targetEl.innerHTML = '';

    var todosHtmlArray = todos.map(function (todo) {
        var html = `
            <li>
                <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
                <label>${todo.text}</label>
                <button class="destroy"></button>
            </li>
        `;
        return html;
    });
    // EXERCISE: try to use reduce instead of map

    var todosHtml = todosHtmlArray.join('');
    targetEl.innerHTML = todosHtml;
    // EXERCISE: try to use insertAdjacentHTML instead of innerHTML, what is the difference between these two
}