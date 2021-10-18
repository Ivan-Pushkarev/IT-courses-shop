import Course from "./Course";
import {withRouter} from "react-router-dom";
import {useEffect, useState} from "react";

function Home(props) {
    const {list} = props
    const [order, setOrder] = useState(null)
    
    useEffect(() => {
    
    }, []);
    
    const priceSortHandler = () => {
        if(order==="priceDescending") setOrder('priceAscending')
        else if(order==="priceAscending") setOrder('priceDescending')
        else setOrder('priceDescending')
    }
    const dateSortHandler = () => {
        if(order==="dateDescending") setOrder('dateAscending')
        else if(order==="dateAscending") setOrder('dateDescending')
        else setOrder('dateDescending')
    }
    
    const dateModifier = (date) => {
        const arr= date.split('.')
        return +arr[0] + arr[1]*30 + arr[2]*365
    }
    
    const compare = (a, b) => {
        switch (order) {
            case 'priceDescending':
                return +a.price > +b.price? -1:1
            case 'priceAscending':
                return +a.price > +b.price? 1:-1
            case 'dateDescending':
                return dateModifier(a.date) > dateModifier(b.date)? 1:-1
            case 'dateAscending':
                return dateModifier(a.date) > dateModifier(b.date)? -1:1
            default: return 0
        }
    }
    console.log(list)
    return (
        <div className="home">
            <div className="sort">
                <button onClick={priceSortHandler}>Sort by price: {order === 'priceAscending' ? 'Descending' :
                    order === 'priceDescending' ? 'Ascending' : 'Descending'}</button>
                <button onClick={dateSortHandler}>Sort by start date: {order === 'dateAscending' ? 'Latest first' :
                    order === 'dateDescending' ? 'Earliest first' : 'Latest first'}</button>
            </div>
           
            {
                list
                    .sort(compare)
                    .map(el => <Course key={el.id}
                                       course={el}/>)
            }
        </div>
    );
}

export default withRouter(Home);