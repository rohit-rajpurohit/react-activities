import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "./sidebar";
import Posts from "./posts";
import Users from "./users"


const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Sidebar/>
      <Route path="/admin/users" component={Users}/>
      <Route path="/admin/posts" component={Posts}/>
    </div>
  );
};

export default Dashboard;
