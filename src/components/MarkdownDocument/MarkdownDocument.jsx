import classNames from "classnames";
import { connect } from "react-redux";
import { getFile } from "../../actions/docs";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./styles.css";

class MarkdownDocument extends PureComponent {
  constructor (props) {
    super(props);

    this.renderers = {
      Heading: this.renderHeading.bind(this),
      Link: this.renderLink.bind(this)
    };
    this.listenToUrl.bind(this);
  }

  componentDidMount () {
    let { history } = this.props;
    this.listenToUrl();
    window.onhashchange = () => {
      this.navigateToHash.bind(this);
    };
    this.componentDidUpdate();      // I know this is a really bad thing to do, but until React has some real callbacks
                                    // when the DOM is actually rendered, and not just in the virtual DOM's imagination,
                                    // this is the best I can come up with.
  }

  componentDidUpdate () {
    let { hashNav } = this.props;

    if (!hashNav)
      return;

    setTimeout(() => this.navigateToHash(), 0);
  }

  render () {
    let { className, markdown } = this.props;

    return <div className={classNames(className, styles.container)}>
      <ReactMarkdown renderers={this.renderers}
        source={markdown} />
    </div>;
  }
  
  renderHeading ({ level, children }) {
    var flatChildren = [];

    function flattenChildren (value) {
      if (typeof value === "string") {
        flatChildren.push(value);
      } else {
        value.props.children.forEach(function (a) {
          flattenChildren(a);
        });
      }
    }

    children.forEach(function (a) {
      flattenChildren(a);
    });

    var id = flatChildren.join();
    id = id.replace(new RegExp("\\s", "g"), "-").replace(
      new RegExp(/[^a-zA-Z0-0-]/g), "").replace(new RegExp("(-)*$"), "").toLowerCase();

    const renderHeader = (l, a, r) => {
      switch (l) {
        case 1:
          return <h1 id={r}>{a}</h1>;
        case 2:
          return <h2 id={r}>{a}</h2>;
        case 3:
          return <h3 id={r}>{a}</h3>;
        case 4:
          return <h4 id={r}>{a}</h4>;
        case 5:
          return <h5 id={r}>{a}</h5>;
        case 6:
          return <h6 id={r}>{a}</h6>;
      }
    };

    var header = renderHeader(level, children, id);
    return header;
  }

  renderLink ({ href, title, children }) {
    let { onLinkClick } = this.props;
    return <a href={href} onClick={onLinkClick} title={title}>{children}</a>;
  }

  navigateToHash () {
    if (window.location.hash.length > 0) {
      var self = this;
      window.requestAnimationFrame(function () {
        var name = window.location.hash.substr(1);
        var header = document.getElementById(name);

        if (header)
          self.scrollToHeader(name);
      });
    }
  }

  scrollToHeader (header) {
    document.getElementById(header).scrollIntoView();
  }

  listenToUrl () {
    let { getFile } = this.props;
    var self = this;
    var currentPathname = window.location.pathname;
    var currentHash = window.location.hash;

    setInterval(function () {
      if (currentPathname !== window.location.pathname) {
        currentPathname = window.location.pathname;
        getFile(window.location.pathname.split(".")[0].substring(1));
      }

      if (currentHash !== window.location.hash) {
        currentHash = window.location.hash;
        self.navigateToHash();
      }
    }, 100);
  }
}

MarkdownDocument.propTypes = {
  hashNav: PropTypes.bool,
  markdown: PropTypes.string,
  onLinkClick: PropTypes.func
};

export default connect(
  null,
  { getFile },
  null,
  { withRef: true }
)(MarkdownDocument);
