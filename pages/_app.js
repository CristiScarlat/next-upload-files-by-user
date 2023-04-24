import { useEffect } from "react";
import Layout from "../components/layout";
import userbase from 'userbase-js';
import {Provider} from "react-redux";
import store from "../redux/store";
import '../styles/globals.css';

function MyApp({Component, pageProps}) {

    useEffect(() => {
        userbase.init({appId: process.env.NEXT_PUBLIC_USERBASE_APP_ID});

    }, [])

    return (
        <Provider store={store}>
            <Layout>
                <Component/>
            </Layout>
        </Provider>
    )
}

export default MyApp
