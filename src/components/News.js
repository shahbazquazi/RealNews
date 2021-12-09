import React, { Component } from 'react'
import Newsitems from './Newsitems'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps ={
        country: "in",
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5960a4a74b1b45d1a4aeab12372a951f&page=1&pagesize=18`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false });
    }
    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5960a4a74b1b45d1a4aeab12372a951f&page=${this.state.page - 1}&pagesize=18`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();

        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    };
    handleNextClick = async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5960a4a74b1b45d1a4aeab12372a951f&page=${this.state.page + 1}&pagesize=18`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parseData = await data.json();

            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            });
        

    };
    render() {
        return (
            <div className="container my-3">

                <div className="d-flex justify-content-center">
                    <h2 className="my-3">RealNews - "Read All The News At One Place"</h2>

                    {this.state.loading && <div className="spinner-border text-warning m-3" role="status">
                        <span className="sr-only"></span>
                    </div>}
                </div>

                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-center">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-warning" onClick={this.handlePreviousClick}>	&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 18)} type="button" className="btn btn-warning mx-3" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>
            </div>
        )
    }
}

export default News
