import databaseManager from '../databaseManager';
import { ref, get, set, update, remove } from 'firebase/database';
import { db } from '../databaseInitialize';

const userCtrl = {
  /**
   * Creates a new user.
   * @param {string} userId - The ID of the user.  Important:  Use the UID from Firebase Auth.
   * @param {object} userData - The user data (e.g., { }).
   * @returns {Promise<void>}
   */
  async createUser(userId, userData) {
    try {
      const userRef = ref(db, `users/${userId}`);
      await set(userRef, userData);
      const snapshot = await get(userRef);
      const user = snapshot.val();
      return { id: userId, ...user };
    } catch (error) { 
      console.error("Error creating user:", error);
      throw error;
    }
  },

  /**
   * Retrieves a user by their ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<object | null>} - The user data or null if not found.
   */
  async getUserById(userId) {
    try {
      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);
      return snapshot.val() || null;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw error;
    }
  },

  /**
   * Updates a user's data.
   * @param {string} userId - The ID of the user to update.
   * @param {object} newData - The new data for the user.
   * @returns {Promise<void>}
   */
  async updateUser(userId, newData) {
    try {
      const userRef = ref(db, `users/${userId}`);
      await update(userRef, newData);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }, 

  /**
   * Deletes a user.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Promise<void>}
   */
  async deleteUser(userId) {
    try {
      const userRef = ref(db, `users/${userId}`);
      await remove(userRef);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

    /**
   * Gets all users.
   * @returns {Promise<Array<object>>}
   */
  async getAllUsers() {
    try {
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      if (!snapshot.exists()) {
        return [];
      }
      const usersData = snapshot.val();
      return Object.entries(usersData).map(([id, userData]) => ({
        id,
        ...userData,
      }));
    } catch (error) {
      console.error("Error getting all users:", error);
      throw error;
    }
  },
};

export default userCtrl;