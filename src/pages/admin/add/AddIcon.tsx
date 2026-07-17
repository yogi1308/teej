import AddSVG from "@/assets/svg/AddSVG";

export default function AddIcon({ onClick }) {
    return (
        <div className="backdrop-blur-md flex justify-center z-10 items-center border border-white size-10 fixed top-4 right-4 cursor-pointer" onClick={onClick}>
            <AddSVG />
        </div>
    );
}
