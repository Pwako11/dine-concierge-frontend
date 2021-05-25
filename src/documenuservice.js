class DocuMenuService {

    constructor() {
        this.restaurantsUrl = "https://api.documenu.com/v2/restaurants/state/";
        this.restaurantUrl = "https://api.documenu.com/v2/restaurant/";
    }

    getRestaurants(stateAbbr){
        return fetch(this.restaurantsUrl + stateAbbr +"/?key=13f89d501cb8105c1e10279570318eeb")
        .then(response => response.json())
    }

    getRestaurant(id) {
        return fetch(this.restaurantUrl + id  + "/?key=13f89d501cb8105c1e10279570318eeb")
        .then(response => response.json())
    }
}