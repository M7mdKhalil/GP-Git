import { useParams } from "react-router";
import Container from "../Container";
import { useFetch } from "use-http";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar";


const Offers = (props) => {
    const { get, post, response, loading, error } = useFetch(
        "http://localhost:5000"
    );
    const params = useParams();
    const navigate = useNavigate();
    const [userdetails, setUserdetails] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const userdetail = await get(`/user/${params.id}`);
            console.log(userdetail);
            setUserdetails(userdetail);
        };
        fetchData();
    }, []);
    return (
        <Container>
            <h1>offers</h1>
            {userdetails?.offers?.map((offer) => {
                <Card
                    key={offer?._id}
                    _id={offer?._id}
                    title={offer?.title}
                    location={offer?.location}
                    author={offer?.author}
                    date={offer?.date?.substring(0, 10)}
                    // visible={!offer.appliers.includes(userid)}
                    length={offer?.appliers?.length}
                    image={offer?.author?.image?.url}
                    available={offer?.available}
                    onClick={() => navigate(`/offer/${offer._id}`)}
                    />
            })}
            {userdetails?.kind === 'user' && (
                <>
                    <h1>accepted offers</h1>
                    {userdetails?.acceptedOffers?.map(offer => {
                        <Card
                            key={offer._id}
                            _id={offer._id}
                            title={offer.title}
                            location={offer.location}
                            author={offer.author}
                            date={offer.date.substring(0, 10)}
                            // visible={!offer.appliers.includes(userid)}
                            length={offer.appliers.length}
                            image={offer.author.image?.url}
                            available={offer.available}
                            onClick={() => navigate(`/offer/${offer._id}`)}
                        />
                    })}
                    <h1>regected offers</h1>
                    {userdetails?.regectedOffers?.map(offer => {
                        <Card
                            key={offer._id}
                            _id={offer._id}
                            title={offer.title}
                            location={offer.location}
                            author={offer.author}
                            date={offer.date.substring(0, 10)}
                            // visible={!offer.appliers.includes(userid)}
                            length={offer.appliers.length}
                            image={offer.author.image?.url}
                            available={offer.available}
                            onClick={() => navigate(`/offer/${offer._id}`)}
                        />
                    })}
                </>
                )
            }
    </Container>
        )
}
export default Offers;