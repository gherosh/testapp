import {Link} from "react-router-dom";
const ArticleCategories = ({categories}) => {
    return (
        <div className="text-base md:text-sm text-gray-500 px-4 py-6">
            Categories: {categories.map((category) => (
            <Link to={'/categories/'+category.slug} className="text-base md:text-sm text-green-500 no-underline hover:underline">{category.title}</Link>
        )).reduce((previous, current) => [previous, ' / ', current])}
        </div>
    )
}

export default ArticleCategories
