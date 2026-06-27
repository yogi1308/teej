import { useState } from "react"

export default function AddMerch() {
    const [numImages, setNumImages] = useState(1)
   return (
       <div>
       {Array.from({ length: numImages }, (_, i) => (
           <input key={i} type="image" name="images" />
       ))}
       </div>
   ) 
}
