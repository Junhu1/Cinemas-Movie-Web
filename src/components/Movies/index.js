import {Col, Row, Spin, Radio, Pagination} from 'antd';
import React from 'react';
import MovieItems from './MovieItems';
import './index.css'


export default class Movies extends React.Component{

    state = {
        movies: [],
        movieType: 'now_playing',
        pageIndex: 1,
        totalPages: 0,
        totalResults: 0,
        isLoading:false,

    }

    refreshData=(type, page)=>{
        this.setState({isLoading:true, movies:[]})
        fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=04b256f451c0e618b5735841206fdedc&page=${page}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            this.setState({
                isLoading: false,
                movies: data.results,
                totalPages: data.total_pages,
                totalResults: data.total_results,
                pageIndex: data.page,
            });
        });
    }

    componentDidMount() {
        this.refreshData(this.state.movieType, this.state.pageIndex);
    }

    onChange = e => {
        this.setState({movieType: e.target.value, pageIndex: 1 });
        this.refreshData(e.target.value, 1);
    };

    pageChange = (page) => {
        this.setState({pageIndex: page});
        this.refreshData(this.state.movieType, page);
    }
   
    getInfo = () => {
        let result = [];
        let rows = [];

        if(this.state.movies) {
            let rowObj = [];
            for(let i = 0; i < this.state.movies.length; i++) {
                rowObj.push(<MovieItems key={this.state.movies[i].id} {...this.state.movies[i]} />);

                if(rowObj.length === 4) {
                    result.push(rowObj);
                    rowObj = [];
                }
            } 

            for(let i = 0; i < result.length; i++) {
                rows.push(
                    <Row justify="center" key={i}>
                        {result[i]};
                    </Row>
                    )
            }
            console.log("xxxxxx", rows);
            return rows;
        }
        else {
            return null;
        }
    }

    render() {
        return(
            <div className='Movies'>
                <Spin spinning={this.state.isLoading} >
                    <Row justify="center">
                      <Col sm={22} md={21} className="search">
                        <Radio.Group onChange={this.onChange} value={this.state.movieType}>
                        <Radio value={'now_playing'}>Now Playing</Radio>
                        <Radio value={'popular'}>Popular</Radio>
                        <Radio value={'top_rated'}>Top Rated</Radio>
                        <Radio value={'upcoming'}>Upcoming</Radio>
                        </Radio.Group>
                      </Col>
                    </Row>

                    <Row justify="center">
                        <Col sm={22} md={21} className="search">
                            {this.state.movies ?
                            <Pagination 
                             current={this.state.pageIndex}
                             total={this.state.totalResults}s
                             defaultPageSize={20}
                             showSizeChanger={false}
                             onChange={this.pageChange}
                            />
                            :null
                            }
                        </Col>
                    </Row>
                
                {this.getInfo()}

                </Spin>
            </div>
        )
    }
}