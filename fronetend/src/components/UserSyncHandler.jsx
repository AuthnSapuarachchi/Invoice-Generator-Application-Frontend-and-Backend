import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = "http://localhost:8080"; // Replace with your actual backend URL

const UserSyncHandler = () => {

    const [synced, setSynced] = useState(false);
    const {isLoaded, isSignedIn, getToken} = useAuth();
    const {user} = useUser();

    useEffect(() => {
       const syncUser = async () => {
            if (!isLoaded || !isSignedIn || synced || !user) {
                return;
            }
            
            try {
                const token = await getToken();
                const userData = {
                    clerkId: user.id,
                    email: user.primaryEmailAddress.emailAddress,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    photoUrl: user.imageUrl
                }

                await axios.post(baseUrl + "/users", userData, {headers: {Authorization: `Bearer ${token}`}} );

                setSynced(true);

            } catch (error) {
                // Silently fail - log to console only, don't show error toast
                console.error("User sync error:", error.message);
                setSynced(true); // Prevent retry loops
            }
        } 
        syncUser();
    }, [isLoaded, isSignedIn, synced, getToken, user]);
    return null;
}

export default UserSyncHandler;