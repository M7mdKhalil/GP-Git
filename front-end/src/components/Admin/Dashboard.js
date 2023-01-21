import { Avatar, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFetch } from "use-http";
import Container from "../Container";
import "./Dashboard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import AddModeratorRoundedIcon from "@mui/icons-material/AddModeratorRounded";
import AdminSideBar from "./AdminSidBar";
import InputArea from "../UI/InputArea";
import { PrimaryButton } from "../UI/CustomButton";

const Dashboard = () => {
  const { get,post,del } = useFetch("http://localhost:5000");
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [searchedCompanies, setSearchedCompanies] = useState("");
  const [showCompanies, setShowCompanies] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      const allcompanies = await get("/user/allcompanies");
      const allusers = await get("/user/allusers");
      const alloffers = await get("/offer");
      if (search == "") setCompanies(allcompanies);
      if (search == "") setUsers(allusers);
      if (search == "") setOffers(alloffers);
    };
    getAllUsers();
  }, [search]);

  const getSearchRes = async () => {
    const searchCom = await companies?.filter((item) => {
      return item.username.toLowerCase().includes(search.toLowerCase());
    });
    if (searchCom.length > 0 && showCompanies) setCompanies(searchCom);

    const searchUser = await users?.filter((item) => {
      return item.username.toLowerCase().includes(search.toLowerCase());
    });
    if (searchUser.length > 0 && showUsers) setUsers(searchUser);

    const searchOffer = await offers?.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    if (searchOffer.length > 0 && showOffers) setOffers(searchOffer);
  };

  useEffect(() => {
    getSearchRes();
  }, [search]);

  return (
    <div className="dashboard">
      <div className="app-container">
        <div className="app-header">
          <div className="app-header-left">
            <span className="app-icon" />
            <p className="app-name">Portfolio</p>
            <div className="search-wrapper">
              <input
                className="search-input"
                type="text"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="feather feather-search"
                viewBox="0 0 24 24"
              >
                <defs />
                <circle cx={11} cy={11} r={8} />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>
          <div className="app-header-right">
            <button className="mode-switch" title="Switch Theme">
              <svg
                className="moon"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <defs />
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </button>
            <button className="add-btn" title="Add New Project">
              <svg
                className="btn-icon"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={12} y1={5} x2={12} y2={19} />
                <line x1={5} y1={12} x2={19} y2={12} />
              </svg>
            </button>
            <button className="notification-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bell"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <button className="profile-btn">
              <img src="https://assets.codepen.io/3306515/IMG_2025.jpg" />
              <span>Aybüke C.</span>
            </button>
          </div>
          <button className="messages-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-message-circle"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
        </div>
        <div className="app-content">
          <AdminSideBar active="dashboard"/>
          <div className="projects-section">
            <div className="projects-section-header">
              <p>Dashboard</p>
              <p className="time">
                <TextField
                  label="Search"
                  sx={{ width: 300, borderRadius: "50px" }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon></SearchIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              </p>
            </div>
            <div className="projects-section-line">
              <div className="projects-status">
                <div
                  className="item-status"
                  style={{
                    borderBottom: `${
                      showCompanies ? "2px solid var(--primary)" : "none"
                    }`,
                  }}
                  onClick={() => {
                    setShowCompanies(true);
                    setShowUsers(false);
                    setShowOffers(false);
                  }}
                >
                  <span className="status-number">{companies?.length}</span>
                  <span className="status-type">Company</span>
                </div>
                <div
                  className="item-status"
                  style={{
                    borderBottom: `${
                      showUsers ? "2px solid var(--primary)" : "none"
                    }`,
                  }}
                  onClick={() => {
                    setShowCompanies(false);
                    setShowUsers(true);
                    setShowOffers(false);
                  }}
                >
                  <span className="status-number">{users?.length}</span>
                  <span className="status-type">Job seeker</span>
                </div>
                <div
                  className="item-status"
                  style={{
                    borderBottom: `${
                      showOffers ? "2px solid var(--primary)" : "none"
                    }`,
                  }}
                  onClick={() => {
                    setShowCompanies(false);
                    setShowUsers(false);
                    setShowOffers(true);
                  }}
                >
                  <span className="status-number">{offers?.length}</span>
                  <span className="status-type">Offer</span>
                </div>
              </div>
              <div className="view-actions">
                <button className="view-btn list-view active" title="List View">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-list"
                  >
                    <line x1={8} y1={6} x2={21} y2={6} />
                    <line x1={8} y1={12} x2={21} y2={12} />
                    <line x1={8} y1={18} x2={21} y2={18} />
                    <line x1={3} y1={6} x2="3.01" y2={6} />
                    <line x1={3} y1={12} x2="3.01" y2={12} />
                    <line x1={3} y1={18} x2="3.01" y2={18} />
                  </svg>
                </button>
                <button className="view-btn grid-view" title="Grid View">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-grid"
                  >
                    <rect x={3} y={3} width={7} height={7} />
                    <rect x={14} y={3} width={7} height={7} />
                    <rect x={14} y={14} width={7} height={7} />
                    <rect x={3} y={14} width={7} height={7} />
                  </svg>
                </button>
              </div>
            </div>
            {/* cards list ------------------------------------------------------------------------------------------------- */}
            {showCompanies && (
              <div className="project-boxes jsListView">
                {companies?.map((company) => {
                  return (
                    <div
                      className="project-box-wrapper"
                      key={company._id}
                      onClick={() => {
                        window.location = `/intro/${company._id}`;
                      }}
                    >
                      <div
                        className="project-box"
                        style={{ backgroundColor: "#fee4cb" }}
                      >
                        <div className="project-box-header">
                          <div className="more-wrapper">
                            <span style={{ marginRight: "20px" }}>
                              {company.location}
                            </span>
                            <span>
                              {company.createdat.toString().substring(0, 10)}
                            </span>
                          </div>
                          <Avatar src={company.image?.url}>
                            {company.username[0]}
                          </Avatar>
                          <div className="project-box-content-header">
                            <p className="box-content-header">
                              {company.username}
                            </p>
                            <p className="box-content-subheader">
                              {company.email}
                            </p>
                          </div>
                        </div>
                        <div className="box-progress-wrapper">
                          <p className="box-progress-header">Offers</p>
                          <div className="box-progress-bar">
                            <span
                              className="box-progress"
                              style={{
                                width: `${
                                  (company.offers?.length / 20) * 100
                                }%`,
                                backgroundColor: "#ff942e",
                              }}
                            />
                          </div>
                          <p className="box-progress-percentage">
                            {company.offers?.length}
                          </p>
                        </div>
                        <div className="project-box-footer">
                          <div
                            className="days-left"
                            style={{
                              color: "#ff942e",
                              marginTop: "40px",
                              marginLeft: "40px",
                              padding: "0",
                            }}
                          >
                            <IconButton
                              aria-label="delete"
                                          onClick={async () => {
                                              const _id = company?._id;
                                  const user = await del(`/user/delete/${_id}`);
                                  navigate('/dashboard');
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* ------------------------------------------------------------------------------------------------- */}

            {showUsers && (
              <div className="project-boxes jsListView">
                {users?.map((company) => {
                  return (
                    <div
                      className="project-box-wrapper"
                      key={company._id}
                      onClick={() => {
                        window.location = `/intro/${company._id}`;
                      }}
                    >
                      <div
                        className="project-box"
                        style={{ backgroundColor: "#dbf6fd" }}
                      >
                        <div className="project-box-header">
                          <div className="more-wrapper">
                            <span style={{ marginRight: "20px" }}>
                              {company.location}
                            </span>
                            <span>
                              {company.createdat.toString().substring(0, 10)}
                            </span>
                          </div>
                          <Avatar src={company.image?.url}>
                            {company.username[0]}
                          </Avatar>
                          <div className="project-box-content-header">
                            <p className="box-content-header">
                              {company.username}
                            </p>
                            <p className="box-content-subheader">
                              {company.email}
                            </p>
                          </div>
                        </div>
                        <div className="box-progress-wrapper">
                          <p className="box-progress-header">Offers Applied</p>
                          <div className="box-progress-bar">
                            <span
                              className="box-progress"
                              style={{
                                width: `${
                                  (company.offers?.length / 20) * 100
                                }%`,
                                backgroundColor: "#096c86",
                              }}
                            />
                          </div>
                          <p className="box-progress-percentage">
                            {company.offers?.length}
                          </p>
                        </div>
                        <div className="project-box-footer">
                          <div
                            className="days-left"
                            style={{
                              color: "#ff942e",
                              marginTop: "40px",
                              marginLeft: "40px",
                              padding: "0",
                            }}
                                  >
                                      <IconButton aria-label="delete" onClick={async () => {
                                          const _id = company?._id;
                                          const user = await del (`/user/delete/${_id}`);
                                          navigate('/dashboard');
                                      }} >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* ------------------------------------------------------------------------------------------------- */}

            {showOffers && (
              <div className="project-boxes jsListView">
                {offers?.map((offer) => {
                  return (
                    <div
                      className="project-box-wrapper"
                      key={offer._id}
                      onClick={() => {
                        window.location = `/offer/${offer._id}`;
                      }}
                    >
                      <div
                        className="project-box"
                        style={{ backgroundColor: "#e9e7fd" }}
                      >
                        <div className="project-box-header">
                          <div className="more-wrapper">
                            <span style={{ marginRight: "20px" }}>
                              {offer.location}
                            </span>
                            <span>{offer.date}</span>
                          </div>
                          <Avatar src={offer.author?.image?.url}>
                            {offer.author[0]}
                          </Avatar>
                          <div className="project-box-content-header">
                            <p className="box-content-header">{offer.title}</p>
                            <p className="box-content-subheader">
                              {offer.auther?.username}
                            </p>
                          </div>
                        </div>
                        <div className="box-progress-wrapper">
                          <p className="box-progress-header">Appliers</p>
                          <div className="box-progress-bar">
                            <span
                              className="box-progress"
                              style={{
                                width: `${
                                  (offer.appliers?.length / 20) * 100
                                }%`,
                                backgroundColor: "#4f3ff0",
                              }}
                            />
                          </div>
                          <p className="box-progress-percentage">
                            {offer.appliers?.length}
                          </p>

                          {/* accepted */}

                          <p className="box-progress-header">
                            Accepted Appliers
                          </p>
                          <div className="box-progress-bar">
                            <span
                              className="box-progress"
                              style={{
                                width: `${
                                  (offer.acceptedAppliers?.length /
                                    offer.appliers.length) *
                                  100
                                }%`,
                                backgroundColor: "#4f3ff0",
                              }}
                            />
                          </div>
                          <p className="box-progress-percentage">
                            {offer.acceptedAppliers?.length}
                          </p>

                          {/* rejected  */}

                          <p className="box-progress-header">
                            Rejected Appliers
                          </p>
                          <div className="box-progress-bar">
                            <span
                              className="box-progress"
                              style={{
                                width: `${
                                  (offer.regectedAppliers?.length /
                                    offer.appliers.length) *
                                  100
                                }%`,
                                backgroundColor: "#4f3ff0",
                              }}
                            />
                          </div>
                          <p className="box-progress-percentage">
                            {offer.regectedAppliers?.length}
                          </p>
                        </div>
                        <div className="project-box-footer">
                          <div
                            className="days-left"
                            style={{
                              color: "#ff942e",
                              marginTop: "40px",
                              marginLeft: "40px",
                              padding: "0",
                            }}
                          >
                                      <IconButton aria-label="delete" onClick={async () => {
                                          const _id = offer?._id;
                                          const user = await del(`/offer/delete/${_id}`);
                                  navigate('/dashboard');}}>
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* ------------------------------------------------------------------------------------------------- */}
          </div>
          <div className="messages-section">
            <button className="messages-close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x-circle"
              >
                <circle cx={12} cy={12} r={10} />
                <line x1={15} y1={9} x2={9} y2={15} />
                <line x1={9} y1={9} x2={15} y2={15} />
              </svg>
            </button>
            <div className="projects-section-header">
              <p>Task Manager</p>
            </div>
            <div className="messages">
              <div className="message-box">
                <AddModeratorRoundedIcon />
                <div className="message-content">
                  <div className="message-header">
                    <div className="name">Add Anouncment</div>
                    <div className="star-checkbox">
                      <input type="checkbox" id="star-1" />
                      <label htmlFor="star-1"></label>
                    </div>
                  </div>
                  <p className="message-line">
                    <InputArea placeholder="write your message here to publish..."/>
                  </p>
                  <p className="message-line time">
                    <PrimaryButton>post</PrimaryButton>
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
