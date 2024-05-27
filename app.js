const baseUrl = "http://34.228.37.226:5050"
const userTable = document.getElementById("usersTable")

const fetchUsers = async () => {
    const response = await fetch(`${baseUrl}/users`)
    const users = await response.json()
    return users
}

const addUser = async () => {
    const name = document.getElementById("add-name").value
    const email = document.getElementById("add-email").value
    const age = document.getElementById("add-age").value
    const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, age })
    })
    hideAddForm()
    window.location.reload()
    return response.json()
}

const editUser = async (id) => {
    const name = document.getElementById("edit-name").value
    const email = document.getElementById("edit-email").value
    const age = document.getElementById("edit-age").value
    const response = await fetch(`${baseUrl}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, age })
    })
    window.location.reload()
    return response.json()
}

const deleteUser = async(id) => {
    const response = await fetch(`${baseUrl}/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    })
    window.location.reload()
    return response.json()
}

const createMaterialButton = (type, id) => {
    const button = document.createElement("button")
    button.className = `${type}`
    button.id = id
    icon = document.createElement("i")
    icon.className = "material-icons"
    icon.innerHTML = `${type}`
    button.appendChild(icon)
    return button
}

const fillTable = async () => {
    const users = await fetchUsers()
    users.forEach(user => {
        const tr = document.createElement("tr")
        Object.keys(user).forEach(key => {
            switch(key) {
                case "name":
                    const nameData = document.createElement("td")
                    nameData.innerHTML = user.name
                    tr.appendChild(nameData)
                    break
                case "email":
                    const emailData = document.createElement("td")
                    emailData.innerHTML = user.email
                    tr.appendChild(emailData)
                    break
                case "age":
                    const ageData = document.createElement("td")
                    ageData.innerHTML = user.age
                    tr.appendChild(ageData)
                    break
            }
        })
        const td = document.createElement("td")

        const editButton = createMaterialButton("edit", user.id)
        editButton.addEventListener("click", () => {
            showEditForm(user.id)
        })
        td.appendChild(editButton)
        
        const deleteButton = createMaterialButton("delete")
        deleteButton.addEventListener("click", async () => {
            await deleteUser(user.id)
        })
        td.appendChild(deleteButton)
        
        tr.appendChild(td)
        userTable.getElementsByTagName("tbody")[0].appendChild(tr)
    })
}

const showAddForm = () => {
    document.getElementById("add-form-overlay").style.display = "flex"
}

const hideAddForm = () => {
    document.getElementById("add-form-overlay").style.display = "none"
    window.location.reload()
}

const showEditForm = (id) => {
    document.getElementById("edit-form-overlay").style.display = "flex"
    document.getElementById("edit-user-btn").value = id
}

const hideEditForm = () => {
    document.getElementById("edit-form-overlay").style.display = "none"
    window.location.reload()
}