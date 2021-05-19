const selectElement = document.getElementById('select-state');
const restaurantList = document.getElementById("restaurant-list")
const restaurantHeading = document.getElementById("restaurant-heading")
const restaurantDetails = document.getElementById("restaurant_details")
const restauarantDetailList = document.getElementById("restaurantDetailed-info")
const restauntDetailHeading = document.getElementById("restaurantDetail-heading")
const reservedList = document.getElementById("reserved-list")
const reservedHeading = document.getElementById("reserved-heading")



function getNewUser() {
    let newUserForm = document.getElementById("new-user-form")
    newUserForm.addEventListener("submit", function(event){
        event.preventDefault()
        console.log("event", event.target[0].value)
        submitUserData(event.target)
    })
    newUserForm.reset()
}

getNewUser()

function submitUserData(signInForm){
   
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
    .then(newUser => newReservation(newUser))
    .catch(function(error) {
        alert("Please provide an email and user name to make restuarants reservations");
        console.log(error.message)
    })
}

selectElement.addEventListener("onclick",  selectedState)

function reloadSelectElement(){
    location.reload()	
    console.log("1st log")
}

function selectedState(sel) { 
        
    console.log("2nd log")
    stateName = (sel.options[sel.selectedIndex].text);

    stateAbbr = (sel.options[sel.selectedIndex].value);
    setURL()
            
     function setURL(){
        let url = "https://api.documenu.com/v2/restaurants/state/" + `${stateAbbr}` + "?key=13f89d501cb8105c1e10279570318eeb"
        fetchRestaurants()
            function fetchRestaurants(){
                fetch(url)
                .then(resp => resp.json())
                .then(data => renderRestaurants(data));
            }            
        }
    }

    function renderRestaurants(stateData){
        
        console.log("3rd log", stateData)

        const h = document.createElement('h3')
        h.innerHTML = `Here's a list of restaurants in ${stateName}`
        restaurantHeading.append(h)

        let restaurantURL = "Restaurant Wedsite"
        let restaurants = stateData.data
    
        for (let i = 0; i < restaurants.length; i++){
            renderRestaurant(restaurants[i]),
            restaurants[i].selectedIndex = 0;
        }
        function renderRestaurant(restaurant){
            
            const li = document.createElement('li')
            li.dataset.restaurantId = restaurant.restaurant_id
        
            const p = document.createElement('p')
        
            p.innerHTML = restaurant.restaurant_name+ " - " + "Phone number:" + restaurant.restaurant_phone + ",  " + restaurantURL.link(`${restaurant.restaurant_website}`)
        
            const viewMoreButton = document.createElement('button')
            viewMoreButton.id = "viewButton"
            viewMoreButton.innerHTML = "View More"
            const vMb = document.getElementById('viewButton');
            // button error
            vMb.addEventListener("click", function(event){
                console.log("4th log", event.target)
            })
            
            function viewRestaurantDetails(restaurant){
                console.log("4th log", restaurant)
                const detailHeading = document.createElement('h3')
                datailHeading.innerHTML = `Here is a little more details on ${restaurant.restaurant_name}`
                restauntDetailHeading.append(detailHeading)
                

                for (let i = 0; i < restaurant.length; i++){
                    (restaurant[i])
                    const li = document.createElement('li')
                    li.innerHTML = restaurant[i]
                    restauarantDetailList.appendChild(li)
                }

                const reserveButton = document.createElement('button')
                reserveButton.id = "reserveButton"
                reserveButton.innerHTML = "Reserve this restaurant"
                const reserveButtonSelector = document.getElementById("reserveButton") 
                reserveButtonSelector.addEventListener("click", newReservation)
            }

            p.appendChild(viewMoreButton)

            li.append(p)
            restaurantList.appendChild(li)
        }
        resetSelectBox()
    }
        
    function resetSelectBox(){
        selectElement.selectedIndex = 0
    }


    


    function newReservation(newUser){
        let newReservationForm = document.getElementById("reservation_form")
        newReservationForm.addEventListener("submit", function(event){
            event.preventDefault()
            console.log("newReservation", event.target)
            submitReservationData(event.target, newUser)
        })
    }
    
    function submitReservationData(reservationForm, newUser){
        console.log("New User", newUser.user.email)

        let data = {}
        data.restaurant_name = reservationForm[0].value
        data.booked_time = reservationForm[1].value  
        data.booked_email = newUser.user.email
        data.notes = reservationForm[3].value
        data.user_id = newUser.user.id

        console.log(data)
        let configObj = {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, 
                body: JSON.stringify(data)
        }
    
        return fetch("http://localhost:3000/reservations", configObj)
        .then(response => response.json())
        .then(newReservation => renderReservations(newReservation))
        .catch(function(error) {
            alert("Please ensure all the fields are completed to reserve your restaurant");
            console.log(error.message)
        })
    }
    
    function renderReservations(reservationData){
        
        // console.log("5th log", reservationData)
        
        // const h = document.createElement('h3')
        // h.innerHTML = `Here's a list of reservations for * Insert User Name Here*`
        // reservedHeading.append(h)

        // let reservation = reservationData.reservation
    
        // for (let i = 0; i < reservation.length; i++){
        //     renderRestaurant(restaurants[i]),
        // //     restaurants[i].selectedIndex = 0;
        // // }
        // // function renderRestaurant(restaurant){
            
        // //     const li = document.createElement('li')
        // //     li.dataset.id = restaurant.id
        
        // //     const p = document.createElement('p')
        
        // //     p.innerHTML = restaurant.restaurant_name+ " - " + "Phone number:" + restaurant.restaurant_phone + ",  " + restaurantURL.link(`${restaurant.restaurant_website}`)
        
        // //     li.append(p)
        // //     restaurantList.appendChild(li)
        // }
    
    }

function updateReservation(reservation) {

    data = {reservation: reservation} 
    let configObj = {
        method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, 
            body: JSON.stringify(data)
    }


 fetch(`http://localhost:3000/reservations/${reservation.id}`, configObj )
 .then(response => response.json())
 .then(reservation => console.log("Updated reservation", reservation))

}

function deleteReservation(reservation) {
    data = {reservation: reservation} 
    let configObj = {
        method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, 
            body: JSON.stringify(data)
    }
    fetch(`http://localhost:3000/reservations/${reservation.id}`, configObj )
    .then(response => response.json())
    .then(reservation => console.log("Deleted reservation", reservation))
   
}



