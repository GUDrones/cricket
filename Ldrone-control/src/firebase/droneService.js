import { db } from './config';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    doc, 
    onSnapshot,
    serverTimestamp,
    getAllDroneData,
    getDroneDataById,
    updateDroneData,
    deleteDroneData
} from 'firebase/firestore';

const DRONES_COLLECTION = 'drones';

// Create a new drone document
export const createDrone = async (droneData) => {
    try {
        const docRef = await addDoc(collection(db, DRONES_COLLECTION), {
            ...droneData,
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating drone:", error);
        throw error;
    }
};

// Update drone position
export const updateDronePosition = async (droneId, position) => {
    try {
        const droneRef = doc(db, DRONES_COLLECTION, droneId);
        await updateDoc(droneRef, {
            currentPosition: position,
            lastUpdated: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating drone position:", error);
        throw error;
    }
};

// Subscribe to drone updates
export const subscribeToDronePosition = (droneId, callback) => {
    const droneRef = doc(db, DRONES_COLLECTION, droneId);
    return onSnapshot(droneRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data());
        }
    });
};

// Get all data
const allData = await getAllDroneData();

// Get specific data
const specificData = await getDroneDataById(docId);

// Update existing data
await updateDroneData(docId, {
    pitch: 2,
    status: "inactive"
});

// Delete data
await deleteDroneData(docId); 