import React from 'react'
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@chakra-ui/react";


function Profile({history}) {

    const { user, logout } = useAuth();

    const handleLogout = async () => {
        logout(()=>{
            //anasayfaya yönlendirme parametresi
            history.push('/');
        });
    };

    return (
        <div>
            <code>{JSON.stringify(user)}</code>

            <Button colorScheme="pink" variant="solid" onClick={handleLogout}>Logout</Button>   
        </div>
    )
}

export default Profile
