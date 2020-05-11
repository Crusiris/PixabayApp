import React from 'react'

const Image = ({image}) => {
    //Destructurin
    const {largeImageURL, likes, previewURL, tags, views } = image;
    return (  
        <div className=" col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img src={ previewURL } alt={tags} className="card-img-top"/>
           
                <div className="card-body">

                    <p className="card-text">{likes} Me gusta</p>
                    <p className="card-text">{views} Vistas</p>

                </div>
                <div className="card-footer">
                    <a
                        target="blank"
                        rel="noopener noreferrer"
                        className="btn btn-danger btn-block"
                        href={largeImageURL}
                        >Ver imagen</a>
                </div>
            </div>

        </div>
    );
}
 
export default Image;