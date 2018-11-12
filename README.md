
React Native App - Udacity React Nanodegree Final Project

This project implements an application that supports creating decks of question/answer cards, lets users execute a deck of cards and keeps score of the results. It is implemented using React Native.

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

* This project was tested on Android using both an emulator and an Android device. It was tested on IOS using an IMac with emulator.

* One issue that isn't clear from the project instructions or the rubric was what to do if a user tried to create a new Deck but entered the name
  of an existing deck. I opted to implement logic so that when a duplicate new Deck name was entered, it vectored to the existing Deck with the same 
  name. 

* For some reason on Android, it would not ask permission for the notifications, although the notification worked. On IOS it did ask for the permission to add notifications.
  

