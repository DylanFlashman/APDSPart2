// import axios from 'axios'
// import { createContext, useState, useEffect } from 'react'
// import Cookies from 'js-cookie';

// export const UserContext = createContext({})

// export function UserContextProvider({children}){
//     const [user, setUser] = useState(null);

//     useEffect(() =>{
//         const token = Cookies.get('token');

//         if (token) {
//             axios.get('/profile', {
//                 headers: {
//                     Authorization: `Bearer ${token}`  
//                 },
//             }).then(({data}) => {
//                 console.log("Fetched user data:", data);
//                 setUser(data);
//             }).catch((err) => {
//                 console.error("Error fetching profile:", err);
//                 setUser(null);
//             });
//         }
//     }, [])
//     return(
//         <UserContext.Provider value={{ user, setUser}}>
//             {children}
//         </UserContext.Provider>
//     );
// }
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    const resetUser = () => {
        setUser(null); // Reset the user state to null
      };

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            axios.get('/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data }) => {
                console.log("Fetched user data:", data);
                setUser({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    role: data.role,  // Include role here
                });
            })
            .catch((err) => {
                console.error("Error fetching profile:", err);
                setUser(null);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, resetUser }}>
            {children}
        </UserContext.Provider>
    );
}
