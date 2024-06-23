import React from 'react'
import moment from 'moment'
import './Questions.css'
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import QuestionsDetails from './QuestionsDetails'
import Avatar from '../../components/Avatar/Avatar'
import { deleteAnswer } from '../../actions/question'

const DisplayAnswer = ({question,handleShare}) => {

  const User=useSelector((state)=>(state.currentUserReducer))
  const {id}=useParams()
  const dispatch=useDispatch()
  const handleDelete=(answerId,noOfAnswers)=>{
    dispatch(deleteAnswer(id,answerId,noOfAnswers-1))
  }

  return (
    <div>
      {
        question.answer.map((ans)=>(
            <div className="display-ans" key={ans._id}>
                <p>{ans.answerBody}</p>
                <div className="question-actions-user">
                    <button type='button' onClick={handleShare}>Share</button>
                    {
                      User?.result?._id===ans?.userId &&(
                          <button type='button' style={{marginRight:"500px"}} onClick={()=>handleDelete(ans._id,question.noOfAnswers)}>Delete</button>
                      )
                    }
                </div>
                <div style={{marginLeft:"445px",marginTop:"-50px"}}>
                    <p className='user-link'>answered {moment(ans.answeredOn).fromNow()}</p>
                    <Link to={`/Users/${ans.userId}`} className='user-link' style={{color:"#0086d8",textDecoration:"none",fontSize:"16px",marginTop:"0px"}}>
                        <Avatar backgroundColor="green" px='8px' py='5px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                        <div>
                            {ans.userAnswered}
                        </div>
                    </Link>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default DisplayAnswer
