from dronekit import connect
import time

connection_string = '/dev/ttyS0' 
baud_rate = 921600


def conncect_drone(connection_string, baud_rate):
    
    #- Connect the UAV
    print(">>>> Connecting with the UAV <<<")
    vehicle = connect(connection_string, baud= baud_rate, wait_ready=True)
    #- wait_ready flag hold the program untill all the parameters are been read (=, not .)
    print('vehicle is connected.')

    #-- Read information from the autopilot:
    #- Version and attributes
    vehicle.wait_ready('autopilot_version')
    print('Autopilot version: %s'%vehicle.version)
    
    #- Does the firmware support the companion pc to set the attitude?
    print('Supports set attitude from companion: %s'%vehicle.capabilities.set_attitude_target_local_ned)
    
    #- Read the actual position
    print('Position: %s'% vehicle.location.global_relative_frame)
    
    #- Read the actual attitude roll, pitch, yaw
    print('Attitude: %s'% vehicle.attitude)
    
    #- Read the actual velocity (m/s)
    print('Velocity: %s'%vehicle.velocity) #- North, east, down
    
    #- When did we receive the last heartbeat
    print('Last Heartbeat: %s'%vehicle.last_heartbeat)
    
    #- Is the vehicle good to Arm?
    print('Is the vehicle armable: %s'%vehicle.is_armable)
    
    #- Which is the total ground speed?   Note: this is settable
    print('Groundspeed: %s'% vehicle.groundspeed) #(%)
    
    #- What is the actual flight mode?    Note: this is settable
    print('Mode: %s'% vehicle.mode.name)
    
    #- Is the vehicle armed               Note: this is settable
    print('Armed: %s'%vehicle.armed)
    
    #- Is thestate estimation filter ok?
    print('EKF Ok: %s'%vehicle.ekf_ok)
    return vehicle


vehicle = conncect_drone(connection_string, baud_rate)