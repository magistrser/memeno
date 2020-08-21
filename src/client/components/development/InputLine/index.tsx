import React from 'react';
import './index.less';
import InputValue from '../InputValue';

type Value = {
    label: string;
    onChange: (value: any) => void;
    value: any;
};

interface Props {
    label: string;
    values: Value[];
    onEnter: () => void;
}

const Index: React.FC<Props> = (props) => {
    const getValues = (values: Value[]) =>
        values.map((prop) => <InputValue {...prop} />);

    return (
        <div className="block-wrapper">
            <div className="input-line">
                <div className="label">{props.label}</div>
                {getValues(props.values)}
                <button className="enter-button" onClick={props.onEnter}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Index;
