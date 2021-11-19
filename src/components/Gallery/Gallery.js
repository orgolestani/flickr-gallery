import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Image from "../Image";
import ExpandedImage from "../Image";
import "./Gallery.scss";

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
    };
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  getGalleryWidth() {
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }
  getImages(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&nojsoncallback=1`;
    const baseUrl = "https://api.flickr.com/";
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: "GET",
    })
      .then((res) => res.data)
      .then((res) => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          this.setState({ images: res.photos.photo });

          console.log(this.state.images[0])
        }
      });
  }

  componentDidMount() {
    this.getImages(this.props.tag);
    this.setState({
      galleryWidth: document.body.clientWidth,
    });
  }

  componentWillReceiveProps(props) {
    this.getImages(props.tag);
  }
  deleteHandler(imageId) {
    let imageRemovedArr = this.state.images.filter(
      (image) => image.id !== imageId
    );
    this.setState({ images: imageRemovedArr });
  }

  render() {
    return (
      <div>
        <div className="gallery-root">
          {/* <ExpandedImage
            dto={this.state.images[0]}
            galleryWidth={this.state.galleryWidth}
          /> */}
          {this.state.images.map((dto) => {
            return (
              <Image
                key={"image-" + dto.id}
                dto={dto}
                galleryWidth={this.state.galleryWidth}
                deleteHandler={this.deleteHandler}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Gallery;
