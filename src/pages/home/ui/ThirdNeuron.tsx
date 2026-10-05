import { motion, useAnimationControls } from 'framer-motion';
import thirdNeuronUrl from '../../../assets/images/thirdNeuron.webp';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface ThirdNeuronProps {
    stop: boolean;
}
const ThirdNeuron: React.FC<ThirdNeuronProps> = ({ stop }) => {
    const controls = useAnimationControls();
    const [currentX, setCurrentX] = useState(0);
    const [currentY, setCurrentY] = useState(0);

    const variants = {
        animate: {
            x: [0, '5vw', '-15vw', '5vw', '-25vw', '2vw', 0],
            y: [0, '10vh', '15vh', '25vh', '-5vh', '10vh', '5vh', 0],
            transition: {
                x: { repeat: Infinity, repeatType: 'loop', duration: 60, ease: 'easeInOut' },
                y: { repeat: Infinity, repeatType: 'loop', duration: 50, ease: 'easeInOut' },
            },
        },
    };

    const handleUpdate = (latest: any) => {
        // 애니메이션의 최신 x, y 값을 추적
        setCurrentX(latest.x);
        setCurrentY(latest.y);
    };

    useEffect(() => {
        if (stop) {
            controls.stop();
        } else {
            controls.start({
                x: [currentX, '5vw', '-5vw', '5vw', '-10vw', '3vw', 0],
                y: [currentY, '15vh', '0vh', '-5vh', '-15vh', '5vh', 0],
                transition: {
                    x: { repeat: Infinity, repeatType: 'loop', duration: 50, ease: 'easeInOut' },
                    y: { repeat: Infinity, repeatType: 'loop', duration: 50, ease: 'easeInOut' },
                },
            });
        }
    }, [stop, controls]);

    return (
        <MotionWrapper>
            <motion.div
                variants={variants}
                initial={{ x: 0, y: 0 }}
                animate={controls}
                onUpdate={handleUpdate}
                style={{ position: 'relative', width: '100%', height: '100%', zIndex: 5 }}
            >
                <Neuron src={thirdNeuronUrl} alt="세번째 뉴런" />
            </motion.div>
        </MotionWrapper>
    );
};

export default ThirdNeuron;

const MotionWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
`;

const Neuron = styled.img`
    position: absolute;
    top: -100%;
    right: -80%;
    width: 175%;
    @media (max-width: 1023px) {
        width: 200%;
        top: -30%;
    }
`;
