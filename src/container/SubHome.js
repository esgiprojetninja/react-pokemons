import { connect } from "react-redux";
import SubHomeComponent from "../ui/SubHome";

const mapStateToProps = state => state;

const mapDispatchToProps = () => ({});

const SubHome = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SubHomeComponent);

export default SubHome;
