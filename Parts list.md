
| Name                          | Price (£) | Datasheet | Dimensions (cm)       | Weight (g) | Interfaces                                    | Drivers | Link                                                                                                               |
| ----------------------------- | --------- | --------- | --------------------- | ---------- | --------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| Raspberry Pi Zero 2 W         | 15        |           |                       |            | micro-USB<br><br>CSI-camera connector<br><br> |         | https://thepihut.com/products/raspberry-pi-zero-2?srsltid=AfmBOoquJQ06dyYRHNxDMViEArSBkQ74mmLa23J2_h3uuXBtHgFRZORI |
| Quectel EC25-E                | 28        |           | 3.2cm x 2.9cm x 0.2cm |            |                                               |         | https://www.aliexpress.com/item/1005006319126849.html                                                              |
| Raspberry Pi Camera Module v3 | 23        |           |                       |            |                                               |         | https://thepihut.com/products/raspberry-pi-camera-module-3?src=raspberrypi                                         |
| USB-OTG adapter               | 2         |           |                       |            |                                               |         | https://thepihut.com/products/usb-to-microusb-otg-converter-shim                                                   |
| Antenna                       | 1.93      |           |                       |            | RF Gen 1                                      |         | https://www.digikey.co.uk/en/products/detail/quectel/YFCA002AA/15706730                                            |
| Micro SIM Card                |           |           |                       |            |                                               |         |                                                                                                                    |
|                               |           |           |                       |            |                                               |         |                                                                                                                    |
|                               |           |           |                       |            |                                               |         |                                                                                                                    |
|                               |           |           |                       |            |                                               |         |                                                                                                                    |
|                               |           |           |                       |            |                                               |         |                                                                                                                    |
# SIM requirements
https://www.4g.co.uk/4g-frequencies-uk-need-know/
https://4grouter.co.uk/4g-and-5g-frequencies-in-the-uk/ 

| **FREQUENCY** | BAND                       | **2G/3G/4G/5G** | **NETWORK** |
| ------------- | -------------------------- | --------------- | ----------- |
| 800MHz        | Band 20                    | 4G              | Vodafone    |
| 900MHz        | Band 8                     | 2G & 3G         | Vodafone    |
| 1400MHz       | Band 32                    | 4G              | Vodafone    |
| 1800MHz       | Band 3                     | 2G              | Vodafone    |
| 2100MHz       | Band 1                     | 3G              | Vodafone    |
| 2600MHz       | Band 7 & Band 38           | 4G              | Vodafone    |
| 3500MHz       | Band 42 / 5G NR Band n78   | 5G              | Vodafone    |
| _800MHz_      | _Band 20_                  | _4G_            | _O2_        |
| _900MHz_      | _Band 8_                   | _2G & 3G_       | _O2_        |
| _1800MHz_     | _Band 3_                   | _2G & 4G_       | _O2_        |
| _2100MHz_     | _Band 1_                   | _3G & 4G_       | _O2_        |
| _2300Mhz_     | _Band 40_                  | _4G_            | _O2_        |
| _3500MHz_     | _Band 42 / 5G NR Band n78_ | _5G_            | _O2_        |
| 800MHz        | Band 20                    | 4G              | EE          |
| 1800MHz       | Band 3                     | 3G & 4G         | EE          |
| 2100MHz       | Band 1                     | 3G & 4G         | EE          |
| 2600MHz       | Band 7 & Band 38           | 4G              | EE          |
| 3500MHz       | Band 42 / 5G NR Band n78   | 5G              | EE          |
| _800MHz_      | _Band 20_                  | _4G_            | _Three_     |
| _1400MHz_     | _Band 32_                  | _4G_            | _Three_     |
| _1800MHz_     | _Band 3_                   | _4G_            | _Three_     |
| _2100MHz_     | _Band 1_                   | _3G_            | _Three_     |
| _3500MHz_     | _Band 42 / 5G NR Band n78_ | _5G_            | _Three_     |

The Quectel EC25-E modem is compatible with Vodafone, O2, EE and Three networks. 

|          | BAND                                              | **NETWORK**                                                                           |
| -------- | ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| LTE-FDD  | Band 1, Band 3, Band 5<br>Band 7, Band 8, Band 20 | Vodafone - 1, 3, 7, 8, 20<br>O2 - 1, 3, 8, 20<br>EE - 1, 3, 7, 20<br>Three - 1, 3, 20 |
| LTE-TDD  | Band 38, Band 40, Band 41                         | Vodafone - 38<br>O2 - 40<br>EE - 38<br>Three -                                        |
| WCDMA    | Band 1, Band 5, Band 8                            | Vodafone - 1, 8<br>O2 - 1, 8<br>EE - 1<br>Three - 1                                   |
| GSM/EDGE | Band 3, Band 8                                    | Vodafone - 3, 8<br>O2 - 3, 8<br>EE - 3<br>Three - 3                                   |


# Antenna requirements
Potential antenna:

- Quectel YFCA002AA https://www.digikey.co.uk/en/products/detail/quectel/YFCA002AA/15706730
- Bands supported: 20, 8, 3, minimum
- Small size & low mass

For optimal performance, the antenna should:

- Support LTE Bands 1, 3, 5, 7, 8, 20, 38, and 40.
- Have wideband LTE coverage (698MHz–2700MHz or higher).
- Be designed for UK 4G networks.

