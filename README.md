# NA New England

## Apple iphone/ipad app link

UNRELEASED

## Android phone/tablet link

UNRELEASED

## Build it yourself (on a mac)

Download the master.zip file...

https://github.com/pjaudiomv/NA-Nerna-Search/archive/master.zip

Unzip the zip file and cd into the directory that is created

Install Ionic Framework (For more details see https://ionicframework.com/)
```
$ npm install -g ionic@latest
```
Install package.json dependencies
```
$ npm install
```
Install Cordova/PhoneGap plugins (Cordova Plugins package.json branch dependencies)
```
$ ionic state restore
```
Test your app on multiple screen sizes and platform types by starting a local development server
```
$ ionic serve
```
or
```
$ ionic serve --lab
```
To build for app store distribution, I have found that the best thing to do is to run the re-plugin.sh script.

After this, a platforms directory will be created with folder for android that contains an Android Studio project, and a folder for ios that contains an xcode project.


