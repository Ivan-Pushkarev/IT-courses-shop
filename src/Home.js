import Course from "./Course";
import {withRouter} from "react-router-dom";
import {useState} from "react";

function Home(props) {
    const {list} = props
    const [order, setOrder] = useState(null)
    
    const sortHandler = () => {
        if(order==="Descending") setOrder('Ascending')
        else if(order==="Ascending") setOrder('Descending')
        else setOrder('Descending')
    }
    const compare = (a, b) => {
        if(order==='Descending'){
            return +a.price > +b.price? -1:1
        } else if(order==='Ascending'){
            return +a.price > +b.price? 1:-1
        }
        return 0
    }
    
    return (
        <div className="home">
            <div className="sort">
                <button onClick={sortHandler}>Sort by price: {order === null ? 'Descending' :
                    order === 'Descending' ? 'Ascending' : 'Descending'}</button>
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