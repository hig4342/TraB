import React from 'react'
import App, { AppContext } from "next/app";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '@reducers/rootReducer'

const store = createStore(rootReducer)

import Layout from '@components/Layout'

class MyApp extends App {

  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps }
  }
  public render() {
    const { Component, pageProps } = this.props

    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}

// const configureStore = (initialState = InitialState) => {
//   const sagaMiddleware = createSagaMiddleware();
//   const middlewares = [sagaMiddleware];
//   const bindMiddleware = process.env.NODE_ENV !== 'production'
//     ? composeWithDevTools(applyMiddleware(...middlewares))
//     : applyMiddleware(...middlewares)
  
//   const store = createStore(countReducer, initialState, bindMiddleware)
//   sagaMiddleware.run(rootSaga);
//   return store
// }

export default MyApp

//export default withRedux(configureStore)(withReduxSaga(MyApp))