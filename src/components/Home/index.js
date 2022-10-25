import React from "react";
import './index.css'
import { Carousel, Spin, Row, Col, List } from 'antd';
import CarouselItem from './CarouselItem';
import ListItem from './ListItem';

export default class Home extends React.Component{
  state = {
    movies: [],
    isLoading: false,
}

  getMovies = () => {
    if(this.state.movies) {
        let result = this.state.movies.map(x => {
            return <CarouselItem
            key={x.id}
            src={`https://image.tmdb.org/t/p/original${x.backdrop_path}`}
            title = {x.title}
            />
        });
        return result;
    }
        else{
            return null;
        }
    }

    componentDidMount() {
      this.setState({isLoading: true});
      fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=04b256f451c0e618b5735841206fdedc&page=1')
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          console.log(data);
          this.setState({
              isLoading: false, 
              movies:data.results,
          })
      })
      .catch(error => {
          console.log(error);
      }
      )
  }


    render() {
        return (
          <div className='Home'>

          <Spin spinning={this.state.isLoading} />
          <Row  justify={"center"} >
              <Col sm={24} xs={24} lg={13} >

                <Carousel autoplay>
                    {this.getMovies()}
                </Carousel>
                </Col>
          </Row>

          
          <List
              itemLayout="vertical"
              size="large"
              dataSource={this.state.movies}
              renderItem={item => (
                  <List.Item key={item.id}>                      
                      <ListItem {...item} />
                  </List.Item>                
              )}
            />

          </div>
        )
        
    }
}