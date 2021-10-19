import {useState} from 'react'
import axios from "axios";
import {API_HOST} from "../config";

const AddCategory = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState({title:'', desc:''});

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
            formData.append("description", description);

            axios.post(API_HOST + 'categories', formData)
                .then((res) => {
                    if (res.data.error) {
                        alert(res.data.message)
                    } else {
                        alert(res.data.message)
                        setTitle('')
                        setDescription('')
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
            case 'title':
                setTitle(value)
                errorMsg =
                    value.length < 3
                        ? 'Title must be 3 characters long!'
                        : '';
                break;
            case 'desc':
                setDescription(value)
                errorMsg =
                    value.length < 3
                        ? 'Description must be 3 characters long!'
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
                        Description
                    </label>
                    <textarea
                        className={errors.desc.length ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                        id="grid-description"
                        placeholder="Description"
                        name="desc"
                        value={description}
                        onChange={onChange}
                    />
                    <p className="text-red-500 text-xs italic">{errors.desc.length ? errors.desc:''}</p>
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

export default AddCategory
