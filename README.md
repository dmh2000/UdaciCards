This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Table of Contents

* [Expo](#Expo)
* [Install](#Install)
* [Run](#Run)
* [Notes](#Notes)

### Expo

This project requires the Expo App to be installed on the target device. Expo is available via the Android Play Store or the Apple App Store.
Install it with defaults.

### Download

Obtain the source for this project by downloading or cloning the Github Repository from [dmh2000/UdaciCards](https://github.com/dmh2000/UdaciCards.git)

From a terminal prompt:
    > git clone https://github.com/dmh2000/UdaciCards.git

### Install

This project used NPM (not Yarn).     

From a terminal prompt:
    > cd UdaciCards
    > npm install

### Run

From a terminal prompt:
    > npm start

Connect to the device or emulator according to the instructions shown on the terminal

### Notes

* This project was tested primarily on Android. Because I did not have easy access to an Apple development system, I was unable to test on Apple
  during development. I was able to borrow a Mac to do a one-time test after completion. The application appeared to work properly on an IOS emulator.

* One issue that isn't clear from the project instructions or the rubric was what to do if a user tried to create a new Deck but entered the name
  of an existing deck. I opted to implement logic so that when a duplicate new Deck name was entered, it vectored to the existing Deck with the same 
  name. 
  

