export default function Popup({pop, close}) {
	const block = {
		display:"block"	} ;
	
	const hide = {
		display:"none"
	} ;
	

	return (
	<div className="messagebox" style={!pop ? {block} : {hide} }>
	  <p>%X discount on all products,
			do not miss the opportunity !</p>
	  <button className="closemessage" onClick={close}>&#10006;</button>
		
	</div>
	
	)
}