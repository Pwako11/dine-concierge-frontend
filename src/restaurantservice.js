class RestaurantService {

    constructor() {
        this.restaurantsUrl = "http://localhost:3000/";
    }

    getRestaurants(stateAbbr){
        return fetch(this.restaurantsUrl + stateAbbr)
        .then(response => response.json())
        .catch(error  => console.log(error.message))
    }

    getRestaurant(id, state) {
        return fetch(this.restaurantsUrl + state + "?restaurant_id=" + id)
        .then(response => response.json())
    }
}