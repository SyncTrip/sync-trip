import databaseManager from '../databaseManager';
import { ref, get, set, update, remove, push } from 'firebase/database';
import { db } from '../databaseInitialize';

const roomCtrl = {
    /**
     * Creates a new room.
     * @param {string} roomName - The name of the room.
     * @param {object} roomData - The room data.
     * @returns {Promise<string>} - The ID of the created room.
     */
    async createRoom(roomName, roomData) {
        try {
            const roomsRef = ref(db, 'rooms');
            const newRoomRef = await push(roomsRef, { name: roomName, ...roomData });
            return newRoomRef.key;
        } catch (error) {
            console.error("Error creating room:", error);
            throw error;
        }
    },

    /**
     * Retrieves a room by its ID.
     * @param {string} roomId - The ID of the room to retrieve.
     * @returns {Promise<object | null>} - The room data or null if not found.
     */
    async getRoomById(roomId) {
        try {
            const roomRef = ref(db, `rooms/${roomId}`);
            const snapshot = await get(roomRef);
            return snapshot.val() || null;
        } catch (error) {
            console.error("Error getting room by ID:", error);
            throw error;
        }
    },

      /**
     * Retrieves all rooms.
     * @returns {Promise<Array<object>>} - A list of all rooms.
     */
    async getAllRooms() {
        try {
          const roomsRef = ref(db, 'rooms');
          const snapshot = await get(roomsRef);
          if (snapshot.exists()) {
            const rooms = snapshot.val();
            return Object.entries(rooms).map(([id, room]) => ({ id, ...room }));
          } else {
            return [];
          }
        } catch (error) {
          console.error("Error getting all rooms:", error);
          throw error;
        }
      },

    /**
     * Updates a room's data.
     * @param {string} roomId - The ID of the room to update.
     * @param {object} newData - The new data for the room.
     * @returns {Promise<void>}
     */
    async updateRoom(roomId, newData) {
        try {
            const roomRef = ref(db, `rooms/${roomId}`);
            await update(roomRef, newData);
        } catch (error) {
            console.error("Error updating room:", error);
            throw error;
        }
    },

    /**
     * Deletes a room.
     * @param {string} roomId - The ID of the room to delete.
     * @returns {Promise<void>}
     */
    async deleteRoom(roomId) {
        try {
            const roomRef = ref(db, `rooms/${roomId}`);
            await remove(roomRef);
        } catch (error) {
            console.error("Error deleting room:", error);
            throw error;
        }
    },

      /**
     * Adds a user to a room
     * @param {string} roomId - The ID of the room
     * @param {string} userId - The ID of the user to add
     * @returns {Promise<void>}
     */
    async addUserToRoom(roomId, user) {
        try {
            const roomRef = ref(db, `rooms/${roomId}`);
            const snapshot = await get(roomRef);

            if (!snapshot.exists()) {
                throw new Error(`Room with ID ${roomId} does not exist`);
            }

            const roomData = snapshot.val();
            const members = roomData.members || [];

            // Check if the user is already a member
            if (!members.some(member => member.id === user.id)) {
                members.push(user);
                await update(roomRef, { members });
            }

            // Return the updated room
            return { ...roomData, members };
        } catch (error){
            console.error("Error adding user to room", error);
            throw error;
        }
    },

    /**
     * Removes a user from a room
     * @param {string} roomId - The ID of the room
     * @param {string} userId - The ID of the user to remove
     * @returns {Promise<void>}
     */
      async removeUserFromRoom(roomId, userId) {
        try {
            const roomRef = ref(db, `rooms/${roomId}/users/${userId}`);
            await remove(roomRef);
        } catch (error) {
            console.error("Error removing user from room", error);
            throw error;
        }
    },

    /**
     * Gets users in a room
     * @param {string} roomId - The ID of the room
     * @returns {Promise<object | null>} -  Returns an object where keys are user ids, or null if there are no users
     */
    async getUsersInRoom(roomId) {
        try {
            const roomUsersRef = ref(db, `rooms/${roomId}/users`);
            const snapshot = await get(roomUsersRef);
            return snapshot.val();
        } catch (error) {
            console.error("Error getting users in room: ", error);
            throw error;
        }
    }
};

export default roomCtrl;