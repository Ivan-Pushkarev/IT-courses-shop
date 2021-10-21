import Course from "./Course";
import {withRouter} from "react-router-dom";
import {useState} from "react";

const amountPerPage = ['1', '2', '3', '4', '5', '6']
const sortOptions = ['price: Descending', 'price Ascending', 'start date: Earliest first', 'start date: Latest first']

function Home(props) {
    const {list} = props
    const [order, setOrder] = useState(null)
    const [page, setPage] = useState(1)
    const [coursesPerPage, setCoursesPerPage] = useState(2)
    const lastPageNumber = Math.ceil(list.length / coursesPerPage)
    
    
    
    const handlePageChange = (e) => {
        setCoursesPerPage(e.target.value)
        setPage(1)
    }
    
    const handleSortChange = (e) => {
        setOrder(e.target.value)
        setPage(1)
    }
    
    const dateModifier = (date) => {
        const arr = date.split('.')
        return +arr[0] + arr[1] * 30 + arr[2] * 365
    }
    
    const perPageHandler = (el, i) => {
        return i >= coursesPerPage * (page - 1) && i < coursesPerPage * page
    }
    
    const compare = (a, b) => {
        switch (order) {
            case 'price: Descending':
                return +a.price > +b.price ? -1 : 1
            case 'price Ascending':
                return +a.price > +b.price ? 1 : -1
            case 'start date: Earliest first':
                return dateModifier(a.date) > dateModifier(b.date) ? 1 : -1
            case 'start date: Latest first':
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
                            onChange={handlePageChange}>
                        {
                            amountPerPage.map(el => <option key={el} value={el}>{el}</option>)
                        }
                    </select>
                </div>
                <div className="select">
                    <label htmlFor="sort">Sort courses by</label>
                    <select id="sort" value={order}
                            onChange={handleSortChange}>
                        {
                            sortOptions.map(el => <option key={el} value={el}>{el}</option>)
                        }
                    </select>
                </div>
            </div>
            {
                list
                    .sort(compare)
                    .filter(perPageHandler)
                    .map(el => <Course key={el.id}
                                       course={el}/>)
            }
            <div className="pagination">
                <h3>number of courses: {list.length}</h3>
                <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>◀</button>
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
                <button disabled={page * coursesPerPage >= list.length}
                        onClick={() => setPage(prev => prev + 1)}>▶
                </button>
            
            </div>
        </div>
    )
}

export default withRouter(Home);