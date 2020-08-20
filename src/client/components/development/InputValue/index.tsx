import React from 'react';
import './index.less';

interface Props {
    label: string;
    onChange: (value: any) => void;
    value: any;
}

const Index: React.FC<Props> = (props) => {
    return (
        <div className="input-value">
            <div className="label">{props.label}:</div>
            <input
                className="value"
                type="text"
                onChange={(event) => props.onChange(event.target.value)}
                value={props.value}
            />
        </div>
    );
};

export default Index;
