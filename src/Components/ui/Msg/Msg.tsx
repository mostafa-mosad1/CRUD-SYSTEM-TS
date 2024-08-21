
interface Iprops {	
     msg?:string
}	
function Msg({msg}:Iprops) {
    return (
        <>
           { msg?<span className="block  text-sm font-bold text-red-500 ">{msg}</span> : null}
        </>
    )
}

export default Msg;