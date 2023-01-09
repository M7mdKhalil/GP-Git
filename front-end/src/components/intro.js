import React, { useContext, useState } from "react";
import "./UI/intro.css";
import Vector1 from "./img/Vector1.png";
import Vector2 from "./img/Vector2.png";
import boy from "./img/boy.png";
import glassesimoji from "./img/glassesimoji.png";
import thumbup from "./img/thumbup.png";
import crown from "./img/crown.png";
import FloatinDiv from "./UI/FloatingDiv/FloatingDiv";
import Github from "./img/github.png";
import LinkedIn from "./img/linkedin.png";
import Instagram from "./img/instagram.png";
import { themeContext } from "./UI/context";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
const Intro = () => {
    const showUser = useSelector((state) => state.user.userDetails);

    const params = useParams();
    const [userdetails, setuserdetails] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const userdetails = await axios
                .get(`http://localhost:5000/user/${params.id}`)
                .then(function (response) {
                    // handle success
                    setuserdetails(response.data);
                })
        };
        fetchData();
    }, [params]);

    // Transition
    const transition = { duration: 2, type: "spring" };

    // context
    const theme = useContext(themeContext);
    const darkMode = theme?.state?.darkMode;

    const profHandler = () => {
        window.location = `/profile/${params.id}`
    }

    return (
        <div className="Intro" id="Intro">
            {/* left name side */}
            <div className="i-left">
                <div className="i-name">
                    {/* yahan change hy darkmode ka */}
                    <span style={{ color: darkMode ? "white" : "" }}>Hy! I Am</span>
                    <span>{userdetails?.username}</span>
                    <span>
                        {userdetails?.bio}
                    </span>
                </div>
                <Link to="contact" smooth={true} spy={true}>
                    <button className="button i-button" onClick={profHandler}>Show CV</button>
                </Link>
                {/* social icons */}
                <div className="i-icons">
                    <img src={Github} alt="" />
                    <img src={LinkedIn} alt="" />
                    <img src={Instagram} alt="" />
                </div>
            </div>
            {/* right image side */}
            <div className="i-right">
                <img src={Vector1} alt="" />
                <img src={Vector2} alt="" />
                <img src={userdetails?.image?.url} className='item' height='100' width='300' alt="" />
                {/* animation */}
                <motion.img
                    initial={{ left: "-36%" }}
                    whileInView={{ left: "-24%" }}
                    transition={transition}
                    src={glassesimoji}
                    alt=""
                />

                <motion.div
                    initial={{ top: "-4%", left: "74%" }}
                    whileInView={{ left: "68%" }}
                    transition={transition}
                    className="floating-div"
                >
                    <FloatinDiv img={crown} text1={userdetails?.cv?.department?.label} />
                </motion.div>

                {/* animation */}
                <motion.div
                    initial={{ left: "9rem", top: "18rem" }}
                    whileInView={{ left: "0rem" }}
                    transition={transition}
                    className="floating-div"
                >
                    {/* floatinDiv mein change hy dark mode ka */}
                    <FloatinDiv img={thumbup} text1={userdetails?.cv?.collage?.label} />
                </motion.div>

                <div className="blur" style={{ background: "rgb(238 210 255)" }}></div>
                <div
                    className="blur"
                    style={{
                        background: "#C1F5FF",
                        top: "17rem",
                        width: "21rem",
                        height: "11rem",
                        left: "-9rem",
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Intro;