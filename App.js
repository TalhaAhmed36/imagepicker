import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const App = () => {
  let tempArray = [];

  const [image, setImage] = useState(
    'https://picsum.photos/seed/picsum/200/300',
  );
  const [image1, setImage1] = useState('https://picsum.photos/id/237/200/300');
  const [camImage, setcamImage] = useState('https://picsum.photos/200/300');

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setcamImage(image.path);
    });
  };

  const choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const choosePhotoFromGallery2 = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      // console.log(images);
      images.map(image => {
        tempArray.push({
          filename: image.filename,
          path: image.path,
          data: image.data,
        });
        console.log(tempArray);
        setImage1(tempArray);
      });
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={takePhotoFromCamera}>
        <Text style={styles.buttonText}>open camera</Text>
      </TouchableOpacity>
      <Image style={styles.imagestyle} source={{uri: camImage}} />

      <TouchableOpacity style={styles.button} onPress={choosePhotoFromGallery}>
        <Text style={styles.buttonText}>open gallery</Text>
      </TouchableOpacity>
      <Image style={styles.imagestyle} source={{uri: image}} />

      <TouchableOpacity style={styles.button} onPress={choosePhotoFromGallery2}>
        <Text style={styles.buttonText}>add multiple</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <FlatList
          data={tempArray}
          renderItem={({item}) => {
            return (
              <Image style={styles.imagestyle} source={{uri: item.path}} />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 30,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#fff',
  },

  imagestyle: {
    height: 100,

    width: 200,
    marginBottom: 40,
  },

  button: {
    width: 250,

    height: 60,

    backgroundColor: 'lightblue',

    alignItems: 'center',

    justifyContent: 'center',

    borderRadius: 4,

    marginBottom: 32,
  },

  buttonText: {
    textAlign: 'center',

    fontSize: 26,

    color: '#222',
  },
});

export default App;
