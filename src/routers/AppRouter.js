import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import MessagePage from "../components/MessagePage";
import MessageOnePage from "../components/messages/MessageOnePage";
import MessageTwoPage from "../components/messages/MessageTwoPage";
import MessageThreePage from "../components/messages/MessageThreePage";
import FavoritePage from "../components/FavoritePage";
import ProfilePage from "../components/ProfilePage";
import NotFoundPage from "../components/NotFoundPage";

const AppRouter = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/home" component={HomePage} />
        <Route path="/message" component={MessagePage} exact={true} />
        <Route path="/message/1" component={MessageOnePage} />
        <Route path="/message/2" component={MessageTwoPage} />
        <Route path="/message/3" component={MessageThreePage} />
        <Route path="/favorite" component={FavoritePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default AppRouter;
