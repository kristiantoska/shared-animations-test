import React, { useEffect } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import Swiper from "react-native-swiper";

import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";
import { TouchableOpacity } from "react-native-gesture-handler";

const Screen1 = () => {
  const startAncestorRef = React.useRef();
  const startNodeRef = React.useRef();
  const endAncestorRef = React.useRef();
  const endNodeRef = React.useRef();

  const positionRef = React.useRef(new Animated.Value(0));
  const swiperRef = React.useRef();

  const [currentI, setCurrentI] = React.useState(null);
  const [isInProgress, setIsInProgress] = React.useState(false);

  const toggleAnimation = nextIndex => {
    setCurrentI(nextIndex);
    console.log(currentI, nextIndex);
  };

  useEffect(() => {
    if (currentI === null) {
      return;
    }
    console.log("here?", swiperRef.current?.scrollBy);
    swiperRef.current?.scrollBy(currentI === 1 ? 1 : -1, true);
    setIsInProgress(true);
    Animated.timing(positionRef.current, {
      toValue: currentI,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setIsInProgress(false));
  }, [currentI]);

  return (
    <>
      <Swiper ref={swiperRef} style={styles.wrapper} loop={false} loadMinimal>
        <View style={styles.slide1}>
          <View ref={ref => (startAncestorRef.current = nodeFromRef(ref))}>
            <SharedElement onNode={node => (startNodeRef.current = node)}>
              <Text style={styles.text}>0</Text>
            </SharedElement>

            <TouchableOpacity onPress={() => toggleAnimation(1)}>
              <Text>Press Me</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.slide2}>
          <View ref={ref => (endAncestorRef.current = nodeFromRef(ref))}>
            <SharedElement onNode={node => (endNodeRef.current = node)}>
              <Text style={[styles.text, { transform: [{ translateY: 100 }] }]}>
                0
              </Text>
            </SharedElement>

            <TouchableOpacity onPress={() => toggleAnimation(0)}>
              <Text>Press Me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swiper>

      {isInProgress ? (
        <View
          style={[StyleSheet.absoluteFill, { marginBottom: 100 }]}
          pointerEvents={"none"}>
          <SharedElementTransition
            start={{
              node: startNodeRef.current,
              ancestor: startAncestorRef.current,
            }}
            end={{
              node: endNodeRef.current,
              ancestor: endAncestorRef.current,
            }}
            position={positionRef.current}
            animation="move"
            resize="auto"
            align="auto"
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Screen1;
