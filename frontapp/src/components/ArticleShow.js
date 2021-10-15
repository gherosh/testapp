import ArticleCategories from "./ArticleCategories";
import {useEffect, useState} from "react";
import { useHistory, useParams } from 'react-router-dom'
import axios from "axios";

const ArticleShow = () => {
    const { slug } = useParams()
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/articles/" + slug);
        setArticle(res.data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (<h2 className="my-2 max-w-2xl mx-auto flex items-center space-x-4">Loading...</h2>);
    }
    let date = new Date(article.created_at);
    return (
        <div className="p-6 my-2 max-w-2xl mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div>
                <div className="text-xl font-medium text-black">{article.title}</div>
                <p className="text-gray-500">{date.toLocaleString('en-GB')}</p>
                <p>{article.content}</p>
                <ArticleCategories categories={article.categories} />
                <div className="flex w-full items-center font-sans px-1 py-2">
                    <img className="w-10 h-10 rounded-full mr-4" src={article.user.image} alt="Avatar of Author" />
                    <div className="flex-1 px-2">
                        <p className="text-base md:text-md leading-none">{article.user.name} {article.user.surname}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleShow
