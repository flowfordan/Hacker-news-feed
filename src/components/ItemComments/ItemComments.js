import styles from './ItemComments.module.css';
import { APIService } from '../../services/apiService';
import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const apiService = new APIService();

export const ItemComments = (props) => {
    console.log(props)
    return(
        <div>
            Comments
        </div>
    )
}