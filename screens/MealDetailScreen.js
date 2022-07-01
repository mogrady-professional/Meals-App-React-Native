import { useContext, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "../components/IconButton";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
import { addFavourite, removeFavourite } from "../store/redux/favourites";
// import { FavouritesContext } from "../store/context/favourites-context";

function MealDetailScreen({ route, navigation }) {
  // const favouriteMealsCtx = useContext(FavouritesContext);
  const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids);
  const dispatch = useDispatch(); // to dispatch actions to the store

  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  // Return true or false if the meal is in the favourites list
  // const mealIsFavourite = favouriteMealsCtx.ids.includes(mealId);
  const mealIsFavourite = favouriteMealIds.includes(mealId);

  function changeFavouriteStatusHandler() {
    console.log("Toggling favourite status, mealId: ", mealId);
    // console.log("favouriteMealsCtx.ids: ", favouriteMealsCtx.ids);
    console.log("mealIsFavourite: ", mealIsFavourite);
    if (mealIsFavourite) {
      // Remove from favourites
      // favouriteMealsCtx.removeFavourite(mealId);
      dispatch(removeFavourite({ id: mealId }));
      console.log("Removed from favourites");
    } else {
      // Make the meal a favourite
      // favouriteMealsCtx.addFavourite(mealId);
      dispatch(addFavourite({ id: mealId }));
      console.log("Added to favourites");
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavourite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavouriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavouriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
