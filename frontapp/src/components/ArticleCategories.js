const ArticleCategories = ({categories}) => {
    return (
        <div className="text-base md:text-sm text-gray-500 px-4 py-6">
            Categories: {categories.map((category) => (
            <a href="#" className="text-base md:text-sm text-green-500 no-underline hover:underline">{category.title}</a>
        )).reduce((previous, current) => [previous, ' / ', current])}
        </div>
    )
}

export default ArticleCategories
