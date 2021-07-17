import React from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderDish({ dish }) {
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

function RenderComments({ comments }) {
    if (comments != null) {
        const cmt = comments.map((c) => {
            return (
                <li key={c.id} className="mb-3">
                    <div>{c.comment}</div>
                    <div>
                        -- {c.author},{" "}
                        {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                        }).format(new Date(Date.parse(c.date)))}
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

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div classNmae="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-5 col-md-5 col-12 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-lg-5 col-md-5 col-12 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default DishDetail;
