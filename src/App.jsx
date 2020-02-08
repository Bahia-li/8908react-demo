import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { connect } from "react-redux";

import routes from "$conf/routes";

import Login from "./components/login";
import { en, zhCN } from "./locales";

import zh_CN from "antd/es/locale/zh_CN";
import en_US from "antd/es/locale/en_US";

import BasitLayout from "./components/basit-layout";

@connect(state => ({ language: state.language }), null)
class App extends Component {
  render() {
    const language = this.props.language;
    const isEn = language === "en";
    return (
      <ConfigProvider locale={isEn ? en_US : zh_CN}>
        <IntlProvider
          locale={language} //选择语言
          messages={isEn ? en : zhCN} //选择语言包
        >
          <Router>
            <Switch>
              <Route path="/login" exact component={Login} />
              <BasitLayout>
                {routes.map(route => {
                  /* <Route path={route.path} exact={route.exact} component={route.component} /> */
                  return <Route {...route} key={route.path} />;
                })}
              </BasitLayout>
            </Switch>
          </Router>
        </IntlProvider>
      </ConfigProvider>
    );
  }
}

export default App;
