import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, View, ListView, Dimensions,TouchableOpacity, ActivityIndicator,Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width } = Dimensions.get('window');
const {height} =Dimensions.get('window')
import styles from './styles'


export default class ModalFilterPicker extends Component {
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {
      filter: '',
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.key !== r2.key
      }).cloneWithRows(props.options)
    }
  }

  componentWillReceiveProps (newProps) {
    if ((!this.props.visible && newProps.visible) || (this.props.options !== newProps.options)) {
      this.setState({
        filter: '',
        ds: this.state.ds.cloneWithRows(newProps.options),
      })
    }
  }

  render () {
    const {
      title,
      titleTextStyle,
      overlayStyle,
      cancelContainerStyle,
      renderList,
      renderCancelButton,
      visible,
      modal,
      onCancel
    } = this.props

    const renderedTitle = (!title) ? null : (
      <Text style={titleTextStyle || styles.titleTextStyle}>{title}</Text>
    )

    return (
      <Modal
        onRequestClose={onCancel}
        {...modal}
        visible={visible}
        supportedOrientations={['portrait', 'landscape']}
        style={{width}}
      >
        <View style={overlayStyle || styles.overlay}>
          {renderedTitle}
          {(renderList || this.renderList)()}
          <View style={cancelContainerStyle || styles.cancelContainer}>
            {(renderCancelButton || this.renderCancelButton)()}
          </View>
        </View>
      </Modal>
    )
  }

  renderList = () => {
    const {
      showFilter,
      autoFocus,
      listContainerStyle,
      androidUnderlineColor,
      placeholderText,
      placeholderTextColor,
      filterTextInputContainerStyle,
      cancelButtonStyle,
      cancelButtonTextStyle,
      cancelButtonText,
      filterTextInputStyle
    } = this.props

  

    const filter = (!showFilter) ? null : (
      <View style={filterTextInputContainerStyle || styles.filterTextInputContainer}>

          <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:20,marginVertical:10,width:'100%'}}>
          <View style={{justifyContent:'center',width:'8%'}}>
          <Icon
                        name="search"
                        size={25}
                        style={{  }}
                      />
                      </View>
              <View style={{width:'75%'}}>
             
              <TextInput
                    onChangeText={this.onFilterChange}
                    autoCorrect={false}
                    blurOnSubmit={true}
                    autoFocus={autoFocus}
                    autoCapitalize="none"
                    underlineColorAndroid={androidUnderlineColor}
                    placeholderTextColor={placeholderTextColor}
                    placeholder={placeholderText}
                    style={filterTextInputStyle || styles.filterTextInput} 
                />
              </View>
                
              <View style={{justifyContent:'center',width:'17%'}}>
                <TouchableOpacity onPress={this.props.onCancel}
                  activeOpacity={0.7}
                  style={cancelButtonStyle || styles.cancelButton}
                >
                <Icon name="close" style={cancelButtonTextStyle || styles.cancelButtonText} size={30} color="black" />
                </TouchableOpacity>
                </View>
              
          </View>
      
      </View>
    )

    return (
      <View style={listContainerStyle || styles.listContainer}>
        {filter}
        {this.renderOptionList()}
      </View>
    )
  }

  renderOptionList = () => {
    const {
      noResultsText,
      listViewProps,
      keyboardShouldPersistTaps
    } = this.props

    const { ds } = this.state

    if (1 > ds.getRowCount()) {
      return (
        <ListView
          enableEmptySections={false}
          {...listViewProps}
          dataSource={ds.cloneWithRows([{ key: '_none' }])}
          renderRow={() => (
            <View style={styles.noResults}>

              <Text style={styles.noResultsText}>
              
              {noResultsText}
              </Text>
              <ActivityIndicator  
              // animating = {props.options}
              style = {styles.activityIndicator} size = "large"
              />
            </View>
          )}
        />
      )
    } else {
      return (
        <ListView
          enableEmptySections={false}
          {...listViewProps}
          dataSource={ds}
          renderRow={this.renderOption}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        />
      )
    }
  }

  renderOption = (rowData) => {
    const {
      selectedOption,
      renderOption,
        optionTextStyle,
      selectedOptionTextStyle
    } = this.props

    const { key, label } = rowData

    let style = styles.optionStyle
    let textStyle = optionTextStyle||styles.optionTextStyle

    if (key === selectedOption) {
      style = styles.selectedOptionStyle
      textStyle = selectedOptionTextStyle ||styles.selectedOptionTextStyle
    }

    if (renderOption) {
      return renderOption(rowData, key === selectedOption)
    } else {
      return (
        <TouchableOpacity activeOpacity={0.7}
          style={style}
          onPress={() => this.props.onSelect(key)}
        >
          <Text style={textStyle}>{label}</Text>
        </TouchableOpacity>
      )
    }
  }

  renderCancelButton = () => {
    const {
      cancelButtonStyle,
      cancelButtonTextStyle,
      cancelButtonText
    } = this.props

    // return (
    //   <TouchableOpacity onPress={this.props.onCancel}
    //     activeOpacity={0.7}
    //     style={cancelButtonStyle || styles.cancelButton}
    //   >
    //     <Text style={cancelButtonTextStyle || styles.cancelButtonText}>{cancelButtonText}</Text>
    //   </TouchableOpacity>
    // )
  }

  onFilterChange = (text) => {
    const { options } = this.props

    const filter = text.toLowerCase()

    // apply filter to incoming data
    const filtered = (!filter.length)
      ? options
      : options.filter(({ searchKey, label, key }) => (
        0 <= label.toLowerCase().indexOf(filter) ||
          (searchKey && 0 <= searchKey.toLowerCase().indexOf(filter))
      ))

    this.setState({
      filter: text.toLowerCase(),
      ds: this.state.ds.cloneWithRows(filtered)
    })
  }
}

ModalFilterPicker.propTypes = {
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  placeholderText: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  androidUnderlineColor: PropTypes.string,
  cancelButtonText: PropTypes.string,
  title: PropTypes.string,
  noResultsText: PropTypes.string,
  visible: PropTypes.bool,
  showFilter: PropTypes.bool,
  modal: PropTypes.object,
  selectedOption: PropTypes.string,
  renderOption: PropTypes.func,
  renderCancelButton: PropTypes.func,
  renderList: PropTypes.func,
  listViewProps: PropTypes.object,
  filterTextInputContainerStyle: PropTypes.any,
  filterTextInputStyle: PropTypes.any,
  cancelContainerStyle: PropTypes.any,
  cancelButtonStyle: PropTypes.any,
  cancelButtonTextStyle: PropTypes.any,
  titleTextStyle: PropTypes.any,
  overlayStyle: PropTypes.any,
  listContainerStyle: PropTypes.any,
  optionTextStyle:PropTypes.any,
  selectedOptionTextStyle:PropTypes.any,
  keyboardShouldPersistTaps: PropTypes.string
}

ModalFilterPicker.defaultProps = {
  placeholderText: '',
  placeholderTextColor: '#000000',
  androidUnderlineColor: '#ffffff',
  cancelButtonText: 'Cancel',
  noResultsText: 'No data',
  visible: true,
  showFilter: true,
  keyboardShouldPersistTaps: 'never'
}
