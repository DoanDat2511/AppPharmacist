import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from "react";
import { View, Text, Image, Linking, Platform, Dimensions } from "react-native";
import BarcodeMask from 'react-native-barcode-mask';
import { RNCamera, BarCodeReadEvent } from "react-native-camera";
import IconFlight from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./Styles";
import Colors from "../../utils/colors";
import { IBaseProps } from "../../utils/interface";
import TouchableComponent from "../../components/Button";
import { close, info, barcode, phone } from "../../assets";

enum ERote {
    portrait = "PORTRAIT",
    landscape = "LANDSCAPE",
}

enum Eflash {
    on = RNCamera.Constants.FlashMode.torch,
    off = RNCamera.Constants.FlashMode.off,
}
const ScanPharmacy: React.FC<IBaseProps> = (props) => {

    const { navigation } = props;
    const camera = useRef(null);
    const [barCode, setBarcode] = useState<string>("")
    const [flashStatus, setFlashStatus] = useState<any>(Eflash.off);
    const [orientation, setOrientation] = useState<string>(ERote.portrait);

    useEffect(() => {
        const roteListen = ({ window: { width, height } }) => {
            if (width < height) {
                setOrientation(ERote.portrait);
            } else {
                setOrientation(ERote.landscape);
            }
        };
        Dimensions.addEventListener("change", roteListen);
        return () => {
            return Dimensions.removeEventListener("change", roteListen);
        };
    }, []);

    const onBarCodeRead = useCallback((event: BarCodeReadEvent) => {
        if (barCode === "") {
            return setBarcode(event?.data)
        }
    }, [barCode])

    const _onPressSearch = useCallback(async () => {
        if (barCode) {
            return await Linking.openURL(`https://www.google.com/search?q=${barCode}`)
        }
        return await Linking.openURL(`https://www.google.com/search?q`)
    }, [barCode])

    const _oncloseScanPharmacy = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    const _onCloseModal = useCallback(() => {
        return barCode && setBarcode("")
    }, [barCode])

    const _onPressFlash = useCallback(() => {
        if (flashStatus === Eflash.off) {
            return setFlashStatus(Eflash.on);
        }
        return setFlashStatus(Eflash.off);
    }, [flashStatus]);

    const renderHeader = useMemo(() => {
        return (
            <View
                style={[
                    styles.viewHeader,
                    { marginTop: Platform.OS === "ios" ? 50 : 10 },
                ]}
            >
                <TouchableComponent
                    style={styles.viewCloseHeader}
                    onPress={_oncloseScanPharmacy}
                >
                    <Image source={close} style={styles.iconHeader} />
                </TouchableComponent>

                <View style={styles.viewTitle}>
                    <Text style={styles.title}>Look up Pharmacy</Text>
                </View>

                <TouchableComponent style={styles.btnInfor} onPress={takePicture}>
                    <Image source={info} style={styles.iconInfor} />
                </TouchableComponent>
            </View>
        );
    }, []);

    const renderScanFocus = useMemo(() => {
        const styleView =
            orientation === ERote.portrait
                ? styles.viewFocus
                : styles.viewFocusLANDSCAPE;
        const imageView =
            orientation === ERote.portrait
                ? styles.imgFocus
                : styles.imgFocusLANDSCAPE;
        return (
            <View style={styleView}>
                <BarcodeMask
                    backgroundColor={"transparent"}
                    width={220}
                    height={250}
                    showAnimatedLine={true}
                    outerMaskOpacity={0.8}
                    lineAnimationDuration={750}
                    edgeRadius={1}
                    edgeBorderWidth={2}
                    edgeHeight={15}
                    animatedLineColor={Colors.ORANGE}
                />
            </View>
        );
    }, [orientation]);

    const renderPaymentMethods = useMemo(() => {
        if (barCode)
            return (
                <View style={styles.viewModalDetail}>
                    <View style={styles.headerModal}>
                        <Text style={styles.titleModal}>Another payment methods</Text>
                        <TouchableComponent onPress={_onCloseModal}>
                            <Image source={close} style={styles.imgCloseModal}></Image>
                        </TouchableComponent>
                    </View>
                    <View  style={styles.viewContentModal}>
                        <View style={styles.viewPhone}>
                            <Image
                                source={phone}
                                resizeMode='cover'
                                style={[styles.imgElementModal, { tintColor: Colors.purple }]}
                            />
                            <Text style={styles.titleEleModal}>{barCode}</Text>
                        </View>
                        <View style={styles.viewPhone}>
                            <Image
                                source={barcode}
                                resizeMode='cover'
                                style={styles.imgElementModal}
                            />
                            <Text style={styles.titleEleModal}>Barcode</Text>
                        </View>
                    </View>
                    <TouchableComponent style={styles.btnButtonSearch} onPress={_onPressSearch}>
                        <Text style={styles.titleSearch}>Search product</Text>
                    </TouchableComponent>
                </View>
            );
    }, [barCode]);

    async function takePicture() {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.current.takePictureAsync(options);
        }
    };

    const valueFlash = useMemo(() => {
        return flashStatus || Eflash.off;
    }, [flashStatus]);


    return (
        <View style={styles.container}>
            <RNCamera
                ref={camera}
                style={{ flex: 1 }}
                captureAudio={false}
                type={RNCamera.Constants.Type.back}
                flashMode={valueFlash}
                onBarCodeRead={onBarCodeRead}
                androidCameraPermissionOptions={{
                    title: "Permission to use camera",
                    message: "Camera is required for barcode scanning",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel",
                }}
            >
                {renderHeader}
                {renderScanFocus}
                {renderPaymentMethods}
                <TouchableComponent style={styles.btnFlash} onPress={_onPressFlash}>
                    <IconFlight name='flashlight' size={24} color={Colors.white} />
                </TouchableComponent>
            </RNCamera>
        </View>
    );
};

export default ScanPharmacy;
