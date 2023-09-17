import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async ()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    // useEffect will do all the work as componentDidMount do in class based react component
    useEffect(()=>{
        document.title = `${capitalizeFirstLetter(props.category)} - NewsWave`;
        updateNews();
    }, []);  // dependency array is empty means it will execute one time only

    const fetchMoreData = async ()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country
        }&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    }

    return(
        <>
            <h1
                className="text-center"
                style={{margin: "30px 0px", marginTop:"80px"}}
            >
                NewsWave - Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>
            {loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}  // fetchMoreData function logic we have to write to fetch next or more data
                hasMore={articles.length !==totalResults}
                loader={<Spinner/>}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element)=>{
                            // It is basically running a loop over articles
                            return(
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title = {element.title? element.title.slice(0,45):""}
                                        description = { element.description ? element.description.slice(0, 88):""}
                                        imageUrl = {element.urlToImage}
                                        newsUrl = {element.url}
                                        author = {element.author}
                                        date = {element.publishedAt}
                                        source = {element.source.name}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
}

News.defaultProps = {
    pageSize: 8,
    country: "in",
    category: "general"
}

News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
}

export default News;