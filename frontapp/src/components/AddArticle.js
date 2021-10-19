import {useEffect, useState} from 'react'
import axios from "axios";
import {API_HOST} from "../config";

const AddArticle = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [categoryId, setCategoryId] = useState([])
    const [userOptions, setUserOptions] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])
    const [errors, setErrors] = useState({title:'', content:'', userId:'', categoryId:''});

    useEffect(() => {
        const getUsers = async () => {
            const usersOptions = await getUserOptions()
            setUserOptions(usersOptions)
        }
        getUsers()

        const getCategories = async () => {
            const categoriesOptions = await getCategoryOptions()
            setCategoryOptions(categoriesOptions)
        }
        getCategories()
    },[]);

    const getUserOptions = async () => {
        const res = await axios.get(API_HOST + 'users')
        const data = res.data.data
        return data.map(u => ({
            "id": u.id,
            "label": u.name + ' ' + u.surname
        }))
    }

    const getCategoryOptions = async () => {
        const res = await axios.get(API_HOST + 'categories')
        const data = res.data.data
        return data.map(u => ({
            "id": u.id,
            "label": u.title
        }))
    }

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
            formData.append("title", title);
            formData.append("content", content);
            formData.append("userId", userId);
            formData.append("categoryId", JSON.stringify(categoryId));

            axios.post(API_HOST + 'articles', formData)
                .then((res) => {
                    if (res.data.error) {
                        alert(res.data.message)
                    } else {
                        alert(res.data.message)
                        setTitle('')
                        setContent('')
                        setUserId('')
                        setCategoryId([])
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
        let { name, value } = e.target;
        if (name === 'categoryId') {
            value = Array.from(
                e.target.selectedOptions,
                (option) => option.value
            );
        }
        validateField(name, value)
    }

    const validateField = (name, value) => {
        let errorMsg = ''
        switch (name) {
            case 'title':
                setTitle(value)
                errorMsg =
                    value.length < 3
                        ? 'Title must be 3 characters long!'
                        : '';
                break;
            case 'content':
                setContent(value)
                errorMsg =
                    value.length < 3
                        ? 'Content must be 3 characters long!'
                        : '';
                break;
            case 'userId':
                setUserId(value)
                errorMsg =
                    !value
                        ? 'Select user!'
                        : '';
                break;
            case 'categoryId':
                setCategoryId(value)
                errorMsg =
                    !value
                        ? 'Select category!'
                        : '';
                break;

        }
        setErrors((errors) => { return {...errors, [name]: errorMsg } });
    }

    return (
        <div className="container w-full md:max-w-3xl mx-auto my-4 bg-white p-4">
        <form className="w-full max-w-lg" onSubmit={onSubmit} encType="multipart/form-data">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-first-name">
                        Title
                    </label>
                    <input
                        className={errors.title.length ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white":"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                        id="grid-title"
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={onChange}
                         />
                    <p className="text-red-500 text-xs italic">{errors.title.length ? errors.title:''}</p>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-last-name">
                        Content
                    </label>
                    <textarea
                        className={errors.content.length ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                        id="grid-content"
                        placeholder="Content"
                        name="content"
                        value={content}
                        onChange={onChange}
                    />
                    <p className="text-red-500 text-xs italic">{errors.content.length ? errors.content:''}</p>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-user-id">
                        User
                    </label>
                    <select className={errors.userId.length ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"} name="userId" multiple={false} value={userId} onChange={onChange}>
                        <option value="">...</option>
                        {
                            userOptions.map((item, i) => {
                                return (
                                    <option key={i} value={item.id}>{item.label}</option>
                                )
                            })
                        }
                    </select>
                    <p className="text-red-500 text-xs italic">{errors.userId.length ? errors.userId:''}</p>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-user-id">
                        Categories
                    </label>
                    <select className={errors.categoryId.length ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"} name="categoryId" multiple={true} value={categoryId} onChange={onChange}>
                        {
                            categoryOptions.map((item, i) => {
                                return (
                                    <option key={i} value={item.id}>{item.label}</option>
                                )
                            })
                        }
                    </select>
                    <p className="text-red-500 text-xs italic">{errors.categoryId.length ? errors.categoryId:''}</p>
                </div>
            </div>

            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button
                        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit">
                        Add
                    </button>
                </div>
            </div>
        </form>
        </div>
    )
}

export default AddArticle
