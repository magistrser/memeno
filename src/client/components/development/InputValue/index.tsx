import React from 'react';
import './index.less';

interface Props {
    label: string;
    onChange: (value: any) => void;
    type?: string
    value?: any;
}

const Index: React.FC<Props> = (props) => {
    const type = props.type ? props.type : 'text';

    return (
        <div className="input-value">
            <div className="label">{props.label}:</div>
            <input
                className="value"
                type={type}
                onChange={(event) => {
                    props.type === 'file' ? props.onChange(event.target.files)
                        : props.onChange(event.target.value)
                }}
                multiple={props.type === 'file'}
                value={props.value}
            />
        </div>
    );
};

export default Index;
