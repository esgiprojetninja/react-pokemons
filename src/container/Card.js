import { connect } from "react-redux";
import CardComponent from "../ui/Card";

const mapStateToProps = state => state;

const mapDispatchToProps = () => ({});

const Card = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardComponent);

export default Card;
