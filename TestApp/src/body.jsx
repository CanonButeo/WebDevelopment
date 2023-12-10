import {useState, useEffect, useRef, useCallback} from 'react'
import Product from './product.jsx'
import productData from './product_data.js'
import Popup from './popup.jsx'

export default function Body() {
	const [prods, setProds] = useState(productData)
	const [willShow, setWillShow] = useState(true)
	const slider = useRef(0);
	const scroll = 100;
	
	useEffect(() => {
		const timer = setTimeout(() => {
			setWillShow(false);
			console.log(`willShow: ${willShow}`)}
			,5000);
		
		return () => clearTimeout(timer);
	}, [])
	console.log(willShow)
	
    const handlePointerDown = useCallback((event) => {
	   const element = slider.current;
	   if(!element) return;
	   const startPos = {
		   left: element.scrollLeft,
		   x: event.clientX
	   }
	   
	   const handlePointerMove = (event) => {
		   const amount = event.clientX - startPos.x;
		   element.scrollLeft = startPos.left - amount;
		   updateCursor(element);
	   }
	   
	   const handlePointerUp = (event) => {
		   document.removeEventListener("pointermove", handlePointerMove);
		   document.removeEventListener("pointerup", handlePointerUp);
		   resetCursor(element);
	   }
	   
	   document.addEventListener("pointermove", handlePointerMove);
	   document.addEventListener("pointerup", handlePointerUp);
   
    }, []);
	
  function updateCursor(element) {
	  element.style.cursor = "grabbing";
	  element.style.userSelect = "none";
  }
   
  function resetCursor(element) {
	  element.style.cursor = "grab";
	  element.style.removeProperty = "user-select"; 
  }
  	
  function close() {
		setWillShow(true);
	}
	
   function handleChange(event, id) {
		const value = event.target.value 
		setProds(prevProducts => { 
			   return prevProducts.map((prod) => {
				 return ( prod.id === id ? {...prod, color: value} : prod )
				 console.log(prod)
			   })
	        })
	    }
	
	
    const products = prods.map(product => {
		return (
			<Product item={product}  handleChange={handleChange} key={product.id} /> 
		)
	})
	
    function scrollImg(direction) {
		const area = slider.current;
		direction === "left" ? area.scrollLeft -= scroll : area.scrollLeft += scroll
	}
	
	return (
		<>
		  <div className="category-title">
		  Moissanite Engagement Rings
		  </div>
		  <div className="product-slider">
		    <button className="slide left" onClick={()=> {scrollImg("left")}}>&#10094;</button>
		    <div className="products-cont" ref={slider}
			  onPointerDown={handlePointerDown} >
		      {products}
			</div>
			<button className="slide right" onClick={() => {scrollImg("right")}}>&#10095;</button>
		  </div>
		  {!willShow && <Popup pop={willShow} close={close} />}
	  </>
	)
}
