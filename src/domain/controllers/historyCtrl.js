import databaseManager from '../databaseManager';
import { ref, get, set, update, remove, push } from 'firebase/database';
import { db } from '../databaseInitialize';

const historyCtrl = {

    async createHistory(room, historyData) {
        try {
            const historyRef = ref(db, `history/${room}`);
            const roomRef = ref(db, `history/room/${room}`);
            
            // Save the history data
            await set(historyRef, historyData);
            
            // Save the room
            await set(roomRef, { room });

            const snapshot = await get(historyRef);
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log('No history data available');
                return null;
            }
        } catch (error) {
            console.error('Error creating history:', error);
        }
    },

    async getHistory(room) {
        try {
            console.log('Getting history for room:', room);
            const historyRef = ref(db, `history/${room}`);
            const snapshot = await get(historyRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
    
                // Validate and fill missing properties
                if (!Array.isArray(data.members)) data.members = [];
                const length = data.members.length;
    
                data.origen = Array.isArray(data.origen) ? data.origen : new Array(length).fill("none");
                data.diners = Array.isArray(data.diners) ? data.diners : new Array(length).fill(0);
                data.destinacio = Array.isArray(data.destinacio) ? data.destinacio : new Array(length).fill('');
                data.activitats = Array.isArray(data.activitats) ? data.activitats : new Array(length).fill('');
                data.nacional = Array.isArray(data.nacional) ? data.nacional : new Array(length).fill(false);
                data.durada = Array.isArray(data.durada) ? data.durada : new Array(length).fill(0);
                data.cotxe = Array.isArray(data.cotxe) ? data.cotxe : new Array(length).fill(false);
    
                return data;
            } else {
                console.log('No history data available');
                return null;
            }
        } catch (error) {
            console.error('Error getting history:', error);
        }
    },

    async updateHistory(room, historyData) {
        try {
            const historyRef = ref(db, `history/${room}`);
            await update(historyRef, historyData);
            return room;
        } catch (error) {
            console.error('Error updating history:', error);
        }
    },

    async deleteHistory(room) {
        try {
            const historyRef = ref(db, `history/${room}`);
            await remove(historyRef);
            return room;
        } catch (error) {
            console.error('Error deleting history:', error);
        }
    },

    async addMemberToHistory(room, member) {
        try {
            const historyRef = ref(db, `history/${room}/members`);
            const newMemberRef = push(historyRef);
            await set(newMemberRef, member);
            return newMemberRef.key;
        } catch (error) {
            console.error('Error adding member to history:', error);
        }
    },

    async removeMemberFromHistory(room, memberId) {
        try {
            const memberRef = ref(db, `history/${room}/members/${memberId}`);
            await remove(memberRef);
            return memberId;
        } catch (error) {
            console.error('Error removing member from history:', error);
        }
    },

    async getAllHistory() {
        try {
            const historyRef = ref(db, 'history');
            const snapshot = await get(historyRef);
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log('No history data available');
                return null;
            }
        } catch (error) {
            console.error('Error getting all history:', error);
        }
    },

    /*
    room: a string representing the unique ID or name of the room.
    itemId: the unique ID of the item you want to update inside that room’s history.
    itemData: an object containing the new data you want to merge/update into the existing item
    */
    async updateItemInHistory(room, itemId, itemData) {
        try {
            const itemRef = ref(db, `history/${room}/items/${itemId}`);
            await update(itemRef, itemData);
            return itemId;
        } catch (error) {
            console.error('Error updating item in history:', error);
        }
    },

}

export default historyCtrl;