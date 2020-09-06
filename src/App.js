import React, { useEffect } from 'react';
import Sidebar from "./containers/Sidebar/Sidebar";
import Notes from "./containers/Notes/Notes";
import Editor from "./containers/Editor";
import { useSelector } from "react-redux";

const App = () => {

  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (theme) => {
    Object.keys(theme).forEach((key) => {
      const value = theme[key];
      document.documentElement.style.setProperty(key, value);
    });
  };

  return (
    <>
      <Sidebar />
      <Notes />
      <Editor />
    </>
  )
}

export default App;
