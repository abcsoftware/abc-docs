import { applyMiddleware, compose, createStore } from "redux";
import { autoRehydrate, persistStore } from "redux-persist";
import classNames from "classnames";
import Container from "./container.jsx";
import LocalForage from "localforage";
import { Provider } from "react-redux";
import React, { PureComponent } from "react";
import ReduxStore from "../reducers";
import { setWindowWidth } from "../actions/ui";
import styles from "./styles.css";
import Thunk from "redux-thunk";

const store = compose(autoRehydrate(), applyMiddleware(Thunk))(createStore)(ReduxStore);

class App extends PureComponent {
  componentDidMount () {
    window.addEventListener("resize", () => store.dispatch(setWindowWidth(window.innerWidth)));
  }

  componentWillMount () {
    persistStore(store, { storage: LocalForage, blacklist: [ "ui" ] });
  }

  render () {
    return <Provider store={store}>
      <div className={styles.fill}>
        <Container />
      </div>
    </Provider>;
  }
}

export default App;
