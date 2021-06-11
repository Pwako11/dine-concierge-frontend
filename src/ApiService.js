class ApiService {
    constructor() {
        this.baseUrl = "http://localhost:3000";
    }

    get(url){
        return fetch(this.baseUrl + url)
        .then(response => response.json())
    }

    getAllReservations() {
        return fetch(this.baseUrl + "/reservations")
        .then(response => response.json())
    }

    createNewUser(user) {
        let configObj = {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, 
                body: JSON.stringify({user: Object.fromEntries(user)})
        }

        return fetch(this.baseUrl +"/users", configObj)
        .then(response => response.json())
    }


    submitResevationData(reservation) {
        
        let configObj = {
            method: 'POST',
            body: reservation
        }
    
        return fetch(this.baseUrl + "/reservations", configObj)
        .then(response => response.json())
    }

        deleteReservation = (reservation) => {
            let configObj = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, 
                body: JSON.stringify({reservation: reservation})
            }
            console.log("delete: ", this.baseUrl + "/reservations" + `/${reservation.id}`)
        return fetch(this.baseUrl + "/reservations" + `/${reservation.id}`, configObj )
        .then(response => response.json())
        
    }  
}