/* eslint-disable default-case */
import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    // console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    
    const signInWithGoogle = async () => {
        const {user}= await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("incorrect password for email");
                    break;
                
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default:
                    console.log(error);
            }

            // if (error.code === "auth/wrong-password") {
            //     alert("incorrect password for email");
            // }

            console.log(error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value});
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account ?</h2>
            <span>Sign up with your emain an password</span>

            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                
                <div className="buttons-container">
                    <Button type="submit">Sign IN</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;