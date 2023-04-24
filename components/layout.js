import Head from "next/head";
import Nav from "./nav";
import {useEffect} from "react";
import {addUser} from "../redux/userSlice";
import { useDispatch } from "react-redux";

//import CookieConsent from "react-cookie-consent";


export default function Layout({ children, user, setUser }) {

    const dispatch = useDispatch();
    useEffect(() => {
        const storedUserStr = sessionStorage.getItem("user");
        const storedUser = storedUserStr ? JSON.parse(storedUserStr) : {};

        dispatch(addUser(storedUser));
    }, [])

    const cookieConstentStyle = {
        bottom: "40px",
        alignItems: "baseline",
        background: "rgb(53, 53, 53)",
        color: "white",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        left: "0px",
        position: "fixed",
        width: "100%",
        zIndex: 10000,
        padding: "0.5rem",
    };

    const cookieConstentButtonStyle = {
        background: "rgb(255, 212, 45)",
        border: "0px",
        borderRadius: "0px",
        color: "black",
        cursor: "pointer",
        flex: "0 0 auto",
        padding: "5px 10px",
    };

    return (
        <>
            <Head>
                <title>Galeria din curte</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta charSet="utf-8" />
                <link rel="canonical" href="" />

                {/*HTML Meta Tags*/}
                <meta
                    name="description"
                    content=""
                />
                <meta name="keywords" content=""></meta>
                {/*Facebook Meta Tags*/}
                <meta property="og:url" content="" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="" />
                <meta
                    property="og:description"
                    content=""
                />
                <meta property="og:image" content="images/home/4.jpg" />
                {/*Twitter Meta Tags*/}
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="" />
                <meta
                    property="twitter:url"
                    content=""
                />
                <meta name="twitter:title" content="" />
                <meta
                    name="twitter:description"
                    content=""
                />
                <meta name="twitter:image" content="" />
                {/* <meta name="google-site-verification" content="EODJlfgOwTLoKHZY01TW31jLhhvT5GpyRVDvEb1Y5OQ" /> */}
            </Head>
            <Nav user={user} setUser={setUser}/>
            <main>{children}</main>

            {/*<CookieConsent*/}
            {/*    location=""*/}
            {/*    buttonText="Accept"*/}
            {/*    declineButtonText="Decline"*/}
            {/*    cookieName="gdpr-google-analytics"*/}
            {/*    disableStyles={false}*/}
            {/*    style={cookieConstentStyle}*/}
            {/*    buttonStyle={cookieConstentButtonStyle}*/}
            {/*>*/}
            {/*    This website uses cookies to enhance the user experience.{" "}*/}
            {/*</CookieConsent>*/}
            {/* <Footer /> */}
        </>
    );
}
