export const SWIPE_END_ACTION = 'swipe-end';
export type SwipeEndAction = {
    type: typeof SWIPE_END_ACTION;
};
export const swipeEnd = () => {
    return { type: SWIPE_END_ACTION };
};
