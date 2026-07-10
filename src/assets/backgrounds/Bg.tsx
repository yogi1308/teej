import Particles from "./Particles";
import Gradient from "./Gradient";
import AuroraBg from "./Aurora";

export default function Bg() {
    return (
        <div className="relative">
            <Gradient />
            <div className="absolute inset-0">
                <Particles />
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 h-[45vh] rotate-180">
                <AuroraBg />
            </div>
        </div>
    );
}
