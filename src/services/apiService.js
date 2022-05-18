import { timeConverter } from "../utils/timeConverter";
import { decodeHtml } from "../utils/decodeHTMLText";
import axios from "axios";

export class APIService {
    _baseUrl = `https://hacker-news.firebaseio.com/v0`

    
    //get list of stories
    //get array of ids of stories
    //reduce it to 100(cut)
    listController = new AbortController();
    getStoriesIds = async(storiesType = 'newstories', page, step) => {
        const storiesUrl = `/${storiesType}.json`;
        // /topstories, /beststories, newstories

        const response = await axios.get(`${this._baseUrl}${storiesUrl}`
        , { signal: this.listController.signal })
        
        if(response.status === 200){
            const end = page * step;
            const limitedCount = response.data.slice(0, end);
            return limitedCount;
        }
    }


    feedItemController = new AbortController();
    getStoryData = async(id) => {
        const storyUrl = `/item/${id}.json`;
        const response = await axios.get(`${this._baseUrl}${storyUrl}`
        , { signal: this.feedItemController.signal })
        
        if(response.status === 200){
            return this._transformStoryData(response.data)
        }
    }

    getStory = async(id) => {
        const storyUrl = `/item/${id}.json`;
        const response = await axios.get(`${this._baseUrl}${storyUrl}`
        )
        
        if(response.status === 200){
            return this._transformStoryData(response.data)
        }
    }

    getRootComment = async(id) => {
        const commentUrl = `/item/${id}.json`;
        const response = await axios.get(`${this._baseUrl}${commentUrl}`
        )

        
        if(response.status === 200 ){
            //check if comment is dead or deleted
            return this._transformCommentData(response.data)
        }
    }

    _transformStoryData = (data) => {
        const unixTime = data.time
        return {
            author: data.by,
            id: data.id,
            commentsIds: data.kids,
            rating: data.score,
            date: timeConverter(unixTime),
            title: data.title,
            url: data.url,
            commentsNum: data.descendants
        }
    }

    _transformCommentData = (data) => {
        const unixTime = data.time
        return {
            author: data.by,
            id: data.id,
            children: data.kids,
            parent: data.parent,
            text: decodeHtml(data.text),
            date: timeConverter(unixTime),
            deleted: data.deleted,
            dead: data.dead,
            dateRaw: data.time,
            answers: null
        }
    }
}