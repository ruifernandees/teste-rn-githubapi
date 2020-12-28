import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';

import IGithubRepo from './IGithubRepo';

import styles from './styles';

const Home: React.FC = () => {

  const [text, setText] = useState('');
  const [repositories, setRepositories] = useState<IGithubRepo[]>([]);

  function handleChangeText(textFromEvent: string) {
    setText(textFromEvent);
  }

  function handleClearText() {
    setText('');
  }

  async function handleSearch() {
    const response = await fetch(`https://api.github.com/users/${text}/repos`);
    const repos = await response.json();

    setRepositories(repos);
  }

  return (
    <View style={styles.mainContainer}>
      <SearchBar 
        onChangeText={handleChangeText}
        onClear={handleClearText}
        value={text}
        placeholder="Digite um username do Github"
        lightTheme={true}
        containerStyle={{
          backgroundColor: "#fff",
          shadowOpacity: 0,
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
          width: '100%'
        }}
        inputContainerStyle={{
          backgroundColor: "#eee",
        }}
        inputStyle={{
          color: '#555'
        }}
      />
      
      <RectButton 
        style={styles.searchButton}
        onPress={handleSearch}
      >
        <Text>Pesquisar</Text>
      </RectButton>

      <View>
        {
          repositories.map((repo: IGithubRepo) => {
            return (
              <Text key={repo.name}>{repo.name}</Text>
            );
          })
        }
      </View>
    </View>
  );
};

export default Home;