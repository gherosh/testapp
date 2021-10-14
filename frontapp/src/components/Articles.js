import Article from './Article'
import Pagination from "./Pagination";
import {useEffect, useState} from 'react'
import axios from "axios";

const Articles = () => {
    const [data, setData] = useState({data:[], links:{}, meta:{}})
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async (page) => {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/articles?page=" + page);
        setData(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData(currentPage);
    }, []);

    // Change page
    const changePage = (page) => {
        if (page >= 1 && page <= data.meta.last_page) {
            setCurrentPage(page);
            fetchData(page);
        }
    }

    if (loading) {
        return <h2 className="my-2 max-w-2xl mx-auto flex items-center space-x-4">Loading...</h2>;
    }

    return (
        <div>
            <h3 className="my-2 max-w-2xl mx-auto flex items-center space-x-4">Latest articles</h3>
            {data.data.map((article) => (
                <Article key={article.id} article={article} />
            ))}
            <Pagination
                totalItems={data.meta.total}
                changePage={changePage}
                currentPage={currentPage}
            />
        </div>
    )
}

export default Articles
