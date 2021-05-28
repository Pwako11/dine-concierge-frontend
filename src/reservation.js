class Reservation {

    static allReservations = []

    constructor(reservation) {
        this.id = reservation.id
        this.restaurant_name = reservation.restaurant_name
        this.booked_time = reservation.booked_time
        this.booked_email = reservation.booked_email
        this.notes = reservation.notes
        this.reserved = reservation.reserved
        this.user_id = reservation.user_id
        this.user = reservation.user
        Reservation.allReservations.push(this)
    }

addNewReservationRow() {
    return `<tr>
        <td>${this.restaurant_name}</td>
        <td>${this.booked_time}</td>
        <td>${this.booked_email}</td>
        <td>${this.notes}</td>
        <td>${this.user.name}</td>
    </tr>`
}

}