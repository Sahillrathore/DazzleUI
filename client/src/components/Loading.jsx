import React from 'react';

const LoadingSpinner = () => {
    return (
        <div style={styles.overlay}>
            <div style={styles.loader}></div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed', // <<< key change
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black', // optional slight white background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // <<< to stay above everything
    },
    loader: {
        border: '8px solid #f3f3f3',
        borderTop: '8px solid #3498db',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        animation: 'spin 1s linear infinite',
    },
};

// Adding animation manually
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default LoadingSpinner;
