import React, { Component } from 'react'
import Newsitems from './Newsitems'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: "in",
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `RealNews- ${this.capitalizeFirstLetter(this.props.category)}`;
    }
    async UpdateNews() {
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=15`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false });
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.UpdateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=15`;

        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: this.state.articles.concat(parseData.articles), totalResults: parseData.totalResults });
    }
    render() {
        return (
            <>
                <div className="d-flex justify-content-center">
                    <h2 className="mt-5 mb-4">RealNews - "Read All The Top Headlines At One Place"</h2>

                        {this.state.loading && <div className="d-flex align-items-end" style={{ position: 'absolute',top:'85px' }}><div className="spinner-border text-warning m-3" role="status">
                            <span className="sr-only"></span>
                        </div></div>}
                    


                </div>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<div className="d-flex justify-content-center"><div className="spinner-border text-warning m-3" role="status">
                        <span className="sr-only"></span>
                    </div></div>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
