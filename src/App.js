import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from './services/api';



export default function App() {
  const [repository,setRepository] = useState([]);

  useEffect(()=>{api.get('/repositories').then(response=>{
    setRepository(response.data)
  })},
  []);

  async function handleLikeRepository(id) {
    await api.post(`/repositories/${id}/like`);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
      <FlatList
        data={repository}
        keyExtractor={repository => repository.id}
        renderItem={({ item: repository }) => (
        
          <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>
              {repository.title}
            </Text>

            <View style={styles.techsContainer}>
              <Text style={styles.tech}>
                {repository.techs}
              </Text>
            </View>

            <View style={styles.likesContainer}>
              <Text style={styles.likeText} testID={repository.id}>
                {`${repository.likes} curtidas`}
              </Text>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text 
                style={styles.buttonText}
                onPress={() => handleLikeRepository(repository.id)}
                testID={repository.id}
              >
                Like
              </Text>
            </TouchableOpacity>


          </View>
        )}
      />


      {/*

              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
 
            onPress={() => handleLikeRepository(1)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
 
      */}


      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginRight: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    maxWidth: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    
  },
});
