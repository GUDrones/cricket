import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [activeKeys, setActiveKeys] = useState(new Set());
    const [isTakingOff, setIsTakingOff] = useState(false);
    const [isLanding, setIsLanding] = useState(false);

    const handleTakeOff = () => {
        setIsTakingOff(true);
        console.log('Take Off button clicked');
    };

    const handleTakeOffRelease = () => {
        setIsTakingOff(false);
    };

    const handleLand = () => {
        setIsLanding(true);
        console.log('Land button clicked');
    };

    const handleLandRelease = () => {
        setIsLanding(false);
    };

    const handleControlMouseDown = (direction, key) => {
        setActiveKeys(prevKeys => {
            const newKeys = new Set(prevKeys);
            newKeys.add(key);
            return newKeys;
        });
        console.log(`${direction} button pressed`);
    };

    const handleControlMouseUp = (key) => {
        setActiveKeys(prevKeys => {
            const newKeys = new Set(prevKeys);
            newKeys.delete(key);
            return newKeys;
        });
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            if (key === ' ') {
                e.preventDefault();
            }
            setActiveKeys(prevKeys => {
                const newKeys = new Set(prevKeys);
                newKeys.add(key);
                return newKeys;
            });

            switch(key) {
                case 'enter':
                    e.preventDefault();
                    handleTakeOff();
                    break;
                case ' ':
                    handleLand();
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (e) => {
            const key = e.key.toLowerCase();
            setActiveKeys(prevKeys => {
                const newKeys = new Set(prevKeys);
                newKeys.delete(key);
                return newKeys;
            });

            if (key === 'enter') {
                handleTakeOffRelease();
            } else if (key === ' ') {
                handleLandRelease();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className="App">
            <div className="main-container">
                <div className="header">
                    <div></div>
                    <div className="connection-status">
                        Connection Status: Boolean
                    </div>
                    <div className="battery-status">
                        <span className="battery-label">Battery:</span>
                        <div className="battery-bar"></div>
                        <span className="battery-percentage">20%</span>
                    </div>
                </div>

                <div className="content-wrapper">
                    <div className="left-section">
                        <div className="video-feed">
                            <h3>Video Feed</h3>
                        </div>
                        
                        <div className="data-log">
                            <h3>Data Log Values:</h3>
                            <div className="data-columns">
                                <div className="data-column">
                                    <p>(1) Flight Dynamics</p>
                                    <p>Pitch: -1</p>
                                    <p>Yaw: -26</p>
                                    <p>Roll: 2</p>
                                </div>
                                <div className="data-column">
                                    <p>(2) Speed on axis</p>
                                    <p>X: 0</p>
                                    <p>Y: 0</p>
                                    <p>Z: 0</p>
                                </div>
                                <div className="data-column">
                                    <p>(3) Acceleration</p>
                                    <p>X: 25.0</p>
                                    <p>Y: -40.0</p>
                                    <p>Z: -1000.0</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right-section">
                        <select className="graph-dropdown">
                            <option>Graph Drop-Down</option>
                        </select>

                        <div className="controls-section">
                            <h3 className="controls-title">CONTROLS</h3>
                            <div className="control-grid">
                                <button 
                                    className={`control-button ${activeKeys.has('i') ? 'active' : ''}`}
                                    onMouseDown={() => handleControlMouseDown('Upward', 'i')}
                                    onMouseUp={() => handleControlMouseUp('i')}
                                    onMouseLeave={() => handleControlMouseUp('i')}
                                >
                                    I<br/>Upward
                                </button>
                                <button 
                                    className={`control-button ${activeKeys.has('w') ? 'active' : ''}`}
                                    onMouseDown={() => handleControlMouseDown('Forward', 'w')}
                                    onMouseUp={() => handleControlMouseUp('w')}
                                    onMouseLeave={() => handleControlMouseUp('w')}
                                >
                                    W<br/>Forward
                                </button>
                                <button 
                                    className={`control-button ${activeKeys.has('l') ? 'active' : ''}`}
                                    onMouseDown={() => handleControlMouseDown('Downward', 'l')}
                                    onMouseUp={() => handleControlMouseUp('l')}
                                    onMouseLeave={() => handleControlMouseUp('l')}
                                >
                                    L<br/>Downward
                                </button>
                                <button 
                                    className={`control-button ${activeKeys.has('a') ? 'active' : ''}`}
                                    onMouseDown={() => handleControlMouseDown('Left', 'a')}
                                    onMouseUp={() => handleControlMouseUp('a')}
                                    onMouseLeave={() => handleControlMouseUp('a')}
                                >
                                    A<br/>Left
                                </button>
                                <button 
                                    className={`control-button ${activeKeys.has('s') ? 'active' : ''}`}
                                    onMouseDown={() => handleControlMouseDown('Backward', 's')}
                                    onMouseUp={() => handleControlMouseUp('s')}
                                    onMouseLeave={() => handleControlMouseUp('s')}
                                >
                                    S<br/>Backward
                                </button>
                                <button 
                                    className={`control-button ${activeKeys.has('d') ? 'active' : ''}`}
                                    onMouseDown={() => handleControlMouseDown('Right', 'd')}
                                    onMouseUp={() => handleControlMouseUp('d')}
                                    onMouseLeave={() => handleControlMouseUp('d')}
                                >
                                    D<br/>Right
                                </button>
                            </div>
                        </div>

                        <button 
                            className={`take-off ${isTakingOff ? 'active' : ''}`}
                            onMouseDown={handleTakeOff}
                            onMouseUp={handleTakeOffRelease}
                            onMouseLeave={handleTakeOffRelease}
                        >
                            Take-Off (Enter)
                        </button>
                        <button 
                            className={`land ${isLanding ? 'active' : ''}`}
                            onMouseDown={handleLand}
                            onMouseUp={handleLandRelease}
                            onMouseLeave={handleLandRelease}
                        >
                            Land (Space)
                        </button>

                        <div className="gps">
                            <h3>GPS</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;