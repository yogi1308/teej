import Navbar from "./Navbar.tsx"
import Navigator from "./Navigator.tsx"
import { useState, useEffect, useRef } from "react";

export default function Nav() {
    const [navigatorVisibility, setNavigatorVisibility] = useState(false);
      const dialogRef = useRef<HTMLDialogElement | null>(null);
    
      const toggleNavigatorVisibility = () => setNavigatorVisibility((v) => !v);
    
      useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
    
        dialog.style.transformOrigin = "center";
        dialog.style.transition = `transform 300ms ease-in-out`;
    
        if (navigatorVisibility) {
          dialog.style.transform = "scaleY(0)";
          setTimeout(() => {
            dialog.showModal();
            dialog.style.display = "block"
            requestAnimationFrame(() => {
              dialog.style.transform = "scaleY(1)";
            });
          }, 10);
        } else {
          dialog.style.transform = "scaleY(0)";
          setTimeout(() => {
              dialog.style.display = "none";
                dialog.close();
          }, 300);
        }
      }, [navigatorVisibility]);

    return (
      <>
        {!navigatorVisibility && (
          <div
            style={{ transition: "opacity 0.3s ease-in-out 0.4s", opacity: 1 }}
          >
            <Navbar onClick={toggleNavigatorVisibility} />
          </div>
        )}

        <Navigator
          setNavigatorVisibility={setNavigatorVisibility}
          ref={dialogRef}
        />
      </>
    );
}