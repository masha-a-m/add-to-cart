import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-f7b9a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

        // Challenge: Use the Firebase function 'push' to push inputValue to the database
        push(shoppingListInDB, inputValue)

         clearInputFieldEl()

            // Challenge: Clear the input field when button is pressed



            // Challenge: Append a new <li> with text content inputValue to the 'shopping-list' <ul>

            // create a list item
        // let li= document.createElement("li")
        //     //append text to li: <li> input value </li>
        // li.textContent = inputValue;
        //     //append li to ul
        // shoppingListEl.appendChild(li)

        //or

        // shoppingListEl.innerHTML += `<li>${inputValue}</li>`


})


onValue(shoppingListInDB, function(snapshot) {

    // console.log(snapshot.val())

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

    // console.log(snapshot.val())

    clearShoppingListEl()

    // shoppingListEl.innerHTML = ""

    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        
        appendItemToShoppingListEl(currentItem)
    }
    } else {
        shoppingListEl.innerHTML = "No items here... yet!"
    }
    
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}
            
function appendItemToShoppingListEl(item){
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li");

    newEl.textContent = itemValue

     newEl.addEventListener("click", function() {
        // Challenge: Make a let variable called 'exactLocationOfItemInDB' and set it equal to ref(database, something) where you substitute something with the code that will give you the exact location of the item in question.
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        // Challenge: Use the remove function to remove the item from the database
        remove(exactLocationOfItemInDB)
    })
    

    shoppingListEl.append(newEl)
}