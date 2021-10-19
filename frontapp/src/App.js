import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import Articles from "./components/Articles";
import ArticleShow from "./components/ArticleShow";
import AddUser from "./components/AddUser";
import AddCategory from "./components/AddCategory";
import AddArticle from "./components/AddArticle";
import About from "./components/About";
import Users from "./components/Users";

export default function App() {
    return (
        <Router>
            <Header />
            <div className="mt-20">
                <Switch>
                    <Route exact path="/">
                        <Articles />
                    </Route>

                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/categories">
                        <Categories />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/add-article">
                        <AddArticle />
                    </Route>
                    <Route path="/add-category">
                        <AddCategory />
                    </Route>
                    <Route path="/add-user">
                        <AddUser />
                    </Route>
                    <Route path="/article/:slug">
                        <ArticleShow />
                    </Route>

                </Switch>
            </div>
            <Footer />
        </Router>
    );
}
