let loaderLetters = document.querySelectorAll('.loader__char')
let loader = document.querySelector('.loader')
let emojiList = ['🔥','❤️','✨','📚','🐱','🚀']
let emojiListContainer = document.querySelector('.todo__emoji-list')
let todoAddBtn = document.querySelector('.todo__btn')
let todoContainer = document.querySelector('.todo__list')

function loaderAnim(){
    loaderLetters.forEach(function(element, index){
        // console.log(element, index)
        element.style.animation = 'wave 0.1s linear 0s 2 alternate'
        element.style.animationDelay = index / 10 + 's'
  
        setTimeout(()=>{
            element.style.animation = ''
        },900)
    })
      
}

function renderEmojiCard(){
    emojiList.forEach(function(element,id){
      
        let div = document.createElement('div')
        // console.log(div)
        div.innerHTML = `<input type="radio" id = "emoji${id}" class="emoji__toggler" name="emoji">
        <label for="emoji${id}" class="emoji__label">${element}</label>`
        emojiListContainer.appendChild(div)

      
    })
}

function getInputValue(){
    let input = document.querySelector('.todo__input')
    let value = input.value
    if(value.length != 0){
        return value
    }else{
        alert('Заполните инпут')
    }
}
function getEmoji(){
    let emojiLabel = document.querySelector('.emoji__toggler:checked ~ .emoji__label')
    if(emojiLabel != null){
        return emojiLabel.innerHTML
    }else{
        return null
    }
}

let loaderInterval = setInterval(loaderAnim, 1000)


window.onload = function(){
    addListenersOnCard()
    addRemoveOnCard()
    addRenameOnCard()

    loader.style.display = "none"
    clearInterval(loaderInterval)
    renderEmojiCard()
    todoAddBtn.onclick = function(){
        let returnedValue = getInputValue()
        let returnedEmoji =  getEmoji()
        let timeStamp = Date()
        if(returnedValue != undefined){    
            let todoData = {
                todoTitle:returnedValue,
                emoji:returnedEmoji,
                timeStamp:timeStamp
            }
            createTodo(todoData)
            setToStorage()
            getFromStorage()

            addListenersOnCard()
            addRemoveOnCard()
            addRenameOnCard()
        }
    }
}

function createTodo(dataObject){
    let title = dataObject.todoTitle
    let emoji = dataObject.emoji
    let timeStamp = dataObject.timeStamp

    if(emoji == null){
        emoji = ''
    }

    let todoDiv = document.createElement('div')
    todoDiv.classList.add('todo__item')
    todoDiv.innerHTML = `  <h2 class="todo__item-header">
        <span class="todo__item-emoji">${emoji}</span>
        <span class="todo__item-title">${title}</span>
    </h2>
    <div class="todo__item-btns">
        <button class="todo__item-rename">
            <img src="/images/rename-ic.svg" alt="pencil">
        </button>
        <button class="todo__item-delete">
            <img src="/images/delete-ic.svg" alt="cross">
        </button>
    </div>
    <p class="todo__item-timestamp">
        создан:${timeStamp}
    </p>`
    todoContainer.appendChild(todoDiv)

}

function addListenersOnCard(){
    let todoCards = document.querySelectorAll('.todo__item')
    todoCards.forEach(function(element){
        element.onclick = function(){
                element.classList.toggle('todo__item_complete')
        }
    })
}

function addRemoveOnCard(){
    let todoDeleteBtns = document.querySelectorAll('.todo__item-delete')
    todoDeleteBtns.forEach(function(element){
        element.onclick = function(){
            let parentCard = element.closest('.todo__item')
            console.log(parentCard)
            parentCard.remove()
            setToStorage()
        }
    })
}

function addRenameOnCard(){
    let todoRenameBtns = document.querySelectorAll('.todo__item-rename')
    todoRenameBtns.forEach(function(element){
        element.onclick = function(){
            let newTitle = prompt()
            if(newTitle === null){
                createMessageResponce("заявка не изменена")
            }
            else if(newTitle.length === 0){
                createMessageResponce("не указали имя заявки")
            }
            else{
                let todoCard = element.closest('.todo__item')
                let title = todoCard.querySelector('.todo__item-title')
                title.innerHTML = newTitle
                setToStorage()
            }
        }
    })  
}

function createMessageResponce(message){
    let messageContainer = document.createElement('p')
    messageContainer.classList.add('todo__rename-message')
    messageContainer.innerHTML = message
    let body = document.querySelector('body')
    body.appendChild(messageContainer)
    setTimeout(function(){
        messageContainer.remove()
    },5000)
}


function setToStorage(){
    localStorage.setItem('todosHtml', todoContainer.innerHTML)
}
function getFromStorage(){
    let htmlTemplate = localStorage.getItem('todosHtml')
    todoContainer.innerHTML = htmlTemplate
}
getFromStorage()