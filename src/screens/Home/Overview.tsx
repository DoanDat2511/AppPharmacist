import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import IconNews from "react-native-vector-icons/Ionicons";
import { Screens } from "../../NavigationConfig";
import colors from "../../utils/colors";
import Colors from "../../utils/colors"
import { IBaseProps } from "../../utils/interface";
import styles from "./Styles";

interface IProductTop extends IBaseProps {
  items: any;
}

const FeatureData = [
  {
    id: 1,
    icon: require("../../assets/images/reload.png"),
    color: Colors.purple,
    backgroundColor: Colors.lightpurple,
    routeName: "",
    description: "home",
  },
  {
    id: 2,
    icon: require("../../assets/images/send.png"),
    color: Colors.yellows,
    backgroundColor: Colors.lightyellow,
    routeName: "",
    description: "home",
  },
  {
    id: 3,
    icon: require("../../assets/images/internet.png"),
    color: Colors.primary,
    backgroundColor: Colors.lightGreen,
    routeName: "",
    description: "home",
  },
  {
    id: 4,
    icon: require("../../assets/images/wallet.png"),
    color: Colors.red,
    backgroundColor: Colors.lightRed,
    routeName: "StackScan",
    description: "Look Up",
  },
  {
    id: 5,
    icon: require("../../assets/images/bill.png"),
    color: Colors.yellows,
    backgroundColor: Colors.lightyellow,
    routeName: "",
    description: "home",
  },
  {
    id: 6,
    icon: require("../../assets/images/games.png"),
    color: Colors.primary,
    backgroundColor: Colors.lightGreen,
    routeName: "",
    description: "home",
  },
  {
    id: 7,
    icon: require("../../assets/images/phone.png"),
    color: Colors.red,
    backgroundColor: Colors.lightRed,
    routeName: "",
    description: "home",
  },
  {
    id: 8,
    icon: require("../../assets/images/more.png"),
    color: Colors.purple,
    backgroundColor: Colors.lightpurple,
    routeName: "",
    description: "home",
  },
];
const dataPromotion = [
  {
    id: 1,
    img: require("../../assets/users/user-3.jpg"),
    title: "Bonus cache",
    description: "food happy ",
  },
  {
    id: 2,
    img: require("../../assets/users/user-3.jpg"),
    title: "Bonus cache",
    description: "food happy ",
  },
  {
    id: 3,
    img: require("../../assets/users/user-3.jpg"),
    title: "Bonus cache",
    description: "food happy ",
  },
  {
    id: 4,
    img: require("../../assets/users/user-3.jpg"),
    title: "Bonus cache",
    description: "food happy ",
  },
];

const ItemFeature: React.FC<IProductTop> = (props) => {
  const { items ,navigation } = props;
  const _onPressFeature = useCallback(()=>{
    navigation.navigate(items?.routeName);
  },[items])
  return (
    <TouchableOpacity style={styles.viewItemFeature}
    onPress={_onPressFeature}
    >
      <View
        style={{
          ...styles.viewImgFeature,
          backgroundColor: items.backgroundColor,
        }}
      >
        <Image
          resizeMode='contain'
          style={{ ...styles.imgFeature, tintColor: items.color }}
          source={items.icon}
        />
      </View>
      <Text style={styles.textFeature}>{items.description}</Text>
    </TouchableOpacity>
  );
};
const ItemProductTop: React.FC<IProductTop> = (props) => {
  const { items } = props;
  return (
    <TouchableOpacity style={styles.viewProduct}>
      <Image source={items.img} style={styles.imgPrduct} />
      <View style={styles.viewContentProduct}>
        <Text style={styles.titleProduct}> {items.title}</Text>
        <Text style={styles.textDescription}> {items.description}</Text>
      </View>
    </TouchableOpacity>
  );
};
const Overview: React.FC<IBaseProps> = (props) => {
  const {navigation} = props
  const renderHeader = useMemo(() => {
    return (
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.titleHello}>Hello!</Text>
          <Text style={styles.textUsername}>Doan Dat</Text>
        </View>
        <View style={styles.viewNoti}>
          <TouchableOpacity>
            <IconNews name='md-notifications-outline' size={22} tintColor={Colors.secondary}/>
          </TouchableOpacity>
          <View style={styles.dotView} />
        </View>
      </View>
    );
  }, []);
  const renderBannar = useMemo(() => {
    return (
      <View style={styles.viewBannar}>
        <Image
          style={styles.imgBannar}
          source={require("../../assets/users/user-3.jpg")}
        />
      </View>
    );
  }, []);

  const headerFeature = useMemo(()=>{
      return (
        <View style={styles.viewHeaderFeature}>
            <Text style={styles.titleFeature}>Features</Text>
        </View>
      )
  },[])

  const renderItemFeature = useCallback(({ item, index }) => {
    return <ItemFeature items={item} navigation={navigation}/>
  }, []);
  
  const renderPromoHeader = useMemo(()=>{
    return (
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.titleHeaderBannar}>Special Promos</Text>
        </View>
        <TouchableOpacity onPress={() => console.log("View All")}>
          <Text style={styles.textViewAll}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
    );
  },[])
  const renderFeature = () => {
    return (
      <FlatList
        ListHeaderComponent={headerFeature}
        data={FeatureData}
        keyExtractor={_keyExtractor}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        style={{ marginTop: 20 }}
        renderItem={renderItemFeature}
      />
    );
  };

  const headerComponent = useMemo(() => {
    return (
      <View>
        {renderHeader}
        {renderBannar}
        {renderFeature()}
        {renderPromoHeader}
      </View>
    );
  }, []);
  const _keyExtractor = useCallback((item, index) => {
    return `${item.id}`;
  }, []);
  const renderItemProductTop = useCallback(({ item, index }) => {
    return <ItemProductTop items={item} />;
  }, []);
  return (
    <>
    <StatusBar barStyle="dark-content"></StatusBar>
      <SafeAreaView  style={styles.container}>
        <FlatList
          ListHeaderComponent={headerComponent}
          data={dataPromotion}
          keyExtractor={_keyExtractor}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={renderItemProductTop}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
};

export default Overview;
