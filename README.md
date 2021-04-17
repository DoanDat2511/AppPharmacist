# AppPharmacistA Picker component for React Native which emulates the native 

A Picker component for React Native which emulates the native <select> interfaces for iOS and Android

For iOS, by default we are wrapping an unstyled TextInput component. You can then pass down styles to customize it to your needs.

For Android, by default we are using the native Picker component. If you prefer, you can set useNativeAndroidPickerStyle to false, which will also render an unstyled TextInput component. You can then pass down styles to customize it to your needs.

For either platform, you can alternatively pass down a child element of your choice that will be wrapped in a touchable area.

iOS Example Android Example
Props
Name	Description	Details
onValueChange	Callback which returns value, index	required
function
items	The items for the component to render
- Each item should be in the following format:
{label: 'Orange', value: 'orange', key: 'orange', color: 'orange', inputLabel: 'Orange!'}
- label and value are required
- key, color, and inputLabel are optional
- key will be set to equal label if not included
- value can be any data type
- If inputLabel exists, the TextInput will display that value instead of the label	required
array
placeholder	- An override for the default placeholder object with a label of Select an item... and a value of null
- An empty object can be used if you'd like to disable the placeholder entirely	object
disabled	Disables interaction with the component	boolean
value	Will attempt to locate a matching item from the items array by checking each item's value property. If found, it will update the component to show that item as selected. If the value is not found, it will default to the first item.	any
itemKey	Will attempt to locate a matching item from the items array by checking each item's key property. If found, it will update the component to show that item as selected. If the key is not found, it will attempt to find a matching item by value as above.	string, number
style	Style overrides for most parts of the component.
More details in styling	object
pickerProps	Additional props to pass to the Picker (some props are used in core functionality so use this carefully)	object
Icon	Custom icon component to be rendered.
More details in styling	Component
textInputProps	Additional props to pass to the TextInput (some props are used in core functionality so use this carefully). This is iOS only unless useNativeAndroidPickerStyle={false}.	object
touchableWrapperProps	Additional props to pass to the touchable wrapping the TextInput (some props are used in core functionality so use this carefully)	object
onOpen
Callback triggered right before the opening of the picker
Not supported when useNativeAndroidPickerStyle={true}	function
useNativeAndroidPickerStyle
Android only	The component defaults to using the native Android Picker in its un-selected state. Setting this flag to false will mimic the default iOS presentation where a tappable TextInput is displayed.
More details in styling	boolean
fixAndroidTouchableBug
Android only	Experimental flag to fix issue #354	boolean
InputAccessoryView
iOS only	Replace the InputAcessoryView section (bar with tabbing arrown and Done button) of the opened picker with your own custom component. Can also return null here to hide completely. While this bar is typical on select elements on the web, the interface guidelines does not include it. View the snack to see examples on how this can be customized.	Component
doneText
iOS only	"Done" default text on the modal. Can be overwritten here	string
onUpArrow / onDownArrow
iOS only	Presence enables the corresponding arrow
- Closes the picker
- Calls the callback provided	function
onDonePress
iOS only	Callback when the 'Done' button is pressed	function
onClose
iOS only	Callback triggered right before the closing of the picker	function
modalProps
iOS only	Additional props to pass to the Modal (some props are used in core functionality so use this carefully)	object
touchableDoneProps
iOS only	Additional props to pass to the Done touchable (some props are used in core functionality so use this carefully)	object
