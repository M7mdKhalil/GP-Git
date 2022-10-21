
import {useSessionStorage} from 'react-use-storage'
import { useEffect, useState } from "react";
import { useFetch } from "use-http";
import { useParams } from "react-router-dom";
import Container from '../Container';
import PageNotFound from '../error/PageNotFound';

const EditOffer = (props)=>{
  const [islogin,setislogin,removeislogin]=useSessionStorage('islogin',false);
  const [kind,setkind,removekind]=useSessionStorage('kind',false);
  const [userid,setuserid,removeuserid]=useSessionStorage('userid','');
    const params = useParams();
    const [title,settitle]=useState('');
    const [description,setdescription]=useState('');
    const [location,setlocation]=useState('');
    const { get, put, response, loading, error } = useFetch(
        "http://localhost:5000"
      );
      const [offer,setoffer]=useState({});

      useEffect(() => {
        const fetchData = async () => {
          const offerdetail = await get(`/offer/${params.id}`);
          setoffer(offerdetail);
          return offerdetail;
        };
        fetchData();
      }, [get,params._id]);

      const submitHandler = async(e)=>{
        e.preventDefault();
        const _id = offer._id;
        const offerdata =await put('/offer',{title,description,location,_id,userid});
		if(offerdata.ok){
			window.location= '/';
		}
      }

return <>{!islogin||kind!=='company'?<PageNotFound/>:<form className='main-content'>
  <Container><label htmlFor="title">title</label>
    <input type='text' placeholder={offer?.title} id="title" onChange={e=>{settitle(e.target.value)}} />
    <label htmlFor="description">description</label>
    <textarea  id="description" placeholder={offer?.description} onChange={e=>{setdescription(e.target.value)}} />
    <label htmlFor="location">location</label>
    <input type='text' id="location" placeholder={offer?.location} onChange={e=>{setlocation(e.target.value)}} />
    <button type="submit" onClick={submitHandler}>Edit Offer</button>
    </Container>

</form>}</>
}

export default EditOffer;