import axios from "axios";

export const getLocationsApi = ( id: string) => {
    
    return axios.get("api/localities/parent-code" + (id? "/" + id : "") );
  };