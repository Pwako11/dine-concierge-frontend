const api = new ApiService
const restaurants = new DocuMenuService

const newUserForm = document.forms.new_user_form
    , restaurantSearch = document.forms.restaurants_search
    , restaurantResults = document.getElementById("restaurants_results")
    , newUserHeading  = document.getElementById("userWelcome")

const states = restaurantSearch.states
    , restaurantHeading = restaurantResults.querySelector("h3")
    , restaurantList = restaurantResults.querySelector("ul")
    , reservation = document.forms.new_reservation_form;

const mainColumn = document.getElementsByClassName("column2")
mainColumn[0].style.visibility = 'hidden'

newUserForm.addEventListener("submit", getNewUser)
reservation.addEventListener("submit", rsvp)
states.addEventListener('change', selectState)

var currentUser;

async function getNewUser(event) {
    event.preventDefault()

    let response = await api.createNewUser(new FormData(event.target))
        .then(response => {
            console.log("#1 sign on")
            if (!response.error) {
                const { user } = response
                currentUser = user
                hideUserForm()
                const hiddenUserId = document.querySelector(".hidden_user_id")
                hiddenUserId.value = currentUser.id
                newUserHeading.textContent = `${currentUser.name} select a state to view a list of available restaurants` 
                console.log(currentUser)
            }
        })
    newUserForm.reset(); 
}

function hideUserForm() {
    newUserForm.style.display = "none";
}

async function selectState(event) {
    event.preventDefault()
    const states = event.target
        , state = (states.options[states.selectedIndex].text)
        , abbr = (states.options[states.selectedIndex].value);

    restaurantHeading.textContent = `Here's a list of restaurants in ${state}`

    let response = await restaurants
        .getRestaurants(abbr)

    console.log("#2 select state")
    list(response.data)
    resetSelectBox()
}

function list(restaurants) {
    restaurantList.innerHTML = ""
    for (const restaurant of restaurants) {
        let restaurantURL = restaurant.restaurant_website
        const li = document.createElement('li')
            , p = document.createElement('p')
            , viewMoreButton = document.createElement('button')

        p.innerHTML = restaurant.restaurant_name + " - " + "Phone number:" + restaurant.restaurant_phone + ",  " + restaurantURL.link(`${restaurant.restaurant_website}`)
        viewMoreButton.innerHTML = "View More"
        viewMoreButton.addEventListener("click", viewRestaurantDetails)
        p.append(viewMoreButton)
        li.append(p)
        li.id = restaurant.restaurant_id
        restaurantList.append(li)
    }
    console.log("#3 list restaurants")

}

function resetSelectBox() {
    states.selectedIndex = 0
}

function reloadSelectElement(){
    // states.reload()	
    restaurantList.innerHTML = "";
}


async function viewRestaurantDetails(event) {

    const restaurantId = event.target.closest("li").id

    const { result: restaurant } = await restaurants
        .getRestaurant(restaurantId)

    const { address } = restaurant
    const {geo} = restaurant
    
    const
        main = document.querySelector("main")
        , heading = main.querySelector("h1")
        , stAddress = main.querySelector("h3")
        , phone = main.querySelector("#phone")
        , website = main.querySelector("#website")
        , restaurantName = main.querySelector("[name='reservation[restaurant_name]']")
        , priceRange = document.getElementById("price_range")
    

    heading.textContent = restaurant.restaurant_name
    stAddress.textContent = address.formatted
    phone.textContent = restaurant.restaurant_phone
    phone.href = `tel:${restaurant.restaurant_phone}`
    restaurantName.value = restaurant.restaurant_name
    website.textContent = restaurant.restaurant_website
    website.href = `restaurant.restaurant_website`
    priceRange.value = restaurant.price_range_num
    console.log("#4 view restaurant")
    showReservationForm()
}

function showReservationForm() {
    if (mainColumn[0].style.visibility === "hidden") {
        mainColumn[0].style.visibility = "visible"
    }
}

function rsvp(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    api.submitResevationData(formData)
    console.log("#5 reserve selected restaurant")
    viewReservationList()
    form.reset()
}

async function viewReservationList() {
    let reservedUser = currentUser
    const reservationList = document.getElementById("reserved_restaurants")
        , reservationHeading = reservationList.querySelector("h3")
        , resList = reservationList.querySelector("ol")
        , li = document.createElement("li")
        , p = document.createElement("p")

    reservationHeading.textContent = `Here's a list of your reservations`

    const allReservations = await api.getAllReservations()
        .then(reservations => {
            reservations.forEach(reserved => {
                const deleteButton = document.createElement('button')
                deleteButton.innerHTML = "Delete Reservation"
                deleteButton.addEventListener("click", () => { deleteReservation(li, reserved) })

                console.log("flow Current User global", currentUser.id)
                console.log("flow Current User local", reserved.user_id)

                if (reservedUser.id === reserved.user_id) {
                    p.innerHTML = reserved.restaurant_name + " \n " + "Date Booked:" + reserved.booked_time + " \n " + "Reservation Notes:" + reserved.notes +" \n "+ "Reserved by:" + reserved.user.name;
                
                    p.append(deleteButton)
                    li.append(p)
                    li.id = reserved.id
                    resList.append(li)
                }
            })
        })

    console.log("#6 show all resevations")
    

}

function deleteReservation(e, reservation) {
    api.deleteReservation({ id: reservation.id })
        .then(() => e.remove())
}