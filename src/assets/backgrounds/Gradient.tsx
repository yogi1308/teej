import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation.tsx";

export default function BackgroundGradientAnimationDemo() {
    return (
        <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(0, 3, 12)"
            gradientBackgroundEnd="rgb(0, 10, 30)"
            firstColor="0, 20, 80"
            secondColor="0, 10, 40"
            thirdColor="10, 40, 100"
            fourthColor="0, 5, 30"
            fifthColor="0, 25, 70"
            sixthColor="10, 15, 55"
            seventhColor="5, 30, 60"
            eighthColor="0, 20, 45"
            ninthColor="15, 10, 50"
            tenthColor="0, 35, 80"
            pointerColor="0, 25, 70"
            blendingValue="screen"
            size="clamp(30vh, 50vmin, 70vh)"
        >
        </BackgroundGradientAnimation>
    );
}
