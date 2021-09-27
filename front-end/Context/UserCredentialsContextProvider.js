import React, { createContext, useState } from "react";
import NavigationStack from '../Navigators/NavigationStack'

// export const UserCredentialsContextProvider = createContext({ storedCredentials: "", setStoredCredentials: ()=>{}})
export const UserCredentialsContext = createContext(null)

export default UserCredentialsContextProvider = ({children}) => {
	const [storedCredentials, setStoredCredentials] = useState("")

	const valObj = {
		storedCredentials,
		setStoredCredentials,
	}

	return (
		<UserCredentialsContext.Provider value={valObj}>
			{children}
		</UserCredentialsContext.Provider>
	)
}