import { StyleSheet, Dimensions } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
const { width, height } = Dimensions.get('window')

const optionStyle = {
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
  paddingVertical: 20,
  // paddingHorizontal: 15,
}

const optionTextStyle = {
  flex: 1,
  textAlign: 'left',
  color: '#000000',
  fontSize: 15,
}

export default StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center'
    width,
    height,
    ...ifIphoneX({
      paddingTop: 50
  }, {
      paddingTop: 0
  })
  },
  titleTextStyle: {
    flex: 0,
    color: '#fff',
    fontSize: 20,
    marginBottom: 15
  },
  listContainer: {
    flex: 1,
    width,
    height,
    backgroundColor: '#fff',
    borderRadius: 0,
    marginBottom: 15
  },
  cancelContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelButton: {
    flex: 0,
    backgroundColor: 'transparent',
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 10,
    // justifyContent:'center',
    // alignItems: 'center',
  },
  cancelButtonText: {
    // textAlign: 'center',
    // fontSize: 18,
    // backgroundColor:'white',
    // marginLeft: 15,
  },
  filterTextInputContainer: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#999'
  },
  filterTextInput: {
    paddingVertical: 12,
    flex: 0,
    height: 40,
    // borderColor:'#E9E9E9',
    // borderWidth:1,   
    // width:'75%',
    borderRadius:8,
  },
  categoryStyle: {
    ...optionStyle
  },
  categoryTextStyle: {
    ...optionTextStyle,
    color: '#999',
    fontStyle: 'italic',
    fontSize: 16,
    // marginHorizontal: 10,
  },
  optionStyle: {
    ...optionStyle,
    marginHorizontal: 20,
  },
  optionStyleLastChild: {
    borderBottomWidth: 0,
    
  },
  optionTextStyle: {
    ...optionTextStyle,
    
  },
  selectedOptionStyle: {
    ...optionStyle,
    
  },
  selectedOptionStyleLastChild: {
    borderBottomWidth: 0,
    
  },
  selectedOptionTextStyle: {
    ...optionTextStyle,
    fontWeight: '700',
    
  },
  noResults: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  noResultsText: {
    flex: 1,
    textAlign: 'center',
    color: '#ccc',
    fontStyle: 'italic',
    fontSize: 22
  }
})
