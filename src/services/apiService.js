import { timeConverter } from "../utils/timeConverter";
import axios from "axios";

export class APIService {
    _baseUrl = `https://hacker-news.firebaseio.com/v0`

    
    //get list of stories
    //get array of ids of stories
    //reduce it to 100(cut)
    listController = new AbortController();
    getStoriesList = async() => {
        

        const storiesUrl = `/newstories.json`;
        const response = await axios.get(`${this._baseUrl}${storiesUrl}`
        , { signal: this.listController.signal })
        
        if(response.status === 200){
            console.log('getting ids')
            const limitedCount = response.data.slice(0, 100);
            return limitedCount
        }
    }


    //cancelTokenSource.cancel();
    //
    itemController = new AbortController();
    getStoryData = async(id) => {
        const storyUrl = `/item/${id}.json`;
        const response = await axios.get(`${this._baseUrl}${storyUrl}`
        , { signal: this.itemController.signal })
        
        if(response.status === 200){
            return this._transformStoryData(response.data)
        }
    }

    getStory = async(id) => {
        const storyUrl = `/item/${id}.json`;
        const response = await axios.get(`${this._baseUrl}${storyUrl}`
        , { signal: this.itemController.signal })
        
        if(response.status === 200){
            return this._transformStoryData(response.data)
        }
    }

    getRootComment = async(id) => {
        const commentUrl = `/item/${id}.json`;
        const response = await axios.get(`${this._baseUrl}${commentUrl}`
        , { signal: this.itemController.signal })

        
        if(response.status === 200){
            return this._transformCommentData(response.data)
        }
    }

    _transformStoryData = (data) => {
        const unixTime = data.time
        return {
            author: data.by,
            id: data.id,
            comments: data.kids,
            rating: data.score,
            date: timeConverter(unixTime),
            title: data.title,
            url: data.url
        }
    }

    _transformCommentData = (data) => {
        const unixTime = data.time
        return {
            author: data.by,
            id: data.id,
            children: data.kids,
            parent: data.parent,
            text: data.text,
            date: timeConverter(unixTime),
            deleted: data.deleted,
        }
    }

    //get story data by Item component, each item gets id
    //starts func getStoryData
}