import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Input, Button, ListItem, Icon } from '@rneui/themed';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
     if (inputText.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputText, completed: false }
      ]);
      setInputText('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input
            value={inputText}
            onChangeText={setInputText}
            placeholder="新しいタスクを入力"
            rightIcon={
              <Button
                icon={<Icon name="add" size={24} color="white" />}
                onPress={addTodo}
              />
            }
          />
        </View>

        {todos.map(todo => (
          <ListItem.Swipeable
            key={todo.id}
            rightContent={() => (
              <Button
                icon={{ name: 'delete', color: 'white' }}
                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                onPress={() => deleteTodo(todo.id)}
              />
            )}
          >
            <ListItem.CheckBox
              checked={todo.completed}
              onPress={() => toggleTodo(todo.id)}
            />
            <ListItem.Content>
              <ListItem.Title style={todo.completed ? styles.completedText : null}>
                {todo.text}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem.Swipeable>
        ))}
      </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});
