import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Auth from "layouts/Auth.js";
import Rate from "components/Rate/rate.js";



const phoneReg =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
    .object()
    .shape({
        firstName: yup
            .string()
            .required("First Name is required.")
            .min(5, "First name must be longer than 4 characters")
            .max(50, "First name must be shorter than 30 characters."),
        lastName: yup
            .string()
            .required("Last Name is required.")
            .min(5, "Last name must be longer than 5 characters")
            .max(50, "Last name must be shorter than 50 characters."),
        feedbackTittle: yup
            .string()
            // .email("Please enter a Feedback Tittle")
            .required("Feedback tittle is required."),
        phoneNumber: yup
            .string()
            .required("Phone number is required")
            .matches(phoneReg, "Phone Number is not valid."),
        password: yup
            .string()
            .required("Attachment is required.")
        // .min(5, "Password must be 5 characters long")
        // .max(35, "Password must be shorter than 35 characters"),
    })
    .required();

export default function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    // const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        feedbackTittle: "",
        phoneNumber: "",
        password: "",
    });
    const [responseUser, setResponseUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });
    // const navigate = useNavigate();
    // const navigateHome = () => {
    //   navigate("/");
    // };

    const saveUser = async (e) => {
        //e.preventDefault();
        const response = await fetch(USER_API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const _user = await response.json();
        setResponseUser(_user);
        window.location.reload();
        alert("Registered Succesfully!");
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setUser({ ...user, [event.target.name]: value });
    };



    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            const uploadedFile = e.target.files[0];
            setFile(uploadedFile);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            return;
        }

        setFile(null);
    };



    const [rating, setRating] = useState(0);





    return (
        <>
            {/* <Routes>
                        <Route path="/" element={<Login />} />
                    </Routes> */}
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-blueGray-400 text-center mb-3 font-bold">
                                    {/* <small>Or sign up with credentials</small> */}
                                </div>
                                <form onSubmit={handleSubmit(saveUser)}>
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Full Name
                                    </label>
                                    <div className="flex w-full  mb-3">
                                        <input
                                            {...register("firstName")}
                                            className="border-0 px-3 py-3 mr-3 placeholder-blueGray-300
                                                        text-blueGray-900 bg-white rounded text-sm shadow
                                                        focus:outline-none focus:ring w-1/2 ease-linear
                                                        transition-all duration-150"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={user.firstName}
                                            onChange={(e) => handleChange(e)}
                                        />
                                        <input
                                            {...register("lastName")}
                                            name="lastName"
                                            className="border-0 px-3 py-3 mx-5 placeholder-blueGray-300
                                                        text-blueGray-900 bg-white rounded text-sm shadow
                                                        focus:outline-none focus:ring w-1/2  ease-linear
                                                        transition-all duration-150"
                                            placeholder="Last Name"
                                            value={user.lastName}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <small role="alert" className="text-red-500 mb-2 mr-20 ">
                                        {errors.firstName?.message}
                                    </small>
                                    <small role="alert" className="  text-red-500 mb-2 ">
                                        {errors.lastName?.message}
                                    </small>

                                    <div className="relative w-full mb-3">
                                        {/* onChange={onOptionChangeHandler} */}
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">category</label>
                                        <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                            <option>Select</option>
                                            <option>Bug Report</option>
                                            <option>Feature Request</option>
                                            <option>General Feedback</option>
                                        </select>
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Feedback Title
                                        </label>
                                        <input
                                            {...register("feedbackTittle")}
                                            type="text"
                                            name="feedbackTittle"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="p.s I can't pay"
                                        />
                                        <small role="alert" className="text-red-500 ">
                                            {errors.feedbackTittle?.message}
                                        </small>
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Phone number
                                        </label>
                                        <input
                                            {...register("phoneNumber")}
                                            type="tel"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="p.s 049-588-814"
                                            name="phoneNumber"
                                            value={user.phoneNumber}
                                            onChange={(e) => handleChange(e)}
                                        />
                                        <small role="alert" className="text-red-500 ">
                                            {errors.phoneNumber?.message}
                                        </small>
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        >
                                            Attachments
                                        </label>

                                        <input
                                            name="attachments"
                                            type="file"
                                            onChange={handleFileChange}

                                        />

                                        <button onClick={handleUploadClick}
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-3 mb-2 w-40 ease-linear transition-all duration-150"
                                        >

                                            Upload
                                        </button>

                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            name="rating"
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        >
                                            Rating
                                        </label>
                                        <div className="Stars" style={{ fontSize: "30px" }} >

                                            <Rate rating={rating} onRating={(rate) => setRating(rate)} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="inline-flex items-center cursor-pointer my-4">
                                            <input
                                                {...register("category")}
                                                id="customCheckLogin"
                                                type="checkbox"
                                                className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                            />
                                            <small role="alert" className="text-red-500 ">
                                                {errors.category?.message}
                                            </small>
                                            <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                                I agree with the{" "}
                                                <a
                                                    href="#pablo"
                                                    className="text-lightBlue-500"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Privacy Policy
                                                </a>
                                            </span>
                                        </label>
                                    </div>
                                    <div className="text-center mt-6">
                                        <input
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                            value="Submit"
                                            onClick={handleChange}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>

    );

}




Register.layout = Auth;

