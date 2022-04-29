import styles from './Comment.module.css';
import { useEffect, useState } from 'react';
import { APIService } from '../../../services/apiService';

const apiService = new APIService();



export const Comment = (props) => {

    const {id, author, date, text, children} = props.data
    
    const [childsData, setChildsData] = useState([])
    const [showChilds, toggleShowChilds] = useState(false)

    const onAnswersShow = (childrenIds) => {
            Promise.all(
                childrenIds.map(id => {return apiService.getRootComment(id)})
            ).then(data => {
                setChildsData(data)
            })
    }

    useEffect(
        () => {
            if(showChilds){
                onAnswersShow(children)
            }
        }
        ,
        [showChilds])


    return(
        <div className={styles.commentWrapper}>

                    <div className={styles.comment}>
                        <div>{author}</div>
                        <div dangerouslySetInnerHTML={{ __html: text}}></div>
                        <div>{date}</div>
                            {children? <button onClick={() => toggleShowChilds(!showChilds)}
                        className={styles.showAnswers}>{`show answers (${children.length})`}</button> 
                            : null}
                    
                    </div>

                    <div className={styles.children}>
                        {showChilds? childsData.map(child => {
                            return(
                                <div key={child.id} className={styles.child}>
                                    <div>{child.author}</div>
                                    <div dangerouslySetInnerHTML={{ __html: child.text}}></div>
                                    <div>{child.date}</div>
                                </div>
                            )
                        }) : null}
                    </div>

                </div>
    )
}