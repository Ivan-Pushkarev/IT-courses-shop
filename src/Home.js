import Course from "./Course";
import {withRouter} from "react-router-dom";
import {useState} from "react";

const amountPerPage = ['1', '2', '3', '4', '5', '6']

function Home(props) {
    const {list} = props
    const [order, setOrder] = useState(null)
    const [page, setPage] = useState(1)
    const [coursesPerPage, setCoursesPerPage] = useState(2)
    const lastPageNumber = Math.ceil(list.length / coursesPerPage)
    
    const priceSortButtonHandler = () => {
        if (order === "priceDescending") setOrder('priceAscending')
        else if (order === "priceAscending") setOrder('priceDescending')
        else setOrder('priceDescending')
        setPage(1)
    }
    
    const dateSortButtonHandler = () => {
        if (order === "dateDescending") setOrder('dateAscending')
        else if (order === "dateAscending") setOrder('dateDescending')
        else setOrder('dateDescending')
        setPage(1)
    }
    
    const handleChange = (e) => {
        setCoursesPerPage(e.target.value)
        setPage(1)
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
                <div className="select">
                    <label htmlFor="pageSelect">Courses per page</label>
                    <select id="pageSelect" value={coursesPerPage}
                            onChange={handleChange}>
                        {
                            amountPerPage.map(el => <option key={el} value={el}>{el}</option>)
                        }
                    </select>
                </div>
                <button onClick={priceSortButtonHandler}>Sort by price: {order === 'priceAscending' ? 'Descending' :
                    order === 'priceDescending' ? 'Ascending' : 'Descending'}</button>
                <button onClick={dateSortButtonHandler}>
                    Sort by start date: {order === 'dateAscending' ? 'Latest first' :
                    order === 'dateDescending' ? 'Earliest first' : 'Latest first'}</button>
            </div>
            {
                list
                    .sort(compare)
                    .filter((el, i) => i >= coursesPerPage * (page - 1) && i < coursesPerPage * page)
                    .map(el => <Course key={el.id}
                                       course={el}/>)
            }
            <div className="pagination">
                <h3>number of courses: {list.length}</h3>
                <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>Prev</button>
                {
                    page > 1 && <button onClick={() => setPage(prev => prev - 1)}>{page - 1}</button>
                }
                <button className="current-page">{page}</button>
                
                <span className={page < lastPageNumber - 1 ? "last-page" : 'hidden'}>
                    <button onClick={() => setPage(prev => prev + 1)}>{page + 1}</button>
                </span>
                {
                    page < lastPageNumber &&
                    <button onClick={() => setPage(lastPageNumber)}>{lastPageNumber}</button>
                }
                <button disabled={page * coursesPerPage >= list.length} onClick={() => setPage(prev => prev + 1)}>Next
                </button>
            
            </div>
        </div>
    )
}

export default withRouter(Home);