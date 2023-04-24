import { useState } from 'react'
import LoginModal from './loginModal'
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";

import userbase from 'userbase-js'
import {remove} from "next/dist/build/webpack/loaders/resolve-url-loader/lib/file-protocol";

export default function Nav() {
    const [open, setOpen] = useState()
    const [modalType, setModalType] = useState()

    const {user} = useSelector(state => state);
    const dispatch = useDispatch();

    function openModal(type) {
        setOpen(true)
        setModalType(type)
    }

    async function logOut() {
        try {
            const res = await userbase.signOut();
            console.log(res)
            dispatch(removeUser())
            sessionStorage.setItem("user", '')
        } catch (e) {
            console.error(e.message)
        }
    }

    function setUser(user) {
        dispatch(addUser(user))
    }

    return (
        <nav className="container mx-auto">
            <ul className="flex justify-end items-center p-8">
                {!user?.userId ? (
                    <>
                        <li>
                            <button
                                className="font-bold mx-2"
                                onClick={() => openModal('logIn')}
                            >
                                Log In
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn-yellow mx-2"
                                onClick={() => openModal('signUp')}
                            >
                                Sign Up
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <button className="font-bold" onClick={logOut}>
                            Log Out
                        </button>
                    </li>
                )}
            </ul>
            {open && (
                <div className="w-4/5 md:w-1/2 mx-auto">
                    <LoginModal
                        toggle={setOpen}
                        modalType={modalType}
                        setUser={setUser}
                    />
                </div>
            )}
        </nav>
    )
}