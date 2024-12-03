import { Button, Header, Icon, Input, ListItem } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputText, completed: false },
      ]);
      setInputText("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <SafeAreaProvider>
      <Header
        leftComponent={{
          icon: "menu",
          color: "#fff",
        }}
        rightComponent={{
          icon: "settings",
          color: "#fff",
          onPress: () => setTodos([]), // TODOリストをクリア
        }}
      />

      <View style={{ marginBottom: 20 }}>
        <Input
          value={inputText}
          onChangeText={setInputText}
          placeholder="新しいタスクを入力"
          containerStyle={{ paddingHorizontal: 0 }}
          rightIcon={
            <Button
              icon={<Icon name="add" size={24} color="white" />}
              onPress={addTodo}
            />
          }
        />
      </View>

      {todos.map((todo) => (
        <ListItem.Swipeable
          key={todo.id}
          rightContent={() => (
            <Button
              icon={{ name: "delete", color: "white" }}
              buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
              onPress={() => deleteTodo(todo.id)}
            />
          )}
        >
          <ListItem.CheckBox
            checked={todo.completed}
            onPress={() => toggleTodo(todo.id)}
          />
          <ListItem.Content>
            <ListItem.Title
              style={
                todo.completed
                  ? {
                      textDecorationLine: "line-through",
                      color: "#888",
                    }
                  : undefined
              }
            >
              {todo.text}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem.Swipeable>
      ))}
    </SafeAreaProvider>
  );
}
