import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Gap, HomeProfile, HomeTabSection, SkincareCard } from '../../components';
import { API_HOST } from '../../config';
import { getSkincare } from '../../redux/action';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {skincare} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getSkincare());
  }, [dispatch]);
  return (
    <View style={styles.page}>
      <HomeProfile />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.foodCardContainer}>
            <Gap width={24} />
            {skincare.map((itemSkincare, index) => {
              return (
                <SkincareCard
                  key={index}
                  name={itemSkincare.name}
                  image={{uri: `${API_HOST.storage}/${itemSkincare.picturePath}`}}
                  rating={itemSkincare.rate}
                  onPress={() => navigation.navigate('SkincareDetail', itemSkincare)}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.tabContainer}>
        <HomeTabSection />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {flex: 1},
  foodCardContainer: {flexDirection: 'row', marginVertical: 24},
  tabContainer: {flex: 1},
});
