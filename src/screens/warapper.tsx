import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyColors from '../colors';
import { SearchBar } from 'react-native-elements';

function Warapper(props: any) {
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: MyColors.teal,
        }}>
        {/*@ts-ignore*/}
        <SearchBar
          platform="android"
          inputContainerStyle={{
            height: 25,
          }}
          containerStyle={{
            borderRadius: 8,
          }} />
      </View>
      {props.children}
    </View>
  );
}
const styles = StyleSheet.create({});

export default Warapper;