import  React, { useState, useEffect  } from 'react';
import './Puzzle.css';
import img1 from "./photo/1.jpg";
import img2 from "./photo/2.jpg";
import img3 from "./photo/3.jpg";
import img4 from "./photo/4.jpg";
import img5 from "./photo/5.jpg";
import img6 from "./photo/6.jpg";
import img7 from "./photo/7.jpg";
import img8 from "./photo/8.jpg";
import img9 from "./photo/blank.jpg";
import img10 from "./photo/9.jpg";
import sideimage from "./photo/original.jpg";
import winimg from "./photo/win.gif";
import Bag from './Bag';


  const checkwin = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4, 6],
    4: [1, 3, 5, 7],
    5: [2, 4, 8],
    6: [3, 7],
    7: [4, 6, 8],
    8: [5, 7]
  };
  
// Swap function
const swapImages = (images, fromIndex, toIndex) => {
  const newImages = [...images];
  [newImages[fromIndex], newImages[toIndex]] = [newImages[toIndex], newImages[fromIndex]];
  return newImages;
};
// PopupAlert component
const PopupAlert = ({ message, onClose }) => (
  <div className="popup-overlay">
    <div className="popup-content">
      <h2>{message}</h2>
      <button className="popup-close-button" onClick={onClose}>Close</button>
    </div>
  </div>
);



  function Puzzle() {
  const StateImages = [img1, img2, img3, img4, img5, img6, img7, img8,img9];
  const SolvedImages = [img9,img8, img7, img6, img5, img4, img3, img2, img1];
  const [gallery, setGallery] = useState([...StateImages]);
  const [showAlert, setShowAlert] = useState(false);
   
   const solved=gallery.every((img,id) => img === SolvedImages[id]);
   
   useEffect(() => {
   if(solved) 
    setShowAlert(true);

  
   },[solved]);
  
  function photoclick(num) {
   if(solved) return;
   
    const blankindex = gallery.indexOf(img9);
   
if(  checkwin[blankindex]?.includes(num)){
  setGallery(prevImages => swapImages(prevImages, blankindex, num));
}  
    };    
 const displayImages = gallery.map(img => (img === img9 && solved ? img10 : img));

 const resetPuzzle = () => {
  setGallery(StateImages);
  setShowAlert(false);
    document.querySelector(".Popup").style.display="none";
};


 return(
     <>
     
   <div id='puzzle'>
    <h2>Image Puzzle</h2>
    
      <div className='box'>
        {displayImages.map((value, index) => (
          <Bag key={index} src={value} ind={index} click={() => photoclick(index)} />
        ))}
         
        </div>
        
      <div className="box2">
        <Bag img src={sideimage} alt='jack' />
        </div>

        

   </div>





     
       <div className='Popup'>
      <p><span>Congratulations</span><br></br> you have solved the puzzle!</p>
      <img src={winimg} alt='Win'></img>
       
       {showAlert && (
         document.querySelector(".Popup").style.display="block",
        <PopupAlert  
          // message="Congratulations, you have solved the puzzle!" 
        onClose={resetPuzzle}
        />
        
      )}
  
       </div>

     </>
 )
  }
      

  export default Puzzle;
