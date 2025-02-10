
# 4G

4G (Fourth Generation) is the fourth generation of mobile network technology. It is the successor to 3G (Third Generation) networks and provides faster speeds, lower latency, and better reliability.

- Higher Speeds: Up to 100 Mbps for mobile users and up to 1 Gbps for stationary users.
- Lower Latency: Reduces delay in data transmission, making real-time applications smoother.
- Better Coverage & Efficiency: Supports more devices per cell tower compared to 3G.
- Improved Streaming & Browsing: Ideal for high-definition video streaming, online gaming, and cloud-based applications.

# LTE

LTE (Long-Term Evolution) is a wireless communication standard that enhances 4G networks by improving speed, reliability, and efficiency.


# The wireless communication standard underlying 4G

## How wireless communication works

Wireless communication relies on the transmission of electromagnetic waves to carry data between devices. The fundamental principles include:

1. Modulation: Converting digital data into a format that can be transmitted as radio signals.
    
2. Frequencies and Bands: Mobile networks operate in specific frequency ranges, typically between 600 MHz and 6 GHz for 4G LTE.
    
3. Multiplexing: Sharing the available frequency spectrum among multiple users efficiently.
    
4. Error Correction & Signal Processing: Ensuring data integrity even in areas with weak signals.

## How LTE works

1. Orthogonal Frequency Division Multiplexing (OFDM)
	- LTE uses OFDM to efficiently divide the available bandwidth into smaller subcarriers.
	- This minimizes interference and improves data throughput.
    

2. Multiple Input Multiple Output (MIMO)
	- MIMO employs multiple antennas at both the sender (cell tower) and receiver (user device) to improve performance.
	- Example: 2x2 MIMO means two antennas transmit and two receive signals simultaneously, effectively doubling bandwidth.
    

3. Carrier Aggregation (CA)
	- LTE-Advanced (LTE-A) introduced carrier aggregation, which allows the network to combine multiple frequency bands.
	- This significantly increases total bandwidth and improves speeds.
    

4. Adaptive Modulation and Coding (AMC)
	- LTE dynamically adjusts modulation schemes (e.g., QPSK, 16-QAM, 64-QAM) based on network conditions.
	- Higher modulation schemes (like 64-QAM) allow for faster data rates but require strong signal strength.
    

5. Time-Division Duplex (TDD) & Frequency-Division Duplex (FDD)
	- FDD (Frequency-Division Duplexing): Uses separate frequency channels for upload and download.
	- TDD (Time-Division Duplexing): Uses a single channel but alternates between upload and download.
	- LTE supports both FDD and TDD, allowing it to be deployed in various environments efficiently.


# 4G LTE USB Modems


A 4G LTE USB modem is a device that allows a computer, Raspberry Pi, or other hardware to connect to the internet over a cellular network using a SIM card. It acts as a bridge between the device and a 4G LTE network.

### How Does It Work?

1. Insert a SIM card into the USB modem.
2. Connect the modem to a computer, Raspberry Pi, or another device via USB.
3. The modem communicates with the nearest cellular tower to establish an internet connection.
4. The device can now access the internet over 4G LTE.

## Types of 4G LTE USB Modems

There are two main types of 4G LTE USB modems:

### 1. Plug-and-Play USB Stick Modems

- These look like USB flash drives and have an integrated modem and SIM card slot.
- Example: Huawei E8372
- Pros:
    - Simple to use (plug into USB, install drivers, and connect to the internet)
    - Often include WiFi hotspot capabilities
- Cons:
    - May have limited signal strength (no external antennas)
    - Higher power consumption

### 2. Mini PCIe/USB Module-Based Modems

- These are modular LTE modems that require a USB-to-miniPCIe adapter.
- Example: Quectel EC25, SIMCom SIM7600
- Pros:
    - More powerful and reliable
    - Supports external antennas for better signal reception
    - Lower power consumption
- Cons:
    - Requires additional hardware (USB adapter, SIM card slot)
    - Some models need manual configuration on Linux/Raspberry Pi


## Choosing the Right 4G LTE USB Modem

When selecting a 4G LTE USB modem,  we need to consider:

### 1. Network Compatibility

We need to ensure the modem support the UK's LTE bands. 

### 2. Speed Requirements

LTE Cat 4 (150 Mbps) is enough for most applications but we probably need LTE-A (Cat 6 and higher) which support speeds up to 300 Mbps+ (ideal for video streaming).

### 3. External Antenna Support

Signal strength is a concern on the drone so we should choose a modem with external antenna ports.

### 4. Power Consumption

USB stick modems may use more power, which is a concern for battery-powered devices like our drones. Mini PCIe-based modems are usually more power-efficient.

### 5. Plug-and-Play vs. Configurable

For easy setup, such as testing we could choose a plug-and-play USB modem e.g., Huawei E8372 but for best performance & external antennas, we should use a mini PCIe-based modem e.g., Quectel EC25, SIM7600


## Setting up a 4G LTE USB Modem on Raspberry Pi

### 1. Insert the SIM Card

Place nano/micro SIM card into our modem’s slot.

### 2. Connect the Modem

- For USB stick modems, plug it into the USB port.
- For mini PCIe modems, connect via a USB-to-miniPCIe adapter.

### 3. Install Required Software (Linux/Raspberry Pi OS)

Run the following to install mobile broadband tools:

```bash
sudo apt update && sudo apt install usb-modeswitch wvdial
```

### 4. Check if the Modem is Recognized

Run:

```bash
lsusb
```

We should look for a line showing our modem (e.g., "Huawei Technologies" or "Quectel EC25").

### 5. Configure Network Connection

Edit the wvdial configuration file:

```bash
sudo nano /etc/wvdial.conf
```

Add the following (modify based on our carrier):

```
[Dialer Defaults]
Init1 = ATZ
Init2 = ATQ0 V1 E1 S0=0 &C1 &D2 +FCLASS=0
Modem = /dev/ttyUSB0
Baud = 460800
APN = your-carrier-apn
Username = your-username
Password = your-password
```

### 6. Connect to the Internet

Run:

```bash
sudo wvdial
```

Once connected, our Raspberry Pi can access the internet over 4G LTE
