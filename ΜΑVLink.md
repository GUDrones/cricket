
Micro Air Vehicle Link (MAVLink) is a protocol for communicating with small unmanned vehicles. It is designed as a header-only message marshaling library. 

It is mostly used for communication between a ground control station (GCS) and unmanned vehicles and in the inter-communication of the subsystem of the vehicle. 

# Packet structure 


| Field name            | Index (bytes)   | Purpose                                                                                                                                  |
| --------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Start-of-frame        | 0               | Denotes the start of frame transmission                                                                                                  |
| Payload-length        | 1               | Length of payload (n)                                                                                                                    |
| Incompatibility flags | 2               | Flags that must be understood for MAVLink compatibility                                                                                  |
| Compatibility flags   | 3               | Flags that can be ignored if not understood                                                                                              |
| Packet sequence       | 4               | Each component counts up their send sequence. Allows for detection of packet loss                                                        |
| System ID             | 5               | Identification of the SENDING system. Allows to differentiate systems on the same network                                                |
| Component ID          | 6               | Identification of the SENDING component. Allows to differentiate different components of the same system, e.g. the IMU and the autopilot |
| Message ID            | 7-9             | Message identification - defines what the payload means and how it should be correctly decoded                                           |
| Payload               | 10 - (n+10)     | The data into the message, depends on the message id                                                                                     |
| CRC                   | (n+11) - (n+12) | Check-sum of the entire packet, excluding the packet start sign                                                                          |
| Signature             | (n+13) - (n+25) | Signature to verify messages originate from trusted source                                                                               |
