// client/src/components/BackgroundVideo.jsx
import React from 'react';

export default function BackgroundVideo() {
    return (
        <>
            <div className="bg-video-wrap" aria-hidden="true">
                <video
                    className="bg-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/videos/bg-poster.jpg"
                >
                    <source src="/videos/bg-loop.webm" type="video/webm" />
                    <source src="/videos/bg-loop.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Полупрозрачный оверлей для контраста */}
            <div className="bg-overlay" />
        </>
    );
}   