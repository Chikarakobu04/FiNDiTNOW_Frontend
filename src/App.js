import React, { useState } from 'react';
import Home from './components/Home';
import MessageBoard from './components/MessageBoard';
import PostList from './components/PostList';
import Header from './components/Header';
import Login from './components/login';
import SignUp from './components/SignUp';
import TitleScreen from './components/TitleScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('title');
  const [loggedIn, setLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]); // メッセージのステート

  // 画面を切り替える関数
  const handleNavClick = (screen) => {
    setCurrentScreen(screen);
  };

  // ログイン成功後に呼ばれる関数
  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setCurrentScreen('home');
  };

  // メッセージを追加する関数
  const addMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="App">
      {loggedIn && <Header onNavClick={handleNavClick} />}

      {currentScreen === 'title' && (
        <TitleScreen
          onLoginClick={() => setCurrentScreen('login')}
          onSignUpClick={() => setCurrentScreen('signup')}
        />
      )}
      {currentScreen === 'login' && (
        <Login setLoggedIn={handleLoginSuccess} />
      )}
      {currentScreen === 'signup' && (
        <SignUp setLoggedIn={handleLoginSuccess} />
      )}
      {loggedIn && currentScreen === 'home' && <Home />}
      {loggedIn && currentScreen === 'messageBoard' && (
        <MessageBoard messages={messages} addMessage={addMessage} />
      )}
      {loggedIn && currentScreen === 'postList' && (
        <PostList messages={messages} />
      )}
    </div>
  );
}

export default App;