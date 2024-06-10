let inputElem = document.getElementById('itemInput')
let addButton = document.getElementById('addButton')
let clearButton = document.getElementById('clearButton')
let todoListElem = document.getElementById('todoList')

let todosArray =[]

function addNewtodo(){
    let newTodoTitle = inputElem.value
   
    let newTodoobj={
        id: todosArray.length +1,
        title: newTodoTitle,
        complete: false
    }
    inputElem.value=''
    inputElem.focus()

    todosArray.push(newTodoobj)
    setLocalStorage(todosArray)
    todoGenerator(todosArray)
}

function setLocalStorage(todoList){
    localStorage.setItem('todos', JSON.stringify(todoList))
}

function todoGenerator(todoList) {

    let newTodoLiElem, newTodoLabal, newTodoCompleteBtn, newTodoDeleteBtn
    todoListElem.innerHTML=''

    todoList.forEach(todo => {
        newTodoLiElem = document.createElement('li')
        newTodoLiElem.className = 'completed well'

        newTodoLabal=document.createElement('label')
        newTodoLabal.innerHTML= todo.title

        newTodoCompleteBtn= document.createElement('button')
        newTodoCompleteBtn.className = 'btn btn-success'
        newTodoCompleteBtn.innerHTML = 'Complete'
        newTodoCompleteBtn.setAttribute('onClick', `editTodo(${todo.id})`)

        newTodoDeleteBtn= document.createElement('button')
        newTodoDeleteBtn.className = 'btn btn-danger'
        newTodoDeleteBtn.innerText='Delete'
        newTodoDeleteBtn.setAttribute('onClick', `removeTodo(${todo.id})`)

        if (todo.complete) {
            newTodoLiElem.className = 'uncompleted well'
            newTodoCompleteBtn.innerHTML = 'UnComplete'
            
        }

        newTodoLiElem.append(newTodoLabal, newTodoCompleteBtn, newTodoDeleteBtn)
        
        todoListElem.append(newTodoLiElem)

        console.log(newTodoLiElem);
    });
}

function editTodo(todoId) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosArray = localStorageTodos
    todosArray.forEach((todo)=>{
        if (todo.id=== todoId) {
            todo.complete = !todo.complete

        }
    })
    setLocalStorage(todosArray)
    todoGenerator(todosArray)
}

function removeTodo(todoId){
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosArray = localStorageTodos
    let maintodoIndex = todosArray.findIndex((todo)=>{
        return todo.id === todoId
    })

    todosArray.splice(maintodoIndex, 1)

    setLocalStorage(todosArray)
    todoGenerator(todosArray)
}

function getLocalStroge() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if(localStorageTodos){
        todosArray= localStorageTodos
    }else{
        todosArray=[]
    }
    todoGenerator(todosArray)
}

function clearTodos() {
    todosArray=[]
    todoGenerator(todosArray)
    localStorage.removeItem('todos')
}

window.addEventListener('load', getLocalStroge)
addButton.addEventListener('click', addNewtodo)
clearButton.addEventListener('click', clearTodos)
inputElem.addEventListener('keydown', (e)=>{
    if (e.code === 'Enter') {
        addNewtodo()
    }
})
