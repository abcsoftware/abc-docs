import classNames from "classnames";
import { connect } from "react-redux";
import Content from "../modules/Content";
import React, { PureComponent } from "react";
import { setWindowWidth } from "../actions/ui";
import styles from "./styles.css";
import TableOfContents from "../modules/TableOfContents";

class Container extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      tocOpen: false
    };
  }

  componentDidMount () {
    let { setWindowWidth } = this.props;
    setWindowWidth(window.innerWidth);
  }

  render () {
    let { size } = this.props;
    let { tocOpen } = this.state;

    var tocClasses = classNames(styles.tocPane,
      size === "small" && styles.overlay,
      size === "small" && tocOpen && styles.open
    );

    return <div className={classNames(styles.fill, styles.horizontal)}>
      <TableOfContents className={tocClasses} />
      <Content />
      {size === "small" && 
        <div className={styles.tocButton}
          onClick={this.onTocButtonClick.bind(this)}>
          <svg x="0px" y="0px" viewBox="0 0 50 50" style={{ margin: 12 }}>
            <path d="M 43 7 C 42.448 7 42 7.447 42 8 L 42 12 C 42 12.553 42.448 13 43 13 L 47 13 C 47.552 13 48 12.553 48 12 L 48 8 C 48 7.447 47.552 7 47 7 L 43 7 z M 4 8 A 2.0002 2.0002 0 1 0 4 12 L 36 12 A 2.0002 2.0002 0 1 0 36 8 L 4 8 z M 43 17 C 42.448 17 42 17.447 42 18 L 42 22 C 42 22.553 42.448 23 43 23 L 47 23 C 47.552 23 48 22.553 48 22 L 48 18 C 48 17.447 47.552 17 47 17 L 43 17 z M 4 18 A 2.0002 2.0002 0 1 0 4 22 L 36 22 A 2.0002 2.0002 0 1 0 36 18 L 4 18 z M 43 27 C 42.448 27 42 27.448 42 28 L 42 32 C 42 32.552 42.448 33 43 33 L 47 33 C 47.552 33 48 32.552 48 32 L 48 28 C 48 27.448 47.552 27 47 27 L 43 27 z M 4 28 A 2.0002 2.0002 0 1 0 4 32 L 36 32 A 2.0002 2.0002 0 1 0 36 28 L 4 28 z M 43 37 C 42.448 37 42 37.448 42 38 L 42 42 C 42 42.552 42.448 43 43 43 L 47 43 C 47.552 43 48 42.552 48 42 L 48 38 C 48 37.448 47.552 37 47 37 L 43 37 z M 4 38 A 2.0002 2.0002 0 1 0 4 42 L 36 42 A 2.0002 2.0002 0 1 0 36 38 L 4 38 z" color="#000" fontWeight="400" fontFamily="sans-serif" overflow="visible">
            </path>
          </svg>
        </div>}
    </div>;
  }

  onTocButtonClick () {
    this.setState({
      tocOpen: !this.state.tocOpen
    });
  }
}

export default connect(
  (state) => ({
    size: state.ui.windowSize.width < 800 ? "small" : "large"
  }),
  { setWindowWidth }
)(Container);
