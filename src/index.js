const api = new ApiService
const restaurants = new DocuMenuService

const newUserForm = document.forms.new_user_form
    , restaurantSearch = document.forms.restaurants_search
    , restaurantResults = document.getElementById("restaurants_results");

const states = restaurantSearch.states
    , restaurantHeading = restaurantResults.querySelector("h3")
    , restaurantList = restaurantResults.querySelector("ul")
    , reservation = document.forms.new_reservation_form;

const mainColumn = document.getElementsByClassName("column2")
mainColumn[0].style.visibility = 'hidden'

newUserForm.addEventListener("submit", getNewUser)
reservation.addEventListener("submit", rsvp)

async function getNewUser(event) {
    event.preventDefault()

    let response = await api.createNewUser(new FormData(event.target))
        .then(response => {
            console.log("#1 sign on")
            if (!response.error) {

                const { user } = response
                let currentUser = user
                hideUserForm()
                const hiddenUserId = document.querySelector(".hidden_user_id")
                hiddenUserId.value = currentUser.id
            }
        })
    newUserForm.reset();
}

function hideUserForm() {
    newUserForm.style.display = "none";
}

states.addEventListener('change', selectState)

function reloadSelectElement() {
    location.reload()
}

async function selectState(event) {
    const states = event.target
        , state = (states.options[states.selectedIndex].text)
        , abbr = (states.options[states.selectedIndex].value);

    restaurantHeading.textContent = `Here's a list of restaurants in ${state}`

    let response = await restaurants
        .getRestaurants(abbr)

    console.log("#2 select state")
    list(response.data)

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

async function viewRestaurantDetails(event) {

    const restaurantId = event.target.closest("li").id

    const { result: restaurant } = await restaurants
        .getRestaurant(restaurantId)

    const { address } = restaurant
    const
        main = document.querySelector("main")
        , heading = main.querySelector("h1")
        , phone = main.querySelector("#phone")
        , website = main.querySelector("#website")
        , restaurantName = main.querySelector("[name='reservation[restaurant_name]']")
        , restuarantHours = document.getElementById("openHours")
        , priceRange = document.getElementById("reservation[price_range]")
        , reservedList = document.getElementById("reserved-list")
        , reservedHeading = document.getElementById("reserved-heading")
        , restaurantList = main.querySelector("ul")

    heading.textContent = restaurant.restaurant_name

    phone.textContent = restaurant.restaurant_phone
    phone.href = `tel:${restaurant.restaurant_phone}`
    restaurantName.value = restaurant.restaurant_name
    website.href = restaurant.restaurant_website
    restuarantHours.innerHTML = restaurant.hours
    console.log("#4 view restaurant")
    showReservationForm()
}


function resetSelectBox() {
    selectElement.selectedIndex = 0
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
}

async function viewReservationList() {

    const reservationList = document.getElementById("reserved_restaurants")
        , reservationHeading = reservationList.querySelector("h3")
        , resList = reservationList.querySelector("ol")
        , li = document.createElement("li")
        , p = document.createElement("p")

    reservationHeading.textContent = `Here's a list of your reservations`

    const allReservations = await api.getAllReservations()
        .then(reservations => {
            reservations.forEach(reservation => {
               
                const editButton = document.createElement('button')
                const deleteButton = document.createElement('button')
                editButton.innerHTML = "Edit Reservation"
                console.log("Res Id: ", reservation.id)
                editButton.addEventListener("click", () => api.updateReservation({ id: reservation.id }))
                deleteButton.innerHTML = "Delete Reservation"
                deleteButton.addEventListener("click", () => { deleteReservation(li, reservation) })


                p.innerHTML = reservation.restaurant_name + " - " + "Date Booked:" + reservation.booked_time + ",  " + "Reserved by:" + reservation.user.name;
                

                p.append(editButton)
                p.append(deleteButton)
                li.append(p)
                li.id = reservation.id
                reservationList.append(li)
                // const deleteButton = document.createElement('button')
                // deleteButton.id = reservation.id
                // deleteButton.innerHTML = "Delete Reservation"
                // deleteButton.addEventListener("click", deleteReservation)
            })
        })

    console.log("#6 show all resevations")

}

function newReservation(newUser) {
    let newReservationForm = document.getElementById("reservation_form")
    newReservationForm.addEventListener("submit", function (event) {
        event.preventDefault()
        console.log("newReservation", event.target)
        submitReservationData(event.target, newUser)
        console.log("you are here")

    })
}

function updateReservation() {

}

function deleteReservation(e, reservation) {
    api.deleteReservation({ id: reservation.id })
        .then(() => e.remove())
}
