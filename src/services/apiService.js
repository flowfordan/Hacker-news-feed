import { responsiveProperty } from "@mui/material/styles/cssUtils";
import axios from "axios";

export class APIService {
    _baseUrl = `https://hacker-news.firebaseio.com/v0`


    //get list of stories
    //get array of ids of stories
    //reduce it to 100(cut)
    getStoriesList = async() => {
        const storiesUrl = `/newstories.json`;
        const response = await axios.get(`${this._baseUrl}${storiesUrl}`)
        console.log(response)
        
        if(response.status === 200){
            const limitedCount = response.data.slice(0, 100);
            return limitedCount
        }
    }

    //get story data by Item component, each item gets id
    //starts func getStoryData
}