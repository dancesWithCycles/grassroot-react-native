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

Add an entry for your phone that includes your `<vendor>` and `<product>` identifier.

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

Finally the tail of my `.bashrc` file looks this.

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

Feel free to double check your configuration.

```sdkmanager --version```

Install platform and build tools for Android version 29.

```
sdkmanager "platforms;android-29"
sdkmanager "build-tools;29.0.3"
```

Accept Android Licenses.

```sdkmanager --licenses```

Update Android packages.

```sdkmanager --update```

## Java `OpenJDK`
Download OpenJDK 8 from this [website](https://adoptopenjdk.net/). Afterwards, extract the `OpenJDK` in the following way. Please mind to adjust the archive file name to your needs.

```tar -zxvf ~/Downloads/OpenJDK11U-jdk***tar.gz -C ~/devTools/JDK/```

If everything went smoothly, you can go along to adjust the path for the `OpenJDK` in the same way as you did for the `Android SDK`. Please refer to the tail of my `.bashrc` file above for a recommendation of environment variable configuration.

Do not forget to reset the `PATH` variable and double check your configuration.

```
source ~/.bashrc
java --version
javac --version
```

## Node.js
`React Native` requires `Node.js` version 12 or newer. I used the 'Node Version Manager` also known as `nvm` to install and configure a decent version of `Node.js` but many other exist.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bashrc
nvm list-remote
nvm install v14.16.0
```

I installed the current `Long Term Support` version also known as `LTS` version. You can double check your configuration by calling `nvm list`.

## React Native
