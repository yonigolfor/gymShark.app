import { getDatabase, ref, onValue, set, update } from 'firebase/database';

const update_post = async (updateUser) => {
    
  
    try {
      if (updateUser.planList){ // case: planList updated
        await handlePlanList(updateUser);
        // res.status(200).json({...updateUser});
    } else
    if (updateUser.GraphResults) { // case: GraphResults updated
      await handleGraphResults(updateUser);
      // res.status(200).json({...updateUser});
    } else
    if (updateUser.startOfMonthResults) { // case: startOfMonthResults updated
      await handleStartOfMonthResults(updateUser);
      // res.status(200).json({...updateUser});
    }
    else
    if (updateUser.GraphDates) { // case: GraphDates updated
      await handleGraphDates(updateUser);
      // res.status(200).json({...updateUser});
    }
  }
    catch (err) {
      console.log(err);
      console.log('error found by me');
    }
  }

  export default update_post;
  

  const handlePlanList = async (updateUser) => {
    const db = getDatabase();
    const reference = ref(db, 'users/' + updateUser.user_id + '/planList');
    console.log('results history for Two plan:', updateUser.planList[0].resultsHistory);
    await set ( reference, {
        planList: updateUser.planList
    });
  }

  const handleGraphResults = async (updateUser) => {
    const db = getDatabase();
    const reference = ref(db, 'users/' + updateUser.user_id + '/GraphResults');
    
    
    await set ( reference, {
        GraphResults: updateUser.GraphResults
    });
  }

  const handleStartOfMonthResults = async (updateUser) => {
    
    const db = getDatabase();
    const reference = ref(db, 'users/' + updateUser.user_id + '/startOfMonthResults');
    
    await set ( reference, {
      startOfMonthResults: updateUser.startOfMonthResults
    });
  }

  const handleGraphDates = async (updateUser) => {
    const db = getDatabase();
    const reference = ref(db, 'users/' + updateUser.user_id + '/GraphDates');
    
    await set ( reference, {
      GraphDates: updateUser.GraphDates
    });
  }