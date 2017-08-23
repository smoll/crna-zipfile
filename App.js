import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { FileSystem } from 'expo'
import JSZipUtils from 'jszip-utils'
import JSZip from 'jszip'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {image: ''}
  }

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
      console.log('relativePath: ', relativePath)
      console.log('content: ', content)

      const unzipped = `${FileSystem.documentDirectory}${relativePath.split('.')[0]}-unzipped.txt`
      await FileSystem.writeAsStringAsync(unzipped, content)
      console.log('unzipped: ', unzipped)

      if (unzipped.endsWith('jpeg')) {
        this.setState({image: unzipped})
      }
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
    const {image} = this.state
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>

        <Button
          onPress={this.downloadZipFile.bind(this)}
          title="Download Zip"
          color="blue"
        />

        <Button
          onPress={this.downloadTextFile}
          title="Download Text File"
          color="purple"
        />

        {image ?
          <Image
            style={{width: 292, height: 172}}
            source={{uri: image}}
          /> :
          null
        }
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
