# NA Carolina

## Apple iphone/ipad app link

UNRELEASED

## Android phone/tablet link

UNRELEASED

## Build it yourself (on a mac)

Download the master.zip file...

https://github.com/pjaudiomv/NA-Carolina-App/archive/master.zip

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

### When building for release the following file needs to be changed
`node_modules/ts-overlapping-marker-spiderfier/dist/oms.js`

Line 313 
`if (markerSpiderfied || this.map.getStreetView().getVisible() || this.map.getMapTypeId() === 'GoogleEarthAPI') {`

needs to be changed to 

`if (markerSpiderfied || this.map.getStreetView().getVisible() || this.map.getMapTypeId() === 'GoogleEarthAPI' || this.map.getZoom() < 7) {`

The iphone occasionally depending on meeting count wants to spidefy at inital zoom level 8, we don't want this. 

When building xcode archive for release make sure to uncheck rotation right/left so we lock orientation to portrait. There seems to be an issue with the viewport being reset on rotation, we have the "notch" on iPhone X and up to thanks for this.
