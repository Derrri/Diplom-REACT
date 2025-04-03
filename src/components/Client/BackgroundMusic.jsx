import React, { useRef, useEffect, useState } from 'react';

const BackgroundMusic = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const playMusic = async () => {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.log('Не удалось запустить музыку автоматически:', error);
            }
        };

        playMusic();

        return () => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        };
    }, []);

    const togglePlay = async () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            try {
                await audioRef.current.play();
            } catch (error) {
                console.log('Не удалось запустить музыку:', error);
            }
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <audio ref={audioRef} loop>
                <source src="/Vinivilla_-_IN_THE_DARK_77611638.mp3" type="audio/mpeg" />
                Ваш браузер не поддерживает аудио.
            </audio>
            <button onClick={togglePlay}>
                {isPlaying ? 'Остановить музыку' : 'Играть музыку'}
            </button>
        </div>
    );
};

export default BackgroundMusic;