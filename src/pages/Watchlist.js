import React,{useContext} from 'react';
import { StateContext } from '../context/GlobalState'

export default function Watchlist() {
     const { coins,watchlist } = useContext(StateContext);

   
    console.log(typeof watchlist)
    return (
        <div>

         <p>{watchlist?.map(coin => (
             <p>{coin}</p>))}
             </p>
        </div>
    )
}
