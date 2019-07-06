import React from "react";
import { css } from "emotion";

const App: React.FC = () => {
  return (
    <div className={css({
      display: "flex"
    })}>
      <div className={css({ flexGrow: 1 })}>1</div>
      <div className={css({ flexGrow: 1 })}>2</div>
    </div>
  );
};

export default App;
