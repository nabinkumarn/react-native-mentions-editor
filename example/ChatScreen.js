import React, { Component } from 'react'
import { 
  ScrollView, 
  Text, 
  KeyboardAvoidingView, 
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import Editor from '../Components/TextEditor'
import EU from '../Components/TextEditor/EditorUtils'

// Styles
import styles from './Styles/ChatScreenStyles'


const users = [
  {
    "id": 1,
    "name": "Raza Dar",
    "username": "mrazadar",
    "gender": "male",
  },
  {
    "id": 2,
    "name": "Tim Pan",
    "username": "tim.pan",
    "gender": "male",
  },
  {
    "id": 3,
    "name": "Taimoor Khan",
    "username": "taimoor.khan",
    "gender": "male",
  },
  {
    "id": 4,
    "name": "Meesha Shafi",
    "username": "meesha.shafi",
    "gender": "female",
  }
]


const formatMentionNode = (txt, key)=> (
  <Text key={key} style={styles.mention}>
      {txt}
  </Text>
)

class ChatScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      showEditor: true,      
      message: '',
      messages: [],
      clearInput: false, 
      showMentions: false, /**use this parameter to programmatically trigger the mentionsList */
    }
  }
  onChangeHandler = message => {
    /**
     * this callback will be called whenever input value change and will have 
     * formatted value for mentioned syntax
     * */ 
    
    this.setState({
      message, 
      clearInput: false
    });
  }
  sendMessage = () => {
    if(this.state.message == "") return;
    const messages = [this.state.message, ...this.state.messages];
    console.log('Messages', messages,)
    this.setState({
      messages,
      message: '',
      clearInput: true,
    })
  }

  toggleEditor = () => {
    /**
    * This callback will be called 
    * once user left the input field. 
    * This will handle blur event.
    */
    // this.setState({
    //   showEditor: false,
    // })
  }
  
  onHideMentions = () => {
    /**
    * This callback will be called 
    * When MentionsList hide due to any user change
    */
    this.setState({
      showMentions: false,
    })
  }

  renderMessageListItem({item:message, index}){
    return (
      <View style={styles.messageListItem}>
        <Text style={styles.messageText}>
          {EU.displayTextWithMentions(message.text, formatMentionNode)}
        </Text>
      </View>
    )
  }
  renderMessageList(){
    return (
      <FlatList
        style={styles.messageList}
        keyboardShouldPersistTaps={"always"}
        horizontal={false}
        inverted
        enableEmptySections={true}
        data={this.state.messages}
        keyExtractor={(message, index) => `${message.text}-${index}`}
        renderItem={(rowData) => {
            return this.renderMessageListItem(rowData)
        }}
      />
    )
  }
  
  render () {

    return (
      <View style={styles.main}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.heading}>React-Native Mentions Package</Text>                                
              <Text style={styles.sub}>Built by @mrazadar</Text>                                
            </View>
            <ScrollView style={styles.messageList}>
              {this.renderMessageList()}
            </ScrollView>
            <View style={styles.footer}> 
              <Editor 
                list={users} 
                message={this.state.message}
                clearInput={this.state.clearInput}
                onChange={this.onChangeHandler}
                showEditor={this.state.showEditor}
                toggleEditor={this.toggleEditor}
                showMentions={this.state.showMentions}
                onHideMentions={this.onHideMentions}
              />       
              <TouchableOpacity                  
                  style={styles.sendBtn}
                  onPress={this.sendMessage}>
                  <Text style={styles.sendBtnText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
