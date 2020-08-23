import React from 'react';
import './index.less';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header';

interface Props {
    errorMessage: string;
    returnPath: string;
}

const Index: React.FC<Props> = (props) => {
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(props.errorMessage);
    };

    return (
        <div className="error-page">
            <div className="error-header">
                <Header>Error Occur</Header>
            </div>
            <div className="error-message">{props.errorMessage}</div>
            <button
                className="copy-error-button"
                onClick={handleCopyToClipboard}
            >
                Copy Error
            </button>
            <div className="return-button">
                <Link to={props.returnPath}>
                    <div>Return to Memes</div>
                </Link>
            </div>
        </div>
    );
};

export default Index;
