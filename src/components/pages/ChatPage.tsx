import React from "react";
import Sidebar from "../features/chat/Sidebar";
import Chat from "../features/chat/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../common/Header";

const ChatPage = () => {
  return (
    <div>
      <Header
        user={{
          displayName: "",
        }}
        dispatch={function ({
          user,
          type,
        }: {
          user: firebase.User;
          type: string;
        }): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="chatPage">
        <div className="chatPage__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/chat">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;