import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from "axios";
import {API_HOST} from "../config";

const Category = () => {
    let { slug } = useParams();
    const [data, setData] = useState({data:[]})
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({email:''});
    const [loading, setLoading] = useState(true)
    const fetchData = async (slug) => {
        setLoading(true);
        const res = await axios.get(API_HOST + "categories/" + slug);
        setData(res.data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData(slug);
    }, []);

    if (loading) {
        return <h2 className="my-2 max-w-2xl mx-auto flex items-center space-x-4">Loading...</h2>;
    }

    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    const validateForm = (errors) => {
        let valid = true;
        Object.keys(errors).forEach(
            (key) => {
                if (key) {
                    validateField(key, document.getElementsByName(key)[0].value)
                }
            }
        );

        Object.values(errors).forEach(
            (val) => {
                if (val.length > 0) {
                    valid = false
                }
            }
        );
        return valid
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (validateForm(errors)) {
            const formData = new FormData();
            formData.append("categoryId", data.id);
            formData.append("email", email);

            axios.post(API_HOST + 'subscriptions', formData)
                .then((res) => {
                    if (res.data.error) {
                        alert(res.data.message)
                    } else {
                        alert(res.data.message)
                        setEmail('')
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.data.errors) {
                            let errorMsg = ''
                            for (const [key, value] of Object.entries(error.response.data.errors)) {
                                errorMsg = errorMsg + value + "\n"
                            }
                            alert(errorMsg)
                        } else {
                            alert('Unknown error!')
                        }
                    } else if (error.request) {
                        console.log(error.request)
                        alert('Request error!')
                    } else {
                        console.log('Other error!')
                    }
                });

        } else {
            console.error('Invalid Form')
        }
    }

    const onChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        validateField(name, value)
    }

    const validateField = (name, value) => {
        let errorMsg = ''
        switch (name) {
            case 'email':
                setEmail(value)
                errorMsg =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
        }
        setErrors((errors) => { return {...errors, [name]: errorMsg } });
    }

    return (
        <div className="container w-full md:max-w-3xl mx-auto pt-4">
            <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
                <div className="font-sans">
                    <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">{data.title}</h1>
                    <p className="text-sm md:text-base font-normal text-gray-600">{data.articles.length} articles in this category</p>
                </div>
                <p className="py-6">
                    {data.description}
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
            <hr className="border-b-2 border-gray-400 mb-8 mx-4 mt-8" />
            <div className="container px-4 mb-10">
                <div className="font-sans bg-gradient-to-b from-green-100 to-gray-100 rounded-lg shadow-xl p-4 text-center">
                    <h2 className="font-bold break-normal text-xl md:text-3xl">Subscribe to this category</h2>
                    <h3 className="font-bold break-normal text-gray-600 text-sm md:text-base">Get the latest posts delivered right to your inbox</h3>
                    <div className="w-full text-center pt-4">
                        <form onSubmit={onSubmit}>
                            <div className="text-red-500 text-xs italic">{errors.email.length ? errors.email:''}</div>
                            <div className="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                                <input type="email" placeholder="youremail@example.com" className="flex-1 mt-4 appearance-none border border-gray-400 rounded shadow-md p-3 text-gray-600 mr-2 focus:outline-none" name="email"
                                       value={email}
                                       onChange={onChange} />
                                <button type="submit" className="flex-1 mt-4 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-green-400">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category
