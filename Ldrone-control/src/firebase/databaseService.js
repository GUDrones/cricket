import { db } from './config';
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    serverTimestamp 
} from 'firebase/firestore';

// Collection name
const DRONE_DATA = 'droneData';
const FLIGHT_LOGS = 'flightLogs';

// Create new drone data
export const addDroneData = async (data) => {
    try {
        const docRef = await addDoc(collection(db, DRONE_DATA), {
            ...data,
            timestamp: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding drone data:", error);
        throw error;
    }
};

// Get all drone data
export const getAllDroneData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, DRONE_DATA));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting drone data:", error);
        throw error;
    }
};

// Get specific drone data
export const getDroneDataById = async (id) => {
    try {
        const docRef = doc(db, DRONE_DATA, id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("No such document!");
        }
    } catch (error) {
        console.error("Error getting drone data:", error);
        throw error;
    }
};

// Update drone data
export const updateDroneData = async (id, data) => {
    try {
        const docRef = doc(db, DRONE_DATA, id);
        await updateDoc(docRef, {
            ...data,
            lastUpdated: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating drone data:", error);
        throw error;
    }
};

// Delete drone data
export const deleteDroneData = async (id) => {
    try {
        await deleteDoc(doc(db, DRONE_DATA, id));
    } catch (error) {
        console.error("Error deleting drone data:", error);
        throw error;
    }
};

// Add this function to collect real-time drone data
export const collectDroneData = async (droneId, sensorData) => {
    try {
        const docRef = await addDoc(collection(db, DRONE_DATA), {
            droneId,
            timestamp: serverTimestamp(),
            flightDynamics: {
                pitch: sensorData.pitch || 0,
                yaw: sensorData.yaw || 0,
                roll: sensorData.roll || 0
            },
            speed: {
                x: sensorData.speed?.x || 0,
                y: sensorData.speed?.y || 0,
                z: sensorData.speed?.z || 0
            },
            acceleration: {
                x: sensorData.acceleration?.x || 0,
                y: sensorData.acceleration?.y || 0,
                z: sensorData.acceleration?.z || 0
            },
            batteryLevel: sensorData.batteryLevel || 0,
            gpsPosition: sensorData.gpsPosition || null
        });
        return docRef.id;
    } catch (error) {
        console.error("Error collecting drone data:", error);
        throw error;
    }
}; 