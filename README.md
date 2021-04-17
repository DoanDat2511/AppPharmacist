# AppPharmacistA Picker component for React Native which emulates the native 

<select> interfaces for iOS and Android

For iOS, by default we are wrapping an unstyled TextInput component. You can then pass down styles to customize it to your needs.

For Android, by default we are using the native Picker component. If you prefer, you can set useNativeAndroidPickerStyle to false, which will also render an unstyled TextInput component. You can then pass down styles to customize it to your needs.

For either platform, you can alternatively pass down a child element of your
