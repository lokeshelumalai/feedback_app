import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, Animated, Dimensions } from "react-native";
import axios from 'axios';

export default function SplashScreen() {
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    // Fetching image URL from API
    axios.get('https://mediumblue-jellyfish-250677.hostingersite.com/api/navbar')
      .then(response => {
        const data = response.data;
        const lastItem = data[data.length - 1];
        const imageUrl = lastItem?.image;
        setImageUri(imageUrl);
        console.log(imageUrl);
      })
      .catch(error => {
        console.error("Error fetching image URL:", error);
      });

    // Starting the fade-in animation
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Animated.View style={{ opacity: fadeAnimation }}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="contain" // Ensures the aspect ratio is maintained
          />
        </Animated.View>
      ) : null}
    </View>
  );
}

// Get the full screen width
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%', // Set width to 100% of the container
    height: 'auto', // In React Native, the height will auto-adjust based on aspect ratio with resizeMode
    aspectRatio: 1, // Optional: Remove this line if you want it based on the actual image aspect ratio
  },
});
