import React from "react";
import {
    Link
} from "react-router-dom";

interface Props {
    path: string,
    label: string
}

const Index: React.FC<Props> = (props) => {
    return <Link to={props.path}>{props.label}</Link>
}

export default Index;