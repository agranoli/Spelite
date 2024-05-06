import React, { useEffect } from 'react';
import { Audio } from 'expo-av';

const BackgroundAudio = () => {
    useEffect(() => {
        let soundObject;

        const playBackgroundMusic = async () => {
            try {
                soundObject = new Audio.Sound();
                await soundObject.loadAsync(require('../sound/menu1.mp3'));
                await soundObject.setVolumeAsync(1);
                await soundObject.playAsync();
            } catch (error) {
                console.log('Error playing background music:', error);
            }
        };

        playBackgroundMusic();

        return () => {
            if (soundObject) {
                soundObject.stopAsync();
                soundObject.unloadAsync();
            }
        };
    }, []);

    return null; // Since this component only handles audio logic, it doesn't render anything
};

export default BackgroundAudio;
