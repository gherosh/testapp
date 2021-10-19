import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from "axios";
import {API_HOST} from "../config";

const User = () => {
    let { id } = useParams();
    const [data, setData] = useState({data:[]})
    const [loading, setLoading] = useState(true)
    const fetchData = async (id) => {
        setLoading(true);
        const res = await axios.get(API_HOST + "users/" + id);
        setData(res.data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData(id);
    }, []);

    if (loading) {
        return <h2 className="my-2 max-w-2xl mx-auto flex items-center space-x-4">Loading...</h2>;
    }

    return (
        <div className="container w-full md:max-w-3xl mx-auto pt-4">
            <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
                <div className="font-sans">
                    <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">{data.name} {data.surname}</h1>
                    <p className="text-sm md:text-base font-normal text-gray-600">{data.articles.length} articles by this user</p>
                </div>
                <p className="py-6">
                    <img className="w-10 h-10 rounded-full mr-4" src={data.image} alt="Avatar of Author" />
                </p>
                <ol>
                    {
                        data.articles.map((item, i) => {
                            return (
                                <li key={i} className="py-1"><Link className="text-green-500" to={'/article/'+item.slug}>{item.title}</Link></li>
                            )
                        })
                    }
                </ol>
            </div>

        </div>
    )
}

export default User
