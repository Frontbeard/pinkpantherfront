import axios from "axios"
import { URL_LINK } from "../../../URL"

//actualiza el estado de banneo de un usuario en el servidor
const userBan = (value, user, accessToken) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                  authorization: `Bearer ${accessToken}`
                }
              }
              await axios.put(`${URL_LINK}`,{...user, userBan: value}, config)
            return {message: 'Usuario baneado correctamente'}
            
           
        } catch (error) {
            return {message: 'Error al banear el usuario'}
        }

    }
}

export default userBan