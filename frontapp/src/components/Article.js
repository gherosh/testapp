import ArticleCategories from "./ArticleCategories";
import {Link} from "react-router-dom";
const Article = ({ article }) => {
    let date = new Date(article.created_at);
    return (
        <div className="p-6 my-2 max-w-2xl mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div>
                <Link className="text-xl font-medium text-black" to={'/article/'+article.slug}>{article.title}</Link>
                <p className="text-gray-500">{date.toLocaleString('en-GB')}</p>
                <ArticleCategories categories={article.categories} />
                <div className="flex w-full items-center font-sans px-1 py-2">
                    <img className="w-10 h-10 rounded-full mr-4" src={article.user.image} alt="Avatar of Author" />
                    <div className="flex-1 px-2">
                        <Link to={'/users/'+article.user.id} className="text-base md:text-md leading-none">{article.user.name} {article.user.surname}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article
