import axios from "axios"
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import FormData from 'form-data'
import { apiUrl } from "../../environment"

export const uploadPhoto = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') alert('Sorry, we need camera roll permissions to make this work!');
    else return pickImage()
  }
  return pickImage()
}

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
  });

  if (!result.cancelled) {
    let formData = new FormData();

    formData.append("image", {
      uri: result.uri,
      name: `photo.jpg`,
      type: `image/jpg`
    });

    const imageURL = await axios.post(`${apiUrl}/upload`, formData, {
      headers: {
        'Accept': "application/json",
        "Content-Type": "multipart/form-data"
      }
    })
    return imageURL.data
  }
};