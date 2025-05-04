import User from './user'
import Room from './room'

class History {
    constructor(room = null, members = [User])
        {

        this.room = room;
        this.members = members;

        // Initialize other arrays to match members length
        const length = members.length;

        this.origen = new Array(length).fill("none");
        this.diners = new Array(length).fill(0);
        this.destinacio = new Array(length).fill('');
        this.activitats = new Array(length).fill('');
        this.nacional = new Array(length).fill(false);
        this.durada = new Array(length).fill(0);
        this.cotxe = new Array(length).fill(false);
    }
    
}
export default History;

