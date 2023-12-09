import {useEffect} from 'react'
export default function Product({item,  handleChange}) {
	
	let prodImg;
	
	switch(item.color) {
		  case "Rose Gold":
				prodImg = item.images[0];
				break;
		  case "White Gold":
				prodImg = item.images[1];
				break;
		  case "Yellow Gold":
				prodImg = item.images[2];
		  default:
				break;
		}
	
	return (
		    <div className="product">
			    <img  className="product-img" src={prodImg}/>
			  <div className="product-info">
			    <div className="product-name">{item.name}</div>
			    <div className="product-price">{item.price}</div>
		 	  </div>
			  <div className="color-selector">
			    <input type="radio" name={item.id} value  ="Yellow Gold" checked={item.color === "Yellow Gold"} onChange={(event) => handleChange(event, item.id)} />
			    <input type="radio" name={item.id} value="White Gold" checked={item.color === "White Gold"} onChange={(event) => handleChange(event, item.id)} />
			    <input type="radio" name={item.id} value="Rose Gold" checked={item.color === "Rose Gold"} onChange={(event) => handleChange(event, item.id)} />
			</div>	  
		    <p className="colorName">{item.color}</p>
		  </div>
	)
}