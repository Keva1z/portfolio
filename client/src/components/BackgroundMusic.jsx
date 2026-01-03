import React from 'react';

export default function BackgroundMusic() {
    return (
        <audio
            autoPlay
            loop
            style={{
                display: 'none'
            }}
        >
            <source src="/audio/song.mp3" type="audio/mpeg" />
        </audio>
    );
}
