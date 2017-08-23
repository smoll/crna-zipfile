import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { FileSystem } from 'expo'

export default class App extends React.Component {
  async downloadFile() {
    const localUri = `${FileSystem.documentDirectory}files.zip`
    console.log('localUri', localUri)
    const remoteUrl = 'https://raw.githubusercontent.com/smoll/crna-zipfile/master/remote/files.zip'
    const res = await FileSystem.downloadAsync(remoteUrl, localUri)
    console.log('Finished downloading to ', res.uri)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>

        <Button
          onPress={this.downloadFile}
          title="Download Zip"
          color="#841584"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
