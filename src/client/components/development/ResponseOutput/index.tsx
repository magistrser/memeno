import React from 'react';
import './index.less';
import './blink.css';

interface Props {
    output: string;
}

const Index: React.FC<Props> = (props) => {
    return (
        <div className="response-output">
            <div className="text-output">
                {props.output}
                <div className="blink-symbol blink">
                    {props.output ? <br /> : null}
                    &#x275A;
                </div>
            </div>
        </div>
    );
};

export default Index;
