export default function AddIcon({ onClick }) {
    return (
        <div
            className="flex justify-center items-center text-4xl text-white border border-white size-8 pb-1 fixed top-4 right-4 z-10 cursor-pointer"
            onClick={onClick}
        >
            +
        </div>
    );
}
