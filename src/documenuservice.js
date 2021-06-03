class DocuMenuService {

    constructor() {
        this.restaurantsUrl = "https://api.documenu.com/v2/restaurants/state/";
        this.restaurantUrl = "https://api.documenu.com/v2/restaurant/";
    }

    getRestaurants(stateAbbr){
        return fetch(this.restaurantsUrl + stateAbbr +"/?key=eb3131f29b527829a3249a72c149d9b0")
        .then(response => response.json())
    }

    getRestaurant(id) {
        return fetch(this.restaurantUrl + id  + "/?key=eb3131f29b527829a3249a72c149d9b0")
        .then(response => response.json())
    }
}