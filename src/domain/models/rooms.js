import User from './user';

/**
 * Represents the structure of a room object in the database.
 * This file is not strictly necessary for Firebase, but it can be useful for documentation
 * and type checking (if you're using TypeScript).  It doesn't interact with the database directly.
 */
class Room {
    constructor(id = "", name = "", members = []) {
    this.id = id; // The unique ID of the room (Firebase key)
    this.name = name; // The name of the room
    this.members = members; // An array of user objects representing the members of the room
    this.started= false; 
    }
  };
  
  export default Room;