import Course from "./Course";
import {withRouter} from "react-router-dom";
import {useState} from "react";

function Home(props) {
    const {list} = props
    const [order, setOrder] = useState(null)
    const [page, setPage] = useState(1)
   
    const priceSortButtonHandler = () => {
        if (order === "priceDescending") setOrder('priceAscending')
        else if (order === "priceAscending") setOrder('priceDescending')
        else setOrder('priceDescending')
    }
    
    const dateSortButtonHandler = () => {
        if (order === "dateDescending") setOrder('dateAscending')
        else if (order === "dateAscending") setOrder('dateDescending')
        else setOrder('dateDescending')
    }
    
    const dateModifier = (date) => {
        const arr = date.split('.')
        return +arr[0] + arr[1] * 30 + arr[2] * 365
    }
    
    const compare = (a, b) => {
        switch (order) {
            case 'priceDescending':
                return +a.price > +b.price ? -1 : 1
            case 'priceAscending':
                return +a.price > +b.price ? 1 : -1
            case 'dateDescending':
                return dateModifier(a.date) > dateModifier(b.date) ? 1 : -1
            case 'dateAscending':
                return dateModifier(a.date) > dateModifier(b.date) ? -1 : 1
            default:
                return 0
        }
    }
    
    return (
        <div className="home">
            <div className="sort">
                <button onClick={priceSortButtonHandler}>Sort by price: {order === 'priceAscending' ? 'Descending' :
                    order === 'priceDescending' ? 'Ascending' : 'Descending'}</button>
                <button onClick={dateSortButtonHandler}>
                    Sort by start date: {order === 'dateAscending' ? 'Latest first' :
                    order === 'dateDescending' ? 'Earliest first' : 'Latest first'}</button>
            </div>
            {
                list
                    .sort(compare)
                    .filter((el, i) => i === page * 2 - 1 || i === page * 2 - 2)
                    .map(el => <Course key={el.id}
                                       course={el}/>)
            }
            <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>Prev</button>
                {
                    page > 1 && <button onClick={()=>setPage(prev=>prev-1)}>{page - 1}</button>
                }
                <button className="current-page">{page}</button>
                {
                    page * 2 < list.length && <button onClick={()=>setPage(prev=>prev+1)}>{page + 1}</button>
                }
                <button disabled={page * 2 >= list.length} onClick={() => setPage(prev => prev + 1)}>Next</button>
            
            </div>
        </div>
    );
}

export default withRouter(Home);