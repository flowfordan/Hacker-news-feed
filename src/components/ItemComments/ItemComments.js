import styles from './ItemComments.module.css';
import { APIService } from '../../services/apiService';
import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const apiService = new APIService();

export const ItemComments = (props) => {
    
    const {commentsIds} = props
    console.log(commentsIds)

    //get apiService for parent comments
    
    //onClick get api Service forr kids comments

    if(!commentsIds){

        return(
            <div>There are no comments yet</div>
        )
    }

    return(
        <div>
            {commentsIds}
        </div>
    )
}