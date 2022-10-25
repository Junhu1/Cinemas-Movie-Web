import React from 'react';
import {Select, Input, Spin, Pagination, Row, Col} from 'antd';
import MovieItems from '../Movies/MovieItems';

const { Option } = Select;
const { Search } = Input;

export default class SearchMovie extends React.Component{
    state = {
        movies: [],
        isLoading: false, 
        searchType: 'movie',
        searchVal:'',
        pageSize: 20,
        pageIndex: 1,
        totalPages: 0,
        totalResults: 0,
    }

    handleChange = (value) => {
        console.log(value);
        this.setState({ searchType: value, movies: null, searchVal:'', totalPages: 0, totalResults: 0, pageIndex: 1});
    }

    onSearch = (value) => {
      if(value) {
        this.setState({searchVal: value});
        this.refreshData(this.state.searchType, value, 1)
      }
    }

    refreshData = (type, value, page) => {
      console.log('xxx', type, value, page)
    
      this.setState({isLoading: true, movies: []});
    
      fetch(`https://api.themoviedb.org/3/search/${type}?api_key=04b256f451c0e618b5735841206fdedc&query=${value}&page=${page}`)
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
          pegeIndex: data.page,
        });
      });
    }

    pageChange = (page, pageSize) => {
      this.setState({pageIndex: page});
      this.refreshData(this.state.searchType, this.state.searchVal, page)
    }

    getRow = () => {
      let result = [];
      let rows = [];
    
      if(this.state.movies) {
        let rowObj = [];
    
        for(let i = 0; i < this.state.movies.length; i++) {
          rowObj.push(<MovieItems key={this.state.movies[i].id} {...this.state.movies[i]} />);
    
          if(rowObj.length === 4 ) {
            result.push(rowObj);
            rowObj = [];
          }
        }
        console.log(result);
    
        for(let i = 0; i < result.length; i++) {
          rows.push(
            <Row justify="center" key={i}>
              {result[i]}
            </Row>
          );
        }
        console.log('xxxx', rows);
        return rows;
      }
      else {
        return null;
      }
    }
  
    render() {

        return(
            <div className="movies">
                <Spin spinning={this.state.isLoading} />

                <Select defaultValue="movie" style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="movie">Movie</Option>
                <Option value="tv">TV show</Option>
                </Select>

                <Search placeholder="input search text" onSearch={this.onSearch} style={{ width: 200 }} />

                <Pagination 
                current={this.state.pageIndex}
                total={this.state.totalResults}
                defaultPageSize={20} 
                showSizeChanger={false}
                onChange={this.pageChange}
                />
                
                <Row justify="center">
                  <Col sm={22} md={21} className="search">
                    {this.getRow()}
                  </Col>
                </Row>

            </div>
        )
        }
}