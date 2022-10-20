import React from 'react'
import '../node_modules/antd/dist/antd.min.css';
import {Layout, Menu,Row} from 'antd';
import Icon from '@ant-design/icons';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import SearchMovie from './components/SearchMovie';


const { Content, Header} = Layout;

function App() {

  return(
    <Router>
    <Layout>
       <Header style={{ Margin : 0, padding : 0 }}>
       <Row justify="center" align="top">
       <Icon component={() => (<img src={'favicon.ico'} height = "60" />)} />

      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/Home" ></Link>Home</Menu.Item>
        <Menu.Item key="2"><Link to="/Movies"></Link>Movies</Menu.Item>
        <Menu.Item key="3"><Link to="/SearchMovie"></Link>Search</Menu.Item>
      </Menu>
      
      </Row>
    </Header >
    
      <Content>
          <Routes>
            <Route exact path = "/Home" element={<Home />}></Route>
            <Route exact path = "/Movies" element={<Movies />}></Route>
            <Route exact path = "/SearchMovie" element={<SearchMovie />}></Route>
          </Routes>
      </Content>

    </Layout>

    </Router>
  )
  
}

export default App;
 
