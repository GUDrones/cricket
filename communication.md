1. Connecting the Pixhawk and Raspberry Pi
   Connect the Pixhawk’s TELEM2 port to the Raspberry Pi Ground, TX and RX pins as shown in the image above. More details on the individual Raspberry Pi pin functions can be found here. The Raspberry Pi can be powered by connecting the red V+ cable to the +5V pin (as shown above) or from USB in (for example, using a separate 5V BEC hooked up to the USB power). Powering via USB is recommended as it is typically safer - because the input is regulated. If powering via USB, do not also connect the +5V pin as shown (still connect common ground)
2. Set up raspberry pi
3. Install https://firmware.ardupilot.org/
4. Setting up Pixhawk
   Connect to the Pixhawk with a ground station (i.e. QGroundControl) and set the following parameters:  
   4.1. :ref:`SERIAL2_PROTOCOL <copter:SERIAL2_PROTOCOL>` = 1 (the default) to enable MAVLink on the serial port.
   4.2. :ref:`SERIAL2_BAUD   <copter:SERIAL2_BAUD>` = 921 so the Pixhawk can communicate with the Raspberry Pi at 921600 baud.
   4.3. :ref:`LOG_BACKEND_TYPE  <copter:LOG_BACKEND_TYPE>` = 3 if you are using APSync to stream the dataflash log files to the Raspberry Pi.
5. Connecting raspberry pi with an SSH
   After setting up Raspberry pi and its running Raspbian,
   Use SSH/Telnet client (Putty)
   Connect the Raspberry Pi to your local network by one of the following methods:  
   o Connecting an Ethernet LAN cable from the Raspberry Pi board to your Ethernet router(https://pingbin.com/2012/12/setup-wifi-raspberry-pi/)
   o Use a USB dongle to connect your Raspberry Pi to the local wireless network
   o Connect the Ethernet LAN cable between the Raspberry Pi and your desktop/laptop computer. Open the control panel's Network and Sharing Center, click on the network connection through which your desktop/laptop is connected to the internet, select properties and then in the sharing tab, select "Allow other networks to connect through this computer's Internet connection"
6. Determine the Raspberry Pi IP address:  
   o If you have access to the Raspberry Pi terminal screen (i.e.you have a screen, keyboard, mouse connected) you can use the /sbin/ifconfig command.
   o If your Ethernet router has a web interface it may show you the IP address of all connected devices.
7. Connect with Putty:
8. Install Raspberry pi packages
   ping google.com
   ping 173.194.126.196
   (DNS server error if first fails and second suceeds)
9. After Internet connection confirmed
   sudo apt-get update #Update the list of packages in the software center
   sudo apt-get install screen python-wxgtk2.8 python-matplotlib python-opencv python-pip python-numpy python-dev libxml2-dev libxslt-dev
   sudo pip install future
   sudo pip install pymavlink
   sudo pip install mavproxy
10. Disable the OS control in serial port
    sudo raspi-config
    (settings -> utility -> advanced options -> serial to disable the OS use of serial connection)
11. Testing Raspberry pi and pixhawk connection
    sudo -s
    mavproxy.py --master=/dev/ttyAMA0 --baudrate 57600 --aircraft MyCopter
    On newer versions of Raspberry Pi 3 the uart serial connection may be disable by default. In order to enable serial connection on the Raspberry Pi edit /boot/config.txt and set enable_uart=1. the build-in serial port is /dev/ttyS0.
12. Once MAVProxy has started you should be able to type in the following command to display the ARMING_CHECK parameters value
    param show ARMING_CHECK
    param set ARMING_CHECK 0
    arm throttle
13. Configure MAVProxy to always run
    edit the etc/rc.local file. add the below lines before the final "exit0" line.
    (
    date
    echo $PATH 
    PATH=$PATH:/bin:/sbin:/usr/bin:/usr/local/bin
    export PATH
    cd /home/pi
    screen -d -m -s /bin/bash mavproxy.py --master=/dev/ttyAMA0 --baudrate 57600 --aircraft MyCopter
    ) > /tmp/rc.log 2>&1
    exit 0
14. Whenever the Raspberry Pi connects to the Pixhawk, three files will be created in the /home/pi/MyCopter/logs/date directory:
    a) mav.parm : a text file with all the parameter values from the Pixhawk
    b) flight.tlog : a telemetry log including the vehicles altitude, attitude, etc which can be opened using the mission planner (and a number of other tools)
    c) flight.tlog.raw : all the data in the .tlog mentioned above plus any other serial data received from the Pixhawk which might include non-MAVLink formatted messages like startup strings or debug output
15. sudo screen -x to connect to MAVProxy app that has automatically been started
16. Install DroneKit
    sudo apt-get install python-pip python-dev python-numpy python-opencv python-serial python-pyparsing python-wxgtk2.8 libxml2-dev libxslt-dev  
    sudo pip install droneapi  
    echo "module load droneapi.module.api" >> ~/.mavinit.scr
17. Open MAVProxy terminal in location where DroneKit script is.
    MANUAL> api start vehicle_state.py
    If you get a warning that droneapi module has not loaded, you can do so manually in MAVProxy:
    MANUAL> module load droneapi.module.api

    \*\*\*SOURCES FOR HELP
    https://www.linkedin.com/pulse/communication-between-drone-raspberry-pi-via-mavlink-yan-pang/
    https://www.youtube.com/watch?v=BNzeVGD8IZI
