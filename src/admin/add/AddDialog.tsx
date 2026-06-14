export default function AddDialog({ dialogRef }) {
    return (
        <dialog
            className="dialog flex flex-col h-[90vh] w-[90vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white bg-black text-white"
            ref={dialogRef}
        >
            <div className="tabs flex justify-around text-center border-b border-white mx-4 divide-x divide-white p-2 font-dots text-md">
                <p className="w-100">Home</p>
                <p className="w-100">Music</p>
                <p className="w-100">Merch</p>
                <p className="w-100">Blog</p>
            </div>
            <div className="flex mt-auto text-center divide-x divide-white font-dots text-md justify-center border-t w-fit self-center">
                <button className="cursor-pointer px-20 py-1 mb-1">Upload</button>
                <button
                    className="cursor-pointer px-20 py-1 mb-1"
                    onClick={() => {
                        dialogRef.current.close();
                    }}
                >
                    Close
                </button>
            </div>
        </dialog>
    );
}
