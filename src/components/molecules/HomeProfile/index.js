import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {ProfileDummy} from '../../../assets';
import {getData} from '../../../utils';
import {API_HOST} from '../../../config';

const HomeProfile = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(ProfileDummy);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData('userProfile').then(res => {
        setPhoto({uri: `${API_HOST.storage}/${res.profile_photo_path}`});
      });
    });
  }, [navigation]);

  return (
    <View style={styles.profileContainer}>
      <View>
        <Text style={styles.appName}>SkincareStore</Text>
        <Text style={styles.desc}>Let’s get skincare</Text>
      </View>
      <Image source={photo} style={styles.profile} />
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: 'white',
  },
  appName: {fontSize: 22, fontFamily: 'Poppins-Medium', color: '#020202'},
  desc: {fontSize: 14, fontFamily: 'Poppins-Light', color: '#8D92A3'},
  profile: {width: 50, height: 50, borderRadius: 8},
});
