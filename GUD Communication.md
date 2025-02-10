
# Drone control + telemetry

Drone side: 
- Pixhawk
- SiK radio 

Ground side:
- QGroundControl
- SiK radio

# Video streaming system

Drone side:
- Raspberry Pi Zero 2 W 
- LTE Modem 
- Camera

Ground side:
- Raspberry Pi
- LTE Modem 
- Stores video feed into a ROS2 bag for later processing


## Evidence this works lol

https://www.reddit.com/r/raspberry_pi/comments/1bit8bw/connecting_pi_zero_2_w_to_waveshare_sim7600gh_4g/
![[Screenshot 2025-02-10 at 00.20.55.png]]

We will use a Raspberry Pi Zero 2 W on the drone for video capture and encoding and another Raspberry Pi on the ground for receiving and displaying/storing the stream.

Since the drone will be flying high (likely over 30-50m) and could be far from the ground station, WiFi is not reliable, so 4G LTE is the best choice. It provides unlimited range as long as we have cellular network coverage. High-bandwidth streaming with 4G. 

We will use WebRTC over 4G. The Raspberry Pi on the ground receives the stream of data and sends it over serial to a computer which stores the data to be processed. 

In terms of camera we're probably looking at a Raspberry Pi camera Module v3, a Raspberry Pi HQ camera or an Arducam 16MP Autofocusrap

For 4G LTE USB Modems for the Raspberry Pi's we can use the Quectel EC25-E's or Huawei E8372. 

# Pixhawk

## Sensors
- MPU600 (6-DoF IMU i.e. accelerometer and gyroscope)
- ST Micro 16-bit gyroscope
- ST Micro 14-bit accelerometer/compass (magnetometer)
- MAES barometer

## Interfaces
- 5x UART serial ports, 1 high-power capable, 2 with HW flow control 
- Spektrum DSM/DSM2/DSM-X Satellite input
- PPM sum signal 
- RSSI (PWM or voltage) input
- I2C, SPI, 2x CAN, USB
- 3.3V and 6.6V ADC inputs

![[Screenshot 2025-02-06 at 00.12.14.png]]


# QGroundControl


