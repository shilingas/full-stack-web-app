import React from "react";
import Navbar from "../Components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Login";
import LogoutButton from "../Logout";
const HomePage = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    return (
        <div>
            <Navbar />
            {
                !user ? (
                    <>
                        <LoginButton />
                        <p>Login or create a profile to use this...</p>
                    </>
                ) :
                    (
                        <>
                            <LogoutButton />
                            <p>Welcome back, {user.nickname}!</p>
                        </>
                    )
            }
        </div>
    );
}
export default HomePage;