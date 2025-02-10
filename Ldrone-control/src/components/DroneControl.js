import React, { useState, useEffect } from 'react';
import { createDrone, updateDronePosition } from '../firebase/droneService';
import { addDroneData, getAllDroneData } from '../firebase/databaseService';
import './DroneControl.css';

const DroneControl = () => {
    const [connectionStatus, setConnectionStatus] = useState(false);
    const [batteryLevel, setBatteryLevel] = useState(20);
    const [dataLog, setDataLog] = useState({
        flightDynamics: {
            pitch: -1,
            yaw: -26,
            roll: 2
        },
        speed: {
            x: 0,
            y: 0,
            z: 0
        },
        acceleration: {
            x: 25.0,
            y: -40.0,
            z: -1000.0
        }
    });
    const [selectedList, setSelectedList] = useState('1');

    const fetchTestDrone = async () => {
        try {
            const data = await getAllDroneData();
            console.log("Test drone data:", data);
            // This will show your test data in the browser's console
        } catch (error) {
            console.error("Error fetching test drone:", error);
        }
    };

    useEffect(() => {
        fetchTestDrone();
    }, []);

    const handleListChange = (event) => {
        setSelectedList(event.target.value);
    };

    return (
        <div className="drone-interface">
            {/* Header */}
            <div className="header">
                <div className="connection-status">
                    Connection Status: Boolean
                </div>
                <div className="battery-status">
                    Battery: {batteryLevel}%
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Left Side - Video Feed */}
                <div className="video-feed">
                    <h2>Video Feed</h2>
                </div>

                {/* Right Side - Controls */}
                <div className="right-panel">
                    {/* Controls Section */}
                    <div className="controls-section">
                        <h3>CONTROLS</h3>
                        <div className="control-grid">
                            <div className="control-row">
                                <div className="control-key">I</div>
                                <div className="control-key">W</div>
                                <div className="control-key">L</div>
                            </div>
                            <div className="control-row">
                                <div className="control-key">A</div>
                                <div className="control-key">S</div>
                                <div className="control-key">D</div>
                            </div>
                        </div>
                        <div className="control-labels">
                            <div>Upward</div>
                            <div>Forward</div>
                            <div>Downward</div>
                            <div>Left</div>
                            <div>Backward</div>
                            <div>Right</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <button className="action-button takeoff">Take-Off (Enter)</button>
                    <button className="action-button land">Land (Space)</button>

                    {/* GPS Section */}
                    <div className="gps-section">
                        <h3>GPS</h3>
                    </div>

                    {/* Graph Dropdown */}
                    <select 
                        className="graph-dropdown" 
                        value={selectedList} 
                        onChange={handleListChange}
                    >
                        <option value="1">List 1</option>
                        <option value="2">List 2</option>
                        <option value="3">List 3</option>
                        <option value="4">List 4</option>
                    </select>
                </div>
            </div>

            {/* Data Log Section */}
            <div className="data-log">
                <h3>Data Log Values:</h3>
                <div className="log-sections">
                    <div className="log-section">
                        <h4>(1) Flight Dynamics</h4>
                        <div>Pitch: {dataLog.flightDynamics.pitch}</div>
                        <div>Yaw: {dataLog.flightDynamics.yaw}</div>
                        <div>Roll: {dataLog.flightDynamics.roll}</div>
                    </div>
                    <div className="log-section">
                        <h4>(2) Speed on axis</h4>
                        <div>X: {dataLog.speed.x}</div>
                        <div>Y: {dataLog.speed.y}</div>
                        <div>Z: {dataLog.speed.z}</div>
                    </div>
                    <div className="log-section">
                        <h4>(3) Acceleration</h4>
                        <div>X: {dataLog.acceleration.x}</div>
                        <div>Y: {dataLog.acceleration.y}</div>
                        <div>Z: {dataLog.acceleration.z}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DroneControl; 