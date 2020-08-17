import React, { useState, useEffect } from 'react';
import './index.css';
import MenuButton from '../../components/MenuButton';
import Header from '../../components/Header';
import AvatarButton from '../../components/AvatarButton';
import StaticMem from '../../components/MemesSwiper';
import DislikeButton from '../../components/DislikeButton';
import LikeButton from '../../components/LikeButton';
import Waiting from '../Waiting';
import Rating from '../../business-logic/mem-provider/Rating';
import memProvider from '../../business-logic/mem-provider/ServerMemProvider';
import { GlobalState } from '../../store/initialState';
import { connect, ConnectedProps } from 'react-redux';
import actions from './actions';

const selector = (state: GlobalState) => ({ ...state.memes });
const connector = connect(selector, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Index: React.FC<Props> = (props) => {
    const [isWaiting, setWaiting] = useState(true);

    const handleOnWait = () => {
        setWaiting(true);
    };
    const handleOnLoad = (currentMem) => {
        if (currentMem) {
            props.initMemes({
                prevMem: currentMem,
                currentMem: currentMem,
            });
        }
        setWaiting(false);
    };

    useEffect(() => {
        memProvider.init(handleOnWait, handleOnLoad);
    }, []);

    const updateMemes = (rating: Rating) => {
        props.swipeMemes({
            rating: rating,
            prevMem: props.currentMem,
            currentMem: memProvider.getCurrentMem(),
        });
    };

    const onLikeClick = () => {
        if (props.isSwipeEnd) {
            memProvider.swapMem(Rating.Like);
            updateMemes(Rating.Like);
        }
    };

    const onDislikeClick = () => {
        if (props.isSwipeEnd) {
            memProvider.swapMem(Rating.Dislike);
            updateMemes(Rating.Dislike);
        }
    };

    const onSwipeEnd = () => {
        props.swipeEnd();
    };

    return (
        <div className="Memeno">
            <div className="header">
                <div className="memeno-menu-button">
                    <MenuButton />
                </div>
                <div className="memeno-header">
                    <Header>memeno</Header>
                </div>
                <div className="memeno-avatar-button">
                    <AvatarButton
                        img={require('../../resources/avatar-example.jpg')}
                    />
                </div>
            </div>
            <div className="content">
                {isWaiting ? (
                    <Waiting />
                ) : (
                    <StaticMem
                        currentMem={props.currentMem}
                        prevMem={props.prevMem}
                        rating={props.rating}
                        onDislikeClick={onDislikeClick}
                        onLikeClick={onLikeClick}
                        onSwipeEnd={onSwipeEnd}
                        updatingTriggerCounter={props.updatingTriggerCounter}
                    />
                )}
            </div>
            <div className="footer">
                <DislikeButton onClick={onDislikeClick} />
                <LikeButton onClick={onLikeClick} />
            </div>
        </div>
    );
};

export default connector(Index);
