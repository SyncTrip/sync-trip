import { db } from './databaseInitialize';
import { ref, push, get, update, remove, query, orderByChild, equalTo, onValue } from 'firebase/database';

const databaseManager = {
  /**
   * Creates a new record in the database.
   * @param {string} path - The path where the data should be stored (e.g., 'users', 'rooms/room1/messages').
   * @param {object} data - The data to be stored.
   * @returns {Promise<string>} - A promise that resolves with the unique ID of the newly created record.
   * @throws {Error} - If the write operation fails.
   */
  async create(path, data) {
    try {
      const dataRef = ref(db, path);
      const newRef = await push(dataRef, data);
      return newRef.key; // Return the unique key of the new record
    } catch (error) {
      console.error("Error creating data:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  },

  /**
    * Reads a record from the database
    * @param {string} path - The path to the data you want to retrieve
    * @returns {Promise<object | null>} - A promise that resolves to the data at the specified path, or null if no data exists.
    * @throws {Error} - If the read operation fails.
    */
  async read(path) {
    try {
      const dataRef = ref(db, path);
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null; // Return null if no data exists at the path
      }
    } catch (error) {
      console.error("Error reading data:", error);
      throw error;
    }
  },

  /**
   * Updates an existing record in the database.
   * @param {string} path - The path to the data you want to update (e.g., 'users/user1').
   * @param {object} data - An object containing the key-value pairs to update.  The *entire* object at the path is NOT replaced, only the keys provided are changed.
   * @returns {Promise<void>}
   * @throws {Error} - If the update operation fails.
   */
  async update(path, data) {
    try {
      const dataRef = ref(db, path);
      await update(dataRef, data);
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  },

  /**
   * Deletes a record from the database.
   * @param {string} path - The path to the data you want to delete.
   * @returns {Promise<void>}
   * @throws {Error} - If the delete operation fails.
   */
  async delete(path) {
    try {
      const dataRef = ref(db, path);
      await remove(dataRef);
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  },

    /**
   * Retrieves a list of records from the database, optionally sorted by a child property.
   * @param {string} path - The path to the data (e.g., 'users', 'messages').
   * @param {string} [orderBy] - The child property to order the results by (optional).
   * @param {any} [equalToValue] - Optional value to filter the results
   * @returns {Promise<Array<object>>} - A promise that resolves to an array of data objects.
   * @throws {Error}
   */
  async list(path, orderBy, equalToValue) {
      try {
          const dataRef = ref(db, path);
          let queryRef = dataRef;

          if (orderBy) {
              queryRef = query(dataRef, orderByChild(orderBy));
          }
          if (equalToValue) {
            queryRef = query(queryRef, equalTo(equalToValue));
          }

          const snapshot = await get(queryRef);
          if (snapshot.exists()) {
              const data = snapshot.val();
              // Convert the object of objects into an array of objects, and include the key
              return Object.entries(data).map(([key, value]) => ({
                  id: key, // Include the key as 'id'
                  ...value,
              }));
          } else {
              return []; // Return an empty array if no data exists
          }
      } catch (error) {
          console.error("Error listing data:", error);
          throw error;
      }
  },
    /**
     * Listen for changes to a specific path in the database.  This is for *real-time* updates.
     * @param {string} path - The path to listen to.
     * @param {function} callback - A function that will be called with the new data
     * each time it changes.  The callback receives a snapshot of the data.
     * @returns {function} - Returns an unsubscribe function.  Call this function to stop listening
     * for changes.
     */
    listen(path, callback) {
        const dataRef = ref(db, path);
        const onValueChange = (snapshot) => { // Changed from on() to onValueChange()
            callback(snapshot);
        };
       const unsubscribe = onValue(dataRef, onValueChange); // Store the unsubscribe function
        return unsubscribe; // Return the unsubscribe function
    },
};

export default databaseManager;
