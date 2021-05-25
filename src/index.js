const api = new ApiService
const restaurants = new DocuMenuService 

const newUserForm = document.forms.new_user_form
const restaurantSearch = document.forms.restaurants_search
const restaurantResults = document.getElementById ("restaurants_results") 

const states = restaurantSearch.states
const restaurantHeading = restaurantResults.querySelector ("h3")
const restaurantList =  restaurantResults.querySelector ("ul")
const reservation = document.forms.new_reservation_form

newUserForm.addEventListener("submit", getNewUser)
reservation.addEventListener("submit", rsvp )


async function getNewUser(event) {
    event.preventDefault()
    
    let response = await api.createNewUser(new FormData(event.target))

    newUserForm.reset();   
}

states.addEventListener('change', selectState)

function reloadSelectElement(){
    location.reload()	
    console.log("1st log")
}

async function selectState(event) { 
    const states = event.target
    const state = (states.options[states.selectedIndex].text);
    const abbr = (states.options[states.selectedIndex].value);
  
    restaurantHeading.textContent = `Here's a list of restaurants in ${state}`
    
   let response = await restaurants
        .getRestaurants(abbr)
    
    list(response.data)
}

function list(restaurants){
    restaurantList.innerHTML = ""
    for( const restaurant of restaurants) {
        let restaurantURL = restaurant.restaurant_website   
        const li = document.createElement('li')          
        const p = document.createElement('p')
        const viewMoreButton = document.createElement('button')    
        
        p.innerHTML = restaurant.restaurant_name + " - " + "Phone number:" + restaurant.restaurant_phone + ",  " + restaurantURL.link(`${restaurant.restaurant_website}`)
        viewMoreButton.innerHTML = "View More" 
        viewMoreButton.addEventListener("click", viewRestaurantDetails)
        p.append (viewMoreButton)
        li.append(p)
        li.id = restaurant.restaurant_id
        restaurantList.append(li)    
    }
}
    
async function viewRestaurantDetails(event) {

    
    const restaurantId = event.target.closest("li").id
    
    const {result:restaurant} = await restaurants
        .getRestaurant(restaurantId )

    const {address} = restaurant
    const 
            main = document.querySelector("main")
        ,   heading = main.querySelector ("h1")
        ,   phone = main.querySelector("#phone")
        ,   restaurantName = main.querySelector("[name='reservation[restaurant_name]']")
    const reservedList = document.getElementById("reserved-list")
    const reservedHeading = document.getElementById("reserved-heading")
    
    const restaurantList =  main.querySelector ("ul")
    
    heading.textContent = restaurant.restaurant_name
        
    phone.textContent = restaurant.restaurant_phone
    phone.href =`tel:${restaurant.restaurant_phone}` 
    restaurantName.value = restaurant.restaurant_name 
    
    
}
        
    function resetSelectBox(){
        selectElement.selectedIndex = 0
    }


    // function handleResDetailViewClick(e) {
    //     switch (e.taget.className) {
    //         case "restaurants-list"
    //         getRestaurant(e.target.dataset.id)
    //         break
    //         default:
    //             return 
    //     }
    // }

    // function getRestaurant(id) {
    //     const mainDisplayDiv = document.getElementById("restaurant_details")
    // }


    function rsvp(event) {
        event.preventDefault()
        const form = event.target
        var formData = new FormData(form)
       
        api.submitResevationData(formData)

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

        
        .then(newReservation => renderReservations(newReservation))
        .catch(function(error) {
            alert("Please ensure all the fields are completed to reserve your restaurant");
            console.log(error.message)
        })
    }
    
//     function getAllReservations(){
//         const restRes = api.get("/reservations")
//         .then(reservations => {
//             const resHeading = document.createElement('h3')
//             resHeading.innerHTML = `Here's a list of reservations for * Insert User Name Here*`
//             reservedHeading.append(resHeading)
//             const resList = document.getElementById("reserved-list") 
//             reservations.forEach(reservation => {
//                 newRes = new Resevation(reservation)
//                 resList.innerHTML += newRes.renderLiTag()

//                 const deleteButton = document.createElement('button')
//                 deleteButton.id = reservation.id
//                 deleteButton.innerHTML = "Delete Reservation"
//                 deleteButton.addEventListener("click", deleteReservation)
//             })
//      }



//     function renderAllReservations(reservation) {
//         console.log(reservation)
        
          
//         const li = document.createElement('li')
//         li.dataset.id = reservation.id
        
//         const resName = document.createElement('p')
//         const bookTime = document.createElement('p')
//         const resNotes = document.createElement('p')

//         const editButton = document.createElement('button')
//         editButton.id = reservation.id
//         editButton.innerHTML = "edit Reservation"
//         const editRes = document.getElementById('editButton');
//             // button error
//         editRes.addEventListener("click", function(event){
//                 console.log("4th log", event.target)
//             })

//             const deleteButton = document.createElement('button')
//             deleteButton.id = reservation.id
//             deleteButton.innerHTML = "Delete Reservation"
//             deleteButton.addEventListener("click", deleteReservation);
//                 // button error
            
//         resName.innerHTML = reservation.restaurant_name 
//         bookTIme.innerHTML = reservation.booked_time
//         resNotes.innerHTML = reservation.notes
        
//         li.append(resName)
//         li.append(bookTime)
//         li.append(resNotes)
//         li.append(editButton)
//         li.append(deleteButton)
//         reservedList.appendChild(li)
    
//     }

// function updateReservation() {

// }

// function deleteReservation(e) {
//     e.target.parentNode.remove()
// }