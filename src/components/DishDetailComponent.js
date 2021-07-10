import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg
                        width="100%"
                        src={dish.image}
                        alt={dish.name}
                    ></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return <div></div>;
        }
    }

    renderComments(comments) {
        if (comments != null) {
            const cmt = comments.map((c) => {
                return (
                    <li key={c.id} className="mb-3">
                        <div>{c.comment}</div>
                        <div>
                            -- {c.author}, {c.date}
                        </div>
                    </li>
                );
            });
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">{cmt}</ul>
                </div>
            );
        } else {
            return <div></div>;
        }
    }

    render() {
        if (this.props.selectedDish != null) {
            return (
                <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 m-1">
                        {this.renderComments(this.props.selectedDish.comments)}
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default DishDetail;
