import {
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Container } from "./container";
import { Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";

type Tile = {
  color: string;
  isOdd: boolean;
};

const getRandomNumber = () => Math.floor(Math.random() * 256);

const getRandomColor = () => {
  return [getRandomNumber(), getRandomNumber(), getRandomNumber()];
};

const getRandomColors = (length: number, margin: number) => {
  const tiles = [];
  const color = getRandomColor();
  for (let i = 0; i < length; i++) {
    tiles.push({
      color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
      isOdd: false,
    });
  }
  const randomIndex = Math.floor(Math.random() * length);
  tiles[randomIndex] = {
    color: `rgb(${color[0] + margin},${color[1] + margin}, ${
      color[2] + margin
    } )`,
    isOdd: true,
  };
  return tiles;
};

export default function ColorGenerator({ navigation }: any) {
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [tiles, setTiles] = useState<Tile[]>(getRandomColors(9, 100));

  useEffect(() => {
    if (seconds === 0) {
      setIsGameOver(true);
      clearInterval(intervalRef.current!);
    }
    intervalRef.current = setInterval(() => {
      setSeconds((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [seconds]);

  const handleCorrect = () => {
    setScore(score + 1);
    setSeconds(seconds + 1);
    setRound(round + 1);
    const newTiles = getRandomColors(9, 100 / score);
    setTiles(newTiles);
  };

  const restartGame = () => {
    setScore;
    setSeconds;
    setRound;
    const newTiles = getRandomColors(9, 100 / score);
    setTiles(newTiles);
    setIsGameOver(false);
  };

  return (
    <>
      <Container>
        <Text style={styles.title}>
          Өөр <Text style={styles.oddTitle}>өнгийг</Text> ол!
        </Text>
        <View
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>{seconds} секунд</Text>
          <Text>{round}-р үе</Text>
          <Text style={styles.score}>Оноо {score}</Text>
        </View>
        <View style={styles.board}>
          {tiles.map((tile, index) => (
            <View style={styles.tileGrid} key={`tile-${index}`}>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (tile.isOdd) {
                    handleCorrect();
                  } else {
                    setSeconds(0);
                  }
                }}
              >
                <View
                  style={{ ...styles.tile, backgroundColor: tile.color }}
                ></View>
              </TouchableWithoutFeedback>
            </View>
          ))}
        </View>
        {isGameOver && (
          <View style={styles.gameOverView}>
            <Text style={styles.gameOverText}>
              Тоглоом дууслаа.{"\n"} Таны оноо: {score}{" "}
            </Text>
            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-evenly', margin: 20 }}>
              <Button title="Шинээр эхлэх" onPress={() => restartGame()} />
              <Button
                title="Буцах"
                onPress={() => navigation.navigate("Home")}
              />
            </View>
          </View>
        )}
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  gameOverView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  oddTitle: {
    color: "rgba(0,0,0,0.5)",
  },
  score: {
    color: "#363636",
  },
  board: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: 8,
  },
  tileGrid: {
    width: (Dimensions.get("window").width - 32) / 3,
  },
  tile: {
    width: "100%",
    height: 0,
    paddingBottom: "100%",
    backgroundColor: "red",
    borderRadius: 10,
  },
});
