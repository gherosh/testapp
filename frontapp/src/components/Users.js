import axios from "axios";
import {useEffect, useState} from 'react'
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import User from "./User";
import {API_HOST} from "../config";

const Users = () => {
    const [data, setData] = useState({data:[]})
    const [loading, setLoading] = useState(true);
    let match = useRouteMatch();
    const fetchData = async () => {
        setLoading(true);
        const res = await axios.get(API_HOST + "users");
        setData(res.data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);


    if (loading) {
        return <h2 className="my-2 max-w-2xl mx-auto flex items-center space-x-4">Loading...</h2>;
    }

    return (
        <Switch>
            <Route path={`${match.path}/:id`}>
                <User />
            </Route>
            <Route path={match.path}>
                <div className="container w-full md:max-w-3xl mx-auto pt-4">
                    <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
                        <div className="font-sans">
                            <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">Users list</h1>
                        </div>
                    </div>
                    {
                        data.map((item, i) => {
                            return (
                                <div key={i}>
                                    <hr className="border-b-2 border-gray-400 mx-4" />
                                    <div className="flex w-full items-center font-sans px-4 py-12">
                                        <div className="flex-1 px-2">
                                            <p className="text-base font-bold text-base md:text-xl leading-none mb-2">{item.name} {item.surname}</p>
                                            <p className="text-gray-600 text-xs md:text-base">{item.description}</p>
                                        </div>
                                        <div className="justify-end">
                                            <Link className="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full" to={'/users/'+item.id}>See articles</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Route>
        </Switch>

    )
}

export default Users
