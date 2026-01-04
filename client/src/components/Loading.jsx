import React from 'react';
import { FaTruckLoading } from 'react-icons/fa';

const LoadingSpinner = () => {
    return (
        <div style={styles.overlay}>
            <div class="container">
                <div class="moon">
                    <div class="crater crater1"></div>
                    <div class="crater crater2"></div>
                    <div class="crater crater3"></div>
                    <div class="crater crater4"></div>
                    <div class="crater crater5"></div>
                    <div class="shadow"></div>
                    <div class="eye eye-l"></div>
                    <div class="eye eye-r"></div>
                    <div class="mouth"></div>
                    <div class="blush blush1"></div>
                    <div class="blush blush2"></div>
                </div>

                <div class="orbit">
                    <div class="rocket">
                        <div class="window"></div>
                        <div class="fire"></div>
                        <div class="gas"></div>
                        <div class="gas"></div>
                        <div class="gas"></div>
                        <div class="gas"></div>
                        <div class="gas"></div>
                        <div class="gas"></div>
                        <div class="gas"></div>
                    </div>
                </div>
                <div class="curve">
                    <svg viewBox="0 0 500 500">
                        <path
                            id="loading"
                            d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
                        ></path>
                        <text width="500">
                            <textPath xlink:href="#loading">...loading...</textPath>
                        </text>
                    </svg>
                </div>
            </div>

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
