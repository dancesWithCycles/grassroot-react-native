# grassroot-react-native
build react native project on Ubuntu or Trisquel from scratch using react-native-cli, metro and Android SDK only

## Overview
This repository documents how you set up a `React Native` project from scratch on a `Ubuntu 18.04` or `Trisquel 9.0' operating system using only
* the node.js library `react-native-cli`,
* the bundler `metro` and
* the `Android SDK`.
Please remind me to add `iOS`. The following documentation considers `Android` only.
## Prerequisites
Please have
* the mentioned operating system,
* a smartphone
* and basic knowledge about GNU/Linux at hand.

## Android smartphone
I am using an `Android` smartphone to deploy the `React Native` app. To connect my computer with the phone, I enabled debugging using the phone's settings menu and installed the `Android Debug Bridge` also known as `adb` in the following way.
```sudo apt-get install adb --no-install-recommends```
The following instruction lists all connected phones.
```adb devices```
If your device is classified as having `no permissions`, please follow the next subsection to set up the respective `udev rule`. Atherwise, please skip this subsection.
### Udev rule setup
Please figure out vendor and product identifier using the following instruction.
```lsusb'''
Create a new `udev rule`.
```sudo touch /etc/udev/rules.d/51-android.rules```
Add an entry for your phone that includes your <vendor> and <product> identifier.
```SUBSYSTEM=="usb", ATTR{idVendor}=="<your vendor id>", ATTR{idProduct}=="<your product id>", MODE="0666", GROUP="plugdev"```
Reload the `udev rules`.
```sudo udevadm control --reload-rules```
And finally find your device having permissions.
```adb devices```

## Android SDK
A `React Native` project does not require `Android Studio` but `Android SDK`. The SDK is installed and configured in the following way. Go to this [website](https://developer.android.com/studio/index.html#command-tools) to install the required command line tools.

