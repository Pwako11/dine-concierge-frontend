class User {
    constructor(user) {
        this.email = user.email
        this.name = user.name
        this.id = user.id
        this.addUserToDom()
    }

    addUserToDom(){
        const hidden = document.querySelector(".hidden_user_id")
        hidden.value = this.id
    }

}