import classNames from "classnames";
import { connect } from "react-redux";
import { getFile, getToc } from "../../actions/docs";
import MarkdownDocument from "../../components/MarkdownDocument";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styles from "./styles.css";

class TableOfContents extends PureComponent {
  componentDidMount () {
    let { getToc } = this.props;
    getToc();
  }

  render () {
    let { className, markdown } = this.props;
    return <div className={classNames(className, styles.container, styles.vertical)}>
      <span className={styles.header}>Table of contents</span>
      <MarkdownDocument markdown={markdown}
        onLinkClick={this.onLinkClick.bind(this)} />
    </div>;
  }

  onLinkClick (event) {
    event.preventDefault();
    window.history.pushState(null, null, event.currentTarget.pathname.split(".")[0]);
  }
}

export default connect(
  (state) => ({
    markdown: state.docs.toc
  }),
  { getFile, getToc }
)(TableOfContents);
