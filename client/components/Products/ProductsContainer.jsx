import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const ProductsContainer = ({data}) => {
  console.log(data, 'container');
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: responsiveScreenWidth(2),

        justifyContent: 'space-between',
      }}>
      <Image
        source={{uri: data.image}}
        style={{
          height: responsiveScreenHeight(15),
          width: responsiveScreenWidth(45),
          borderRadius: responsiveScreenWidth(3),
          resizeMode: 'contain',
        }}
      />
      <Text numberOfLines={1} style={{marginTop: responsiveScreenHeight(1)}}>
        {data?.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: responsiveScreenHeight(1),
        }}>
        <Text
          style={{
            fontSize: responsiveScreenFontSize(2),
            fontWeight: '700',
          }}>
          ${data?.price}
        </Text>
        <Text style={{color: 'orange'}}>{data?.ratings} Rating</Text>
      </View>
      <View style={{alignSelf: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            paddingVertical: responsiveScreenWidth(3),
            paddingHorizontal: responsiveScreenWidth(5),
            borderRadius: responsiveScreenWidth(2),
          }}>
          <Text>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductsContainer;

const styles = StyleSheet.create({});
