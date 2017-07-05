import classNames from "classnames";
import { connect } from "react-redux";
import { getFile } from "../../actions/docs";
import MarkdownDocument from "../../components/MarkdownDocument";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styles from "./styles.css";

class Content extends PureComponent {
  componentDidMount () {
    let { getFile } = this.props;
  }

  render () {
    let { className, markdown } = this.props;
    return <div className={classNames(className, styles.container, styles.vertical)}>
      <MarkdownDocument className={styles.document}
        hashNav
        markdown={markdown}
        onLinkClick={this.onLinkClick.bind(this)}
        ref={(e) => { this.markdownDoc = e; }} />
    </div>;
  }

  onLinkClick (event) {
    event.preventDefault();

    if (event.currentTarget.pathname !== location.pathname) {
      window.history.pushState(null, null, event.currentTarget.pathname.split(".")[0])
    }

    history.pushState(null, null, event.currentTarget.hash);
  }
}

export default connect(
  (state) => ({
    markdown: state.docs.markdown
  }),
  { getFile }
)(Content);
