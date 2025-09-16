function Bag(props){

    const{src,ind,click}=props;




    return(
        <img src={src} alt="" onClick={()=>{
            click(ind)
        }}></img>
    )
}


export default Bag;