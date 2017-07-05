import { RECEIVE_DOCS,
  RECEIVE_TOC,
  REQUEST_DOCS,
  REQUEST_TOC } from "./types";

export function getFile (name) {
  return (dispatch) => {
    dispatch(requestDocs(name));
    const tocUrl = "http://localhost:3998/documentation/" + name;
    fetch(tocUrl, { method: "GET" })
      .then((data) => {
        var reader = data.body.getReader();
        var markdown = "";
        var decoder = new TextDecoder();

        function parse () {
          reader.read()
            .then(function (result) {
              markdown += decoder.decode(result.value || new Uint8Array(), { stream: !result.done });

              if (result.done) dispatch(receiveDocs(markdown));
              else return parse();
            });
        }

        return parse();
      });
  };
}

export function getToc () {
  return (dispatch) => {
    dispatch(requestToc());
    const tocUrl = "http://localhost:3998/documentation/toc";
    fetch(tocUrl, { method: "GET" })
      .then((data) => {
        var reader = data.body.getReader();
        var markdown = "";
        var decoder = new TextDecoder();

        function parse () {
          reader.read()
            .then(function (result) {
              markdown += decoder.decode(result.value || new Uint8Array(), { stream: !result.done });

              if (result.done) dispatch(receiveToc(markdown));
              else return parse();
            });
        }

        return parse();
      });
  };
}

export function receiveDocs (markdown) {
  return {
    markdown,
    type: RECEIVE_DOCS
  };
}

export function receiveToc (markdown) {
  return {
    markdown,
    type: RECEIVE_TOC
  };
}

export function requestDocs (fileName) {
  return {
    fileName,
    type: REQUEST_DOCS
  };
}

export function requestToc () {
  return {
    type: REQUEST_TOC
  };
}
