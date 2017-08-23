import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { FileSystem } from 'expo'
import JSZipUtils from 'jszip-utils'
import JSZip from 'jszip'

export default class App extends React.Component {
  async downloadZipFile() {
    const localUri = `${FileSystem.documentDirectory}files.zip`
    console.log('zip uri', localUri)
    const remoteUrl = 'https://raw.githubusercontent.com/smoll/crna-zipfile/master/remote/files.zip'
    const {uri} = await FileSystem.downloadAsync(remoteUrl, localUri)
    console.log('Finished downloading to ', uri)

    const data = await new JSZip.external.Promise((resolve, reject) => {
      JSZipUtils.getBinaryContent(uri, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })

    const zip = await JSZip.loadAsync(data)
    zip.forEach(async (relativePath, file) => {
      const content = await file.async('string')
      console.log('filename: ', relativePath)
      console.log('content: ', content)
    })
  }

  async downloadTextFile() {
    const localUri = `${FileSystem.documentDirectory}1.txt`
    console.log('text uri', localUri)
    const remoteUrl = 'https://raw.githubusercontent.com/smoll/crna-zipfile/master/remote/files/1.txt'
    const {uri} = await FileSystem.downloadAsync(remoteUrl, localUri)
    console.log('Finished downloading to ', uri)

    const data = await FileSystem.readAsStringAsync(uri)
    console.log('typeof: ', typeof data)
    console.log('text data: ', data)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>

        <Button
          onPress={this.downloadZipFile}
          title="Download Zip"
          color="blue"
        />

        <Button
          onPress={this.downloadTextFile}
          title="Download Text File"
          color="purple"
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
