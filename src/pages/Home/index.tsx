import React, { useState, useRef } from 'react';
import { AccessibilityInfo, findNodeHandle, Image, Keyboard, Linking, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import LanguageColors from 'language-colors';

import IGithubRepo from './IGithubRepo';

import styles from './styles';

const Home: React.FC = () => {

  const [text, setText] = useState('');
  const [repositories, setRepositories] = useState<IGithubRepo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const errorText = useRef(null);
  const titleRepositories = useRef(null);

  function handleChangeText(textFromEvent: string) {
    setText(textFromEvent);
  }

  function handleClearText() {
    setText('');
  }

  async function handleSearch() {
    const response = await fetch(`https://api.github.com/users/${text}/repos`);
    const repos = await response.json();
    
    if (repos.message) {
      setRepositories([]);
      setErrorMessage('Usuário não encontrado!');
      
      const errorTextTag = findNodeHandle(errorText.current);
      
      if (errorTextTag) {
        AccessibilityInfo.setAccessibilityFocus(errorTextTag);
      }
      
    } else {
      setRepositories(repos);
      setErrorMessage('');
      
      const titleRepositoriesTag = findNodeHandle(titleRepositories.current);
      
      if (titleRepositoriesTag) {
        AccessibilityInfo.setAccessibilityFocus(titleRepositoriesTag);
      }
    }
    
    Keyboard.dismiss();
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
        autoCapitalize='none'
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
        <View accessible>
          <Text accessible={true}>Pesquisar</Text>
        </View>
      </RectButton>

      {
        <Text
          accessible={true}
          ref={errorText} 
        >
          {errorMessage}
        </Text>
      }
      
      {
        (repositories.length > 0) &&
        <View style={styles.reposContainer}>
          <Text 
            style={styles.reposContainerTitle}
            ref={titleRepositories}
          >
            Repositórios de {repositories[0].owner.login}:
          </Text>
          <ScrollView contentContainerStyle={styles.reposList}>
            {
              repositories.map((repo: IGithubRepo) => {
                let languageName = null;
                let color = null;
                
                if (repo.language) {
                  languageName = repo.language
                  .toLowerCase()
                  .replace(' ', '_');

                  color = LanguageColors[languageName].color;
                }

                return (
                  <RectButton 
                    key={repo.name}
                    onPress={() => Linking.openURL(repo.html_url)}
                    style={styles.repository}
                  >
                    <View
                      accessible
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center'
                      }}
                    >
                      <Image 
                        source={{
                          uri: repo.owner.avatar_url
                        }} 
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 10,
                          borderRadius: 10
                        }}
                        accessible={true}
                      />
                      <View>
                        <Text
                          style={{
                            fontWeight: 'bold'
                          }}
                          accessible={true}
                        >
                          {repo.name}
                        </Text>
                        <Text 
                          style={{
                            color: '#444'
                          }}
                          accessible={true}
                        >
                          {repo.description ?? 'Sem descrição'}
                        </Text>
                        
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                          }}
                        >
                          <View 
                            style={{
                              width: 15,
                              height: 15,
                              borderRadius: 50,
                              marginRight: 5,
                              backgroundColor: color ? `rgb(${color[0]}, ${color[1]}, ${color[2]})` : '#fff'
                            }}
                          />
                          <Text
                            style={{
                              color: '#444'
                            }}
                            accessible={true}
                          >
                            {repo.language ?? 'Sem linguagem'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </RectButton>
                );
              })
            }
          </ScrollView>
        </View>
      }
    </View>
  );
};

export default Home;