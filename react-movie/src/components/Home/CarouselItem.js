import React from 'react';
import {Image} from 'antd';
import './index.css';


export default class CarouselItem extends React.Component {
    render(){

        return (
        <div className="Carousel">
                 <Image src={this.props.src} />
                 <div className="CarouselDes"><p>{this.props.title}</p></div>
        </div>
        )

    }
}