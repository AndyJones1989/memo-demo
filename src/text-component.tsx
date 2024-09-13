import React from "react";

export const Text = ({onClick}) => {
    console.log('Text rendered');
    return (
        <p style={{color: 'pink'}} onClick={onClick}>This is a dumb text component</p>
    )
}

export const MemoizedText = React.memo(({onClick}) => {
    console.log('memo Text rendered');
    return (
        <p style={{color: 'pink'}} onClick={onClick}>This is a dumb text component</p>
    )
});