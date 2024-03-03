import "./App.scss";
import Header from "./components/Header";
import Contents from "./components/Contents";
import { TargetContext } from "./context/TargetContext";
import { useState } from "react";
const App: React.FC = () => {
  const [targetId, setTargetId] = useState<number | undefined>();
  const [targetIdForSearch, setTargetIdForSearch] = useState<number | undefined>();
  const [searchOnOff, setSearchOnOff] = useState<boolean>(true);
  const [pokeSet, setPokeSet] = useState<number>(1);
  const [errTf, setErrTf] = useState<boolean>(true);
  return (
    <TargetContext.Provider
      value={{
        targetId,
        setTargetId,
        targetIdForSearch,
        setTargetIdForSearch,
        searchOnOff,
        setSearchOnOff,
        pokeSet,
        setPokeSet,
        errTf,
        setErrTf,
      }}
    >
      <div className="App">
        <Header />
        <Contents />
      </div>
    </TargetContext.Provider>
  );
};
export default App;
