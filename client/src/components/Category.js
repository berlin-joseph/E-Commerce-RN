import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../constants/Theme';

const Category = () => {
  const [selectedItem, setSelectedItem] = useState('All');
  const data = [
    {id: 1, title: 'All'},
    {id: 2, title: 'Laptop'},
    {id: 3, title: 'Mobile'},
    {id: 4, title: 'Grocery'},
  ];

  return (
    <View style={{paddingHorizontal: responsiveWidth(5)}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              {
                backgroundColor:
                  selectedItem === item.title ? colors.primary : colors.gray,
              },
            ]}
            onPress={() => setSelectedItem(item.title)}>
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    selectedItem === item.title ? colors.white : colors.black,
                },
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    borderColor: colors.black,
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    marginRight: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveWidth(2),
  },
  categoryText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
});

export default Category;
