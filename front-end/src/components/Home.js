import Card from "./Card"
import Container from "./Container"
import SideBar from "./SideBar"

const Home = ()=>{
    return <div className="main-content">
    <SideBar/>
    <Container>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Container>
    {/* <p>{!data ? "Loading..." : data}</p> */}
  </div>
}

export default Home