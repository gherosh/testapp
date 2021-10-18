import {useState} from 'react'
import axios from "axios";

const AddUser = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({name:'', surname:'', email:'', password:''});

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

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
            formData.append("name", name);
            formData.append("surname", surname);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("file", file);

            axios.post('http://127.0.0.1:8000/api/users', formData)
                .then((res) => {
                    if (res.data.error) {
                        alert(res.data.message)
                    } else {
                        alert(res.data.message)
                        setName('')
                        setSurname('')
                        setEmail('')
                        setPassword('')
                        setSelectedFile(null)
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
            case 'name':
                setName(value)
                errorMsg =
                    value.length < 3
                        ? 'Name must be 3 characters long!'
                        : '';
                break;
            case 'surname':
                setSurname(value)
                errorMsg =
                    value.length < 3
                        ? 'Surname must be 3 characters long!'
                        : '';
                break;
            case 'email':
                setEmail(value)
                errorMsg =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                setPassword(value)
                errorMsg =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
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
                        First Name
                    </label>
                    <input
                        className={errors.name.length ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white":"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                        id="grid-first-name"
                        type="text"
                        placeholder="Jane"
                        name="name"
                        value={name}
                        onChange={onChange}
                         />
                    <p className="text-red-500 text-xs italic">{errors.name.length ? errors.name:''}</p>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-last-name">
                        Last Name
                    </label>
                    <input
                        className={errors.surname.length ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white":"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                        id="grid-last-name"
                        type="text"
                        placeholder="Doe"
                        name="surname"
                        value={surname}
                        onChange={onChange}
                    />
                    <p className="text-red-500 text-xs italic">{errors.surname.length ? errors.surname:''}</p>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-email">
                        Email
                    </label>
                    <input
                        className={errors.email.length ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white":"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                        id="grid-email"
                        type="text"
                        placeholder="example@example.com"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                    <p className="text-red-500 text-xs italic">{errors.email.length ? errors.email:''}</p>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-password">
                        Password
                    </label>
                    <input
                        className={errors.password.length ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white":"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                        id="grid-password"
                        type="password"
                        placeholder="******************"
                        name="password"
                        value={password}
                        onChange={onChange}
                    />
                    <p className="text-red-500 text-xs italic">{errors.password.length ? errors.password:''}</p>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-image">
                        Image
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-image" name="file" type="file"
                        onChange={onFileChange} />
                    <p className="text-gray-600 text-xs italic">Select file for upload</p>
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

export default AddUser
