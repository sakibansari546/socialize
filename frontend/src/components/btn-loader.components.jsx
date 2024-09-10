import React from 'react';

const BtnLoader = () => {
    const loaderStyle = {
        width: '25px',
        height: '25px',
        border: '5px solid #000000',
        borderBottomColor: 'transparent',
        // background: "black",
        borderRadius: '50%',
        display: 'inline-block',
        boxSizing: 'border-box',
        animation: 'rotation 1s linear infinite',
    };

    return (
        <>
            <span style={loaderStyle} className="loader"></span>
            <style jsx>{`
                @keyframes rotation {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </>
    );
};

export default BtnLoader;
