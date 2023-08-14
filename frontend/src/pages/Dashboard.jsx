import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import GoalForm from '../components/goalForm';
import Spinner from '../components/Spinner';
import { getGoals,reset } from '../features/goals/goalSlice';
import GoalItem from '../components/GoalItem';

function Dashboard() {
  const navigate = useNavigate(); // Use useNavigate for React Router v6.x
  const dispatch=useDispatch()
  const { user } = useSelector((state) => state.auth);

  const {goals,isLoading,isError,message}=useSelector((state)=>
  state.goals)
  useEffect(() => {
    if(isError){
      console.log(message)
    }
 
    if (!user) {
      // Use navigate to navigate to the '/login' route
      navigate('/login');
    }
    dispatch(getGoals())
    return()=>{
      dispatch(reset())
    }
  }, [user, navigate,isError,message,dispatch]);

  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
    <section className='heading'>Welcome {user && user.name}
    <p>Goals Dashboard</p>
    </section>
    
    <GoalForm/>

<section className="content">
{goals.length>0 ?(<div className='goals'>
  {goals.map((goal)=>(<GoalItem key={goal._id} goal={goal}/>))}
</div>):(<h3>You have not set Ny goals</h3>)}
</section>
    </>
  );
}

export default Dashboard;
