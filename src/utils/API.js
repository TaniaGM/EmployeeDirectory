import axios from "axios";
export default {
    // Gets all users
    getUsers: function () {
        return axios.get("https://randomuser.me/api/?results=15&nat=us");
    }
};