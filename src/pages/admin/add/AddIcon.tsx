export default function AddIcon({ onClick }) {
    return (
        <div
            className="font-king flex justify-center items-center text-white border border-white size-8 fixed top-4 right-4 z-10 cursor-pointer"
            onClick={onClick}
        >
            <p className="text-8xl ">+</p>
        </div>
    );
}
