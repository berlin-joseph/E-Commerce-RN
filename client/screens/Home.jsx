import {
  StatusBar,
  StyleSheet,
  Text,
  Platform,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../Redux/slice/productSlice';
import InputComponent from '../components/InputComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const Home = () => {
  const dispatch = useDispatch();
  const {products, status, error} = useSelector(state => state.products);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView style={styles.ScrollView}>
        <View style={styles.container}>
          <Pressable style={styles.Pressable}>
            <Ionicons
              name="search-sharp"
              size={24}
              color={'black'}
              style={styles.icon}
            />
            <InputComponent placeholder={'Search'} />
          </Pressable>
          <Octicons
            name="filter"
            size={24}
            color={'black'}
            style={styles.icon}
          />
        </View>

        <View>
          <TouchableOpacity style={styles.locationContainer}>
            <EvilIcons name="location" size={25} color={'black'} />
            <Text style={styles.locationText}>Delicer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  SafeAreaView: {
    flexL: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    backgroundColor: '#00CED1',
    padding: responsiveScreenWidth(2),
    flexDirection: 'row',
  },
  Pressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: responsiveScreenWidth(1),
    height: responsiveScreenHeight(4),
  },
  icon: {
    alignSelf: 'center',
    paddingHorizontal: responsiveScreenHeight(1),
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#AFEEEE',
    padding: responsiveScreenHeight(1),
    gap: responsiveScreenWidth(1),
  },
  locationText: {fontSize: responsiveFontSize(2), fontWeight: '400'},
});
