import { Component } from "react";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
    postComment,
    fetchComments,
    fetchDishes,
    fetchPromos,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) =>
        dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {
        dispatch(fetchDishes()); // calling the thunk fetchDishes()
    },
    fetchComments: () => {
        dispatch(fetchComments()); // calling the thunk fetchComments()
    },
    fetchPromos: () => {
        dispatch(fetchPromos()); // calling the thunk fetchPromos()
    },
    resetFeedbackForm: () => {
        dispatch(actions.reset("feedback"));
    },
});

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={
                        this.props.dishes.dishes.filter(
                            (dish) => dish.featured
                        )[0]
                    }
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMsg={this.props.dishes.errMsg}
                    promotion={
                        this.props.promotions.promotions.filter(
                            (promo) => promo.featured
                        )[0]
                    }
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMsg={this.props.promotions.errMsg}
                    leader={
                        this.props.leaders.filter(
                            (leader) => leader.featured
                        )[0]
                    }
                />
            );
        };
        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={
                        this.props.dishes.dishes.filter(
                            (dish) =>
                                dish.id === parseInt(match.params.dishId, 10)
                        )[0]
                    }
                    isLoading={this.props.dishes.isLoading}
                    errMsg={this.props.dishes.errMsg}
                    comments={this.props.comments.comments.filter(
                        (comment) =>
                            comment.dishId === parseInt(match.params.dishId, 10)
                    )}
                    commentsErrMsg={this.props.comments.errMsg}
                    postComment={this.props.postComment}
                />
            );
        };
        return (
            <div className="container">
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route
                        exact
                        path="/menu"
                        component={() => <Menu dishes={this.props.dishes} />}
                    />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route
                        exact
                        path="/contactus"
                        component={() => (
                            <Contact
                                resetFeedbackForm={this.props.resetFeedbackForm}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/aboutus"
                        component={() => <About leaders={this.props.leaders} />}
                    />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
