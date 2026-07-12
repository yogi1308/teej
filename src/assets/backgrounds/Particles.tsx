import ParticlesComponent from "../../assets/bglib/Particles.jsx";

export default function ParticlesBackground() {
    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <ParticlesComponent
                particleColors={["#082153"]}
                particleCount={300}
                particleSpread={15}
                speed={0.08}
                particleBaseSize={250}
                sizeRandomness={0.001}
                cameraDistance={30}
                moveParticlesOnHover={false}
                particleHoverFactor={1}
                alphaParticles={false}
                disableRotation={false}
                pixelRatio={1}
            />
        </div>
    );
}
