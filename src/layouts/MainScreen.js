import React, { useState, useEffect} from 'react';
import './MainScreen.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Counter from '../components/Counter';
import NewCounter from '../components/NewCounter';
//MODALS
import DeleteModal from '../components/modals/DeleteModal';
import CreateFailModal from '../components/modals/CreateFailModal';
import DeleteFailModal from '../components/modals/DeleteFailModal';
import UpdateFailModal from '../components/modals/UpdateFailModal';
import RefreshedFailModal from '../components/modals/RefreshedFailModal';
//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { refreshCounters, newCounter,handleModal } from '../redux/actions/index';
import SharePopoverModal from '../components/modals/SharePopoverModal';


function MainScreen() {

  //result from api petition - static
  const [ allCounters , setAllCounters ] = useState([])
  //dinamic
  const [counters, setCounters] = useState([])
  const [refreshCount, setRefreshCount] = useState(0)
  const [welcomeAnimation, setWelcomeAnimation] = useState(false)
  const [animation, setAnimation] = useState(false)

  //conect with redux from header
  const searchText = useSelector( state => state.counter);
  const refresh =  useSelector( state => state.refreshCounters);
  const receiveNewCounter =  useSelector( state => state.sendNewCounter);
  const modal =  useSelector( state => state.handleModal)
  const dispatch = useDispatch();

  //fetching the counters
  const fetchCounters = () => {
    fetch('/api/v1/counter', { method: 'get' })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      setAllCounters(res)
      setCounters(res)
      console.log(counters)
      setRefreshCount(refreshCount + 1)
      if( modal.type === 'refreshFail') {
        dispatch(handleModal({ type: 'refreshedFail', isOpen: false}))
      }
      setTimeout(() => setAnimation(false), 1000)
      setTimeout(() => setWelcomeAnimation(false), 1000)
    }) 
    .catch( err => {
      console.log(err)
      setTimeout(() => setAnimation(false), 1000)
      setTimeout(() => setWelcomeAnimation(false), 1000)
      dispatch(handleModal({ type: 'refreshedFail', isOpen: true}))
    })
    setTimeout(() => setAnimation(false), 1000)
    setTimeout(() => setWelcomeAnimation(false), 1000)
  };

  //refreshing the counters list
  useEffect(() => {
    console.log('counters list is refreshing')
    setAnimation(true)
    if( refresh === true ) {
      fetchCounters()
      console.log(refreshCount)
    }    
    dispatch(refreshCounters(false))
  }, [refresh])
  
  //when receiving a new counter from the new counter window
  useEffect(() => {
    console.log(`new counter received ${receiveNewCounter.title}`)
    setCounters([...counters, receiveNewCounter])
    dispatch(newCounter(false))
    fetchCounters()
  }, [receiveNewCounter]);

  useEffect(() => {
    setWelcomeAnimation(true)
  }, [])

  //Searching counters logic
  useEffect(() => {
    console.log('searched')
    searchText === '' ? (
      setCounters(allCounters)  
    ):(
      setCounters( allCounters.filter( counter => {
        return counter.title.toLowerCase().includes(searchText.toLowerCase())
      })))
  }, [searchText])
  


  return (
  	<div className='mainScreen'>

      {
      /*Modals*/
        modal.type === 'delete' & modal.isOpen === true ? <DeleteModal /> :
        modal.type === 'refreshedFail' & modal.isOpen === true ? <RefreshedFailModal /> : 
        modal.type === 'createFail' & modal.isOpen === true ? <CreateFailModal /> :
        modal.type === 'deleteFail' & modal.isOpen === true ? <DeleteFailModal /> :
        modal.type === 'updateFail' & modal.isOpen === true ? <UpdateFailModal /> :
        modal.type === 'share' & modal.isOpen === true ? <SharePopoverModal />: null
      }
			
      {
        welcomeAnimation === true ? (
          <div className='mainScreen__refreshing'>
            <div className='mainScreen__refreshingIcon'>
              <i class='bx bxs-circle bx-tada outer' style={{color: 'rgba(255,149,0,0.2)'}}></i>
              <i class='bx bxs-circle bx-burst center' style={{color:'rgba(255,149,0,0.44)'}}></i>
              <i class='bx bxs-circle bx-tada inner' style={{color:'#ff9500'}}></i>
            </div>
          </div>
        ) : null
      }


			<Header />

      { allCounters.length !== 0  ? (
        <div className='counterContainer'>
          <div className='counterContainer_update'>
            {allCounters?.length}
            &nbsp;Items &nbsp;<span> {refreshCount} times </span>&nbsp; 
            {
              animation === true ? (
                <div style={{display:'flex'}}>
                  <i class='bx bx-revision bx-spin' style={{color:'#ff9500', fontSize: '17px'}} ></i>
                  &nbsp; 
                  <p style={{color:'#ff9500'}}>refreshing...</p>
                </div>
              ):(
                <i 
                class='bx bx-revision bx-xs'
                onClick={() => {
                  dispatch(refreshCounters(true))
                  setAnimation(true)
                }}
                ></i> 
              )
            }

            {
              animation === true ? (
                <div className='blocker'></div>
              ) : null
            }
           
          </div>
     
          {
            counters.map(counter => <Counter key={counter.id} counter={counter}/>)
          }
        </div>

      ) : ( 
        <div className='mainScreen__empty' style={{zIndex: 2}}>
          <h3>No counters yet</h3>
          <p>"When i started counting my blessings, my whole life turned around."<br>
          </br>-Willie Nelson</p>
        </div>
      )
      }

      { counters.length === 0 ? (
        <div className='mainScreen__empty'>
          <h3 style={{
            color : 'rgba(0,0,0,0.2)',
          }}>No Results</h3>
        </div>
      ): null
      }

      <NewCounter />
      
      <Footer />
    </div>
)
}

export default MainScreen