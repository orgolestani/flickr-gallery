import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import "./Image.scss";

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number,
    deleteHandler: PropTypes.func,
    index: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      rotation: 0,
    };
  }

  calcImageSize(galleryWidth) {
    //1500 / 200 =7.5 (8 rounded -reminder 100)
    const targetSize = 200;
    const imagesPerRow = (galleryWidth / targetSize);
    const reminder = galleryWidth % targetSize;
    const size = ((galleryWidth / imagesPerRow)+(reminder/imagesPerRow));
    console.log({ size, imagesPerRow, galleryWidth, reminder });
    this.setState({
      size,
    });
  }
  componentDidMount() {
    this.calcImageSize(this.props.galleryWidth);
  }
  componentWillReceiveProps(props) {
    this.calcImageSize(props.galleryWidth);
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }
  rotationHandler() {
    this.setState({ rotation: this.state.rotation + 90 });
  }

  render() {
    const { rotation } = this.state;
    return (
      <div
        className="image-root"
        style={{
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.state.size + "px",
          height: this.state.size + "px",
          transform: `rotate(${rotation}deg) scale(1, 1)`,
        }}
      >
        {/* check for css solution for background-only rotation */}
        <div style={{ transform: `rotate(${-rotation}deg)` }}>
          <FontAwesome
            className="image-icon"
            name="sync-alt"
            title="rotate"
            onClick={() => {
              this.rotationHandler();
            }}
          />
          <FontAwesome
            className="image-icon"
            name="trash-alt"
            title="delete"
            onClick={() => {
              this.props.deleteHandler(this.props.dto.id);
            }}
          />
          <FontAwesome
            className="image-icon"
            name="expand"
            title="expand"
            onClick={() => {
              this.props.expandHandler(this.props.index);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Image;
