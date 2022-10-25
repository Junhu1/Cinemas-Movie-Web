import { Col } from 'antd';
import React from 'react';
import './index.css';


export default class MovieItems extends React.Component {

    render(){
        return(
            <Col xxl={5} xl={5} lg={10} sm={20} xs={20} className = 'MovieItems' >

            {
                this.props.poster_path ?
                <img src={`https://image.tmdb.org/t/p/w500${this.props.poster_path}`} alt='' />
                :null
            }

            <div>
               <h5>AName:{this.props.title}</h5>
               <h5>Release Date: {this.props.release_date}</h5>
               <h5>Vote Average: {this.props.vote_average}</h5>
            </div>

            </Col>
        )
    }
}