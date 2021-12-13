import React, { useEffect, useState } from 'react'
import Newsitems from './Newsitems'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    const updateNews = async ()=> {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=15`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(70);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `RealNews- ${capitalizeFirstLetter(props.category)}`;
        updateNews(); // eslint-disable-next-line
    },[])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=15`;
        setPage(page + 1)
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
    };
        return (
            <>
                <div className="d-flex justify-content-center">
                    <h2 className="mt-5 mb-4">RealNews - "Read All The Top Headlines At One Place"</h2>

                        {loading && <div className="d-flex align-items-end" style={{ position: 'absolute',top:'85px' }}><div className="spinner-border text-warning m-3" role="status">
                            <span className="sr-only"></span>
                        </div></div>}
                </div>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<div className="d-flex justify-content-center"><div className="spinner-border text-warning m-3" role="status">
                        <span className="sr-only"></span>
                    </div></div>}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
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

News.defaultProps = {
    country: "in",
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
}
export default News
