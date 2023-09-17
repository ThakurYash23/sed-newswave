const NewsItem = (props)=>{
    let { title, description, imageUrl, newsUrl, author, date, source} = props;  // this is called destructuring in Java Script 

    // let d = new Date(data);
    // console.log(d);
    // console.log(d.toUTCString);
    // let datefunc = (date)=>{
    //     dateFormat(date, "dddd, mmmm dS, yyyy")
    // }

    return(
        <div className="my-3">
            <div className="card">
                <div style={{
                    display:"flex",
                    justifyContent:"flex-end",
                    position:"absolute",
                    right:"0"
                }}>
                    <span className="badge rounded-pill bg-danger">{source}</span>
                </div>
                <img
                    src={!imageUrl
                    ? "https://assets.sentinelassam.com/h-upload/2023/09/16/480225-aditya.webp"
                    : imageUrl
                }
                    className="card-img-top"
                    alt="..."
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">
                        <small className="text-muted">
                            By {!author ? "Unknown" : author} on {date}
                        </small>
                    </p>
                    <a
                        href={newsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-dark" 
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    )
}
export default NewsItem;