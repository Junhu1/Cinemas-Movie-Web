import { render } from '@testing-library/react';
import React from 'react';
import {List, Rate} from 'antd';


export default class ListItem extends React.Component {
    render(){
        return (
            <div className="ListItem">

                {
                    this.props.poster_path ?
                    <img style = {{witdth:"150px", height:"300px", float:"left"}} src={`https://image.tmdb.org/t/p/w500${this.props.poster_path}`} alt="Not found" />
                    :null
                }

                    <div style={{Marginleft:0, height: "300px"}}>
                        <h3 style={{color: "white"}}>Name: {this.props.title}</h3>
                        <h3 style={{color: "white"}}>Release Date: {this.props.release_date}</h3>
                        <h3 style={{color: "white"}}>Review:<Rate allowHalf defaultValue={parseInt(this.props.vote_average) /2} /></h3>
                    </div>

            </div>
 

        )
    }
}