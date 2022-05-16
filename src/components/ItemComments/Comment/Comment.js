import styles from './Comment.module.css';
import { useEffect, useState } from 'react';
import { APIService } from '../../../services/apiService';
import { Button } from '../../Button/Button';

const apiService = new APIService();



export const Comment = (props) => {

    const {author, date, text, children} = props.data;
    
    const [childsData, setChildsData] = useState([]);
    const [showChilds, toggleShowChilds] = useState(false);

    //num of comments - not dead or deleted
    let finalAnswersNum = 0;
    if(children){
        finalAnswersNum = children.length;
    }

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

    const commentAnswers = childsData.map(child => {
        if(child.dead || child.deleted){
            finalAnswersNum -= 1
            return null}
        else{
            return(
            <div key={child.id} className={styles.child}>
                <div className={styles.author}>{child.author}</div>
                <div dangerouslySetInnerHTML={{ __html: child.text}}></div>
                <div className={styles.date}>{child.date}</div>
            </div>
        )
        }

        
    })


    return(
        <div className={styles.commentWrapper}>

                    <div className={styles.comment}>
                        <div className={styles.author}>{author}</div>
                        <div dangerouslySetInnerHTML={{ __html: text}}></div>
                        <div className={styles.date}>{date}</div>

                            {finalAnswersNum > 0?
                            <div className={styles.btnWrap}>
                                <Button appearance={'ghost'} arrow={showChilds? 'down' : 'up'} 
                                onClick={() => toggleShowChilds(!showChilds)} isLoading={false}>
                                    Show answers
                                </Button>
                            </div>
                             
                            : null}
                    
                    </div>

                    <div className={styles.children}>
                        {showChilds? commentAnswers : null}
                    </div>

                </div>
    )
}