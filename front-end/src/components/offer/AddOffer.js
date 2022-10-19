import { useState } from "react";
import useFetch from "use-http";
import {useSessionStorage} from 'react-use-storage'
import Container from "../Container";



const AddOffer = (props)=>{
    const {get,post,response,loading,error}=useFetch('http://localhost:5000');
    const [title,settitle]=useState('');
    const [description,setdescription]=useState('');
    const [location,setlocation]=useState('');
    const [userid,setuserid,removeuserid]=useSessionStorage('userid','');
    
    const submitHandler = async(event)=>{
		event.preventDefault();
        console.log('hallo',userid);
        const author=userid;
		const offerdata =await post('/offer',{title,description,location,author,userid});
		if(offerdata.ok){
			window.location= '/';
		}
		}   
return <form className='main-content'>
    <Container>
    <label htmlFor="title">title</label>
    <input type='text' id="title" onChange={e=>{settitle(e.target.value)}} />
    <label htmlFor="description">description</label>
    <textarea  id="description" onChange={e=>{setdescription(e.target.value)}} />
    <label htmlFor="location">location</label>
    <input type='text' id="location" onChange={e=>{setlocation(e.target.value)}} />
    <button type="submit" onClick={submitHandler}>Add Offer</button>
    </Container>
</form>
}

export default AddOffer;