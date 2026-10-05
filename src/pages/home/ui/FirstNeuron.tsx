import { motion, useAnimationControls } from 'framer-motion';
import firstNeuronUrl from '../../../assets/images/firistNeuron.webp';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface FirstNeuronProps {
    stop: boolean;
}

const FirstNeuron: React.FC<FirstNeuronProps> = ({ stop }) => {
    const controls = useAnimationControls();
    const [currentX, setCurrentX] = useState(0);
    const [currentY, setCurrentY] = useState(0);

    const variants = {
        animate: {
            x: [0, '8vw', '-12vw', '3vw', '-5vw', '20vw', '-18vw', '6vw', '-7vw', '10vw', '-3vw', 0],
            y: [0, '20vh', '-18vh', '12vh', '-10vh', '28vh', '-25vh', '15vh', '-20vh', '22vh', '-12vh', 0],

            transition: {
                x: { repeat: Infinity, repeatType: 'loop', duration: 90, ease: 'easeInOut' },
                y: { repeat: Infinity, repeatType: 'loop', duration: 90, ease: 'easeInOut' },
            },
        },
    };
    useEffect(() => {
        if (stop) {
            controls.stop();
        } else {
            controls.start({
                x: [currentX, '8vw', '-12vw', '3vw', '-5vw', '20vw', '-18vw', '6vw', '-7vw', '10vw', '-3vw', 0],
                y: [
                    currentY,
                    '-20vh',
                    '-15vh',
                    '-18vh',
                    '-10vh',
                    '-10vh',
                    '28vh',
                    '-25vh',
                    '15vh',
                    '-20vh',
                    '-12vh',
                    0,
                ],
                transition: {
                    x: { repeat: Infinity, repeatType: 'loop', duration: 90, ease: 'easeInOut' },
                    y: { repeat: Infinity, repeatType: 'loop', duration: 90, ease: 'easeInOut' },
                },
            });
        }
    }, [stop, controls]);

    const handleUpdate = (latest: any) => {
        // 애니메이션의 최신 x, y 값을 추적
        setCurrentX(latest.x);
        setCurrentY(latest.y);
    };

    return (
        <MotionWrapper>
            <motion.div
                variants={variants}
                initial={{ x: 0, y: 0 }}
                animate={controls}
                style={{ marginTop: '5%', height: '100%', zIndex: 6, position: 'relative' }}
                onUpdate={handleUpdate}
            >
                <Neuron />
            </motion.div>
        </MotionWrapper>
    );
};

export default FirstNeuron;

const MotionWrapper = styled.div`
    width: 100%;
    height: 100%;
    @media (max-width: 1023px) {
        margin-top: 15%;
    }
`;

const Neuron = styled.div`
    position: absolute;
    width: 40%;
    height: 100%;
    background-image: url(${firstNeuronUrl});
    background-size: cover;
    display: flex;
    @media (max-width: 1023px) {
        width: 100%;
        height: 50%;
        margin-top: 15%;
        z-index: 100;
    }
`;
