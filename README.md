# Installation
```
$ npm install
```

# Run

## Debug Mode
- Android: `react-native run-android`
- iOS: `react-native run-ios`

## Release Mode

### Android

#### Setup
- Generate a signing key using this command:

```sudo keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000```

- Place the `my-release-key.keystore` file under the `android/app` directory in your project folder.
- Edit the file `~/.gradle/gradle.properties`, and add the following (replace ***** with the correct keystore password, alias and key password):
```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

- Generate the release APK, simply run the following in a terminal:
```
$ cd android
$ ./gradlew assembleRelease
```
For detailed info about generating release APK: https://facebook.github.io/react-native/docs/signed-apk-android

#### Run
Run this command in project root folder: `react-native run-android --variant=release`

### iOS
- Go to `ios` folder, and open `Starter.xcodeproj`. It will open XCode
- Go to `Product -> Scheme -> Edit Scheme`.
- Change `Build Configuration` to `Release`
- Run the app

NOTE: To run in debug mode, change back `Build Configuration` to `Debug`