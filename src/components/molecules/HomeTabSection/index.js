import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text } from 'react-native';
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { API_HOST } from '../../../config';
import { getSkincareDataByTypes } from '../../../redux/action';
import ItemListSkincare from '../ItemListSkincare';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBarStyle}
    tabStyle={styles.tabStyle}
    renderLabel={({route, focused}) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
    renderTabBarItem={itemProps => {
      const {key, ...restProps} = itemProps;
      return <TabBarItem {...restProps} />;
    }}
  />
);

const Sunscreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {sunscreen} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getSkincareDataByTypes('sunscreen'));
  }, [dispatch]);

  return (
    <ScrollView
      style={styles.containerSunscreen}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}>
      {sunscreen.map((item, index) => {
        return (
          <ItemListSkincare
            key={index}
            type="product"
            name={item.name}
            price={item.price}
            rating={item.rate}
            image={{uri: `${API_HOST.storage}/${item.picturePath}`}}
            onPress={() => navigation.navigate('SkincareDetail', item)}
          />
        );
      })}
    </ScrollView>
  );
};

const Serum = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {serum} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getSkincareDataByTypes('serum'));
  }, [dispatch]);

  return (
    <ScrollView
      style={styles.containerPopular}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}>
      {serum.map((item, index) => {
        return (
          <ItemListSkincare
            key={index}
            type="product"
            name={item.name}
            price={item.price}
            rating={item.rate}
            image={{uri: `${API_HOST.storage}/${item.picturePath}`}}
            onPress={() => navigation.navigate('SkincareDetail', item)}
          />
        );
      })}
    </ScrollView>
  );
};

const FacialWash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {facialWash} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getSkincareDataByTypes('facial_wash'));
  }, [dispatch]);

  return (
    <ScrollView
      style={styles.containerRecommended}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}>
      {facialWash.map((item, index) => {
        return (
          <ItemListSkincare
            key={index}
            type="product"
            name={item.name}
            price={item.price}
            rating={item.rate}
            image={{uri: `${API_HOST.storage}/${item.picturePath}`}}
            onPress={() => navigation.navigate('SkincareDetail', item)}
          />
        );
      })}
    </ScrollView>
  );
};

const initialLayout = {width: Dimensions.get('window').width};

const HomeTabSection = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Sunscreen'},
    {key: '2', title: 'Serum'},
    {key: '3', title: 'Facial Wash'},
  ]);

  const renderScene = SceneMap({
    1: Sunscreen,
    2: Serum,
    3: FacialWash,
  });

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.tabView}
    />
  );
};

export default HomeTabSection;

const styles = StyleSheet.create({
  tabView: {backgroundColor: 'white'},
  indicator: {
    backgroundColor: '#020202',
    height: 3,
    width: '15%',
    marginLeft: '3%',
  },
  tabBarStyle: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  tabStyle: {width: 'auto'},
  tabText: focused => ({
    fontFamily: 'Poppins-Medium',
    color: focused ? '#020202' : '#8D92A3',
  }),
  containerSunscreen: {paddingTop: 8, paddingHorizontal: 24},
  containerPopular: {paddingTop: 8, paddingHorizontal: 24},
  containerRecommended: {paddingTop: 8, paddingHorizontal: 24},
});
