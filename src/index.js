function getNewUser() {
    let newUserForm = document.getElementById("new-user-form")
    newUserForm.addEventListener("submit", function(event){
        event.preventDefault()
        console.log("event", event.target[0].value)
        submitData(event.target)
    })
    newUserForm.reset()
}

getNewUser()

function submitData(signInForm){
   
    let data = {}
    data.email = signInForm[0].value
    data.name = signInForm[1].value
    
    let configObj = {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, 
            body: JSON.stringify(data)
    }

    return fetch("http://localhost:3000/users", configObj)
    .then(response => response.json())
    .then(reservation => console.log("reservation", reservation))
    .catch(function(error) {
        alert("Please provide an email and user name to make restuarants reservations");
        console.log(error.message)
    })
}