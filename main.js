// gerekli HTML elementleri
const form = document.querySelector(".grocery-form")
const groceryInput = document.getElementById("grocery")
const groceryList = document.querySelector(".grocery-list")
const alert_ = document.querySelector(".alert")
const clear_btn = document.querySelector(".clear-btn")
const submit_btn = document.getElementById("submit")


let editFlag = false
let database = []
groceryInput.focus() 

function displayAlert(text, action) {
    alert_.innerHTML = text
    alert_.classList.add(`alert-${action}`)
    alert_.classList.remove("alert-hidden")
    setTimeout(() => {
        alert_.classList.add("alert-hidden")
        alert_.classList.remove(`alert-${action}`)
    }, 2000)
}

//! olaylar
form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (groceryInput.value !== "") {
        groceryList.innerHTML = ""
        if (!editFlag) {            
            const zaman = new Date().getTime().toString()
            database.push({ "id": zaman, "grocery": groceryInput.value })
            clear_btn.classList.remove("alert-hidden")
            groceryInput.value = ""
            database.forEach(listele)
            displayAlert('Kayıt başarılı', "success")
        } else {
            editFlag = false
            submit_btn.textContent = "Ekle"
            const update_item = database.find(item => item.id == submit_btn.getAttribute("update-id"))
            const update_index = database.indexOf(update_item)
            database[update_index].grocery = groceryInput.value            
            groceryInput.value = ""
            database.forEach(listele)
            displayAlert("İtem güncellendi", "success")
        }
    } else {
        displayAlert('Lütfen bir değer giriniz!', "warning")
    }
    groceryInput.focus()
})

function listele(item) {
    const element = document.createElement("article")
    //let attr = document.createAttribute("data-id")
    //attr.value = id
    //element.setAttribute(attr)
    element.setAttribute("data-id", item.id) // Kısa yöntem
    element.className = "grocery-item"
    element.innerHTML = `
        <p class="title">${item.grocery}</p>
        <div class="buton-container">
            <button type="button" class="btn edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" class="btn del-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>    `

    const editBtn = element.querySelector(".edit-btn")
    editBtn.addEventListener("click", (e) => {
        submit_btn.textContent = "Güncelle"
        editFlag = true
        groceryInput.value = element.firstElementChild.textContent
        groceryInput.focus()
        element.style.backgroundColor = "yellow"
        const update_id = element.getAttribute("data-id")
        submit_btn.setAttribute("update-id", update_id)
        //delBtn.classList.add("alert-hidden")
        e.currentTarget.nextElementSibling.classList.add("alert-hidden")
    })

    const delBtn = element.querySelector(".del-btn")
    delBtn.addEventListener("click", () => {
        element.remove()
        let item = database.find(eleman => eleman.id == element.getAttribute("data-id"));
        let index = database.indexOf(item);
        // database den siliyoruz
        if (index !== -1) database.splice(index, 1)
        if (database.length == 0) clear_btn.classList.add("alert-hidden")
        displayAlert('Kayıt silindi', "danger")
        groceryInput.focus()
    })
    groceryList.appendChild(element)
}

clear_btn.addEventListener("click", () => {
    groceryList.innerHTML = ""
    database = []
    clear_btn.classList.add("alert-hidden")
    displayAlert('Liste boş', "danger")
    groceryInput.focus()
})





