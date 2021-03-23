# grassroot-react-native
build react native project on Ubuntu or Trisquel from scratch using react-native-cli, metro and Android SDK only

## Overview
This repository documents how you set up a `React Native` project from scratch on a `Ubuntu 18.04` or `Trisquel 9.0` operating system using only
* the node.js library `react-native-cli`,
* the bundler `metro` and
* the `Android SDK`.
Please remind me to add `iOS`. The following documentation considers `Android` only.
## Prerequisites
Please have
* the mentioned operating system,
* a smartphone and
* basic knowledge about GNU/Linux at hand.

## Android smartphone
I am using an `Android` smartphone to deploy the `React Native` app. To connect my computer with the phone, I enabled debugging using the phone's settings menu and installed the `Android Debug Bridge` also known as `adb` in the following way.

```sudo apt-get install adb --no-install-recommends```

The following instruction lists all connected phones.

```adb devices```

If your device is classified as having `no permissions`, please follow the next subsection to set up the respective `udev rule`. Otherwise, please skip this subsection.
### Udev rule setup
Please figure out vendor and product identifier of your phone using the following instruction.
```lsusb```

Create a new `udev rule`.
```sudo touch /etc/udev/rules.d/51-android.rules```

Add an entry for your phone that includes your <vendor> and <product> identifier.
```SUBSYSTEM=="usb", ATTR{idVendor}=="<your vendor id>", ATTR{idProduct}=="<your product id>", MODE="0666", GROUP="plugdev"```

Reload the `udev rules`.
```sudo udevadm control --reload-rules```

And finally find your device having permissions.
```adb devices```

## Android SDK
A `React Native` project does not require `Android Studio` but `Android SDK`. The SDK is installed and configured in the following way. Go to this [website](https://developer.android.com/studio/index.html#command-tools) to install the required command line tools. I recommend to unzip and copy these tools to your file system in the following way.

```
sudo mkdir ~/devTools/Android
sudo mkdir ~/devTools/Android/cmdline-tools
unzip commandlinetools-linux-6200805_latest.zip
mv tools ~/devTools/Android/cmdline-tools/
ls -l ~/devTools/Android/cmdline-tools/tools
```

Please adjust the name of the zip file to the version of the tools you just downloaded! After the file structure is present, please go ahead and add the path to the `Android SDK` to the environment variables of your operating system. I did it this way.
```sudo nano ~/.bashrc```

Finally the tail of my `.bashrc` file looks this way.

```
#export path for development tools
DEV_TOOLS="$HOME/devTools"

#export path for react-native library
NODE_HOME="/home/stefan/.nvm/versions/node/v14.16.0"
export NODE_HOME

#add java environment variables
JAVA_HOME="$DEV_TOOLS/jdk/jdk8u282-b08"
export JAVA_HOME

#add android environemnt variables
ANDROID_HOME="$DEV_TOOLS/android"
export ANDROID_HOME
ANDROID_SDK_ROOT=$ANDROID_HOME/cmdline-tools/tools/bin
export ANDROID_SDK_ROOT
ANDROID_AVD_HOME=$ANDROID_SDK_ROOT
export ANDROID_AVD_HOME

#export PATH
export PATH="$NODE_HOME/bin:$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/tools/bin:$ANDROID_HOME/platform-tools:$PATH"
```

You can run ```source ~/.bashrc``` or open a new terminal to have the latest configuration present in you terminal. Please note that I also configured the `Java JDK` using the same approach as for the `Android SDK`. Please refer to the next section, if you like to follow my approach. Otherwise, feel free to skip it.

## Java JDK


