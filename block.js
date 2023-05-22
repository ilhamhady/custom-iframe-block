const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { TextControl, PanelBody } = wp.components;

registerBlockType("custom-iframe-block/iframe", {
  title: "Custom Iframe Block",
  icon: "format-video",
  category: "embed",
  attributes: {
    url: {
      type: "string",
    },
    width: {
      type: "number",
      default: 750,
    },
    aspectRatio: {
      type: "string",
      default: "16/9",
    },
  },
  edit({ attributes, setAttributes }) {
    const { url, width, aspectRatio } = attributes;

    const aspectRatioArr = aspectRatio.split("/");
    // Calculate padding-top value for the responsive aspect ratio
    const paddingTop = `${
      (1 / (aspectRatioArr[0] / aspectRatioArr[1])) * 100
    }%`;

    return (
      <div>
        <InspectorControls>
          <PanelBody title="Iframe Settings">
            <TextControl
              label="URL"
              value={url}
              onChange={url => {
                const isValidURL = url.match(
                  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
                );
                if (isValidURL) {
                  setAttributes({ url });
                } else {
                  alert(
                    "The URL you entered is not valid. Please enter a valid URL."
                  );
                }
              }}
            />
            <TextControl
              label="Width"
              value={width}
              onChange={width => setAttributes({ width: parseInt(width, 10) })}
            />
            <TextControl
              label="Aspect Ratio"
              value={aspectRatio}
              onChange={aspectRatio => setAttributes({ aspectRatio })}
            />
          </PanelBody>
        </InspectorControls>
        {url && (
          <div style={{ position: "relative", overflow: "hidden", paddingTop }}>
            <iframe
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              src={url}
            />
          </div>
        )}
      </div>
    );
  },
  save({ attributes }) {
    const { url, width, aspectRatio } = attributes;

    const aspectRatioArr = aspectRatio.split("/");
    // Calculate padding-top value for the responsive aspect ratio
    const paddingTop = `${
      (1 / (aspectRatioArr[0] / aspectRatioArr[1])) * 100
    }%`;

    return (
      url && (
        <div style={{ position: "relative", overflow: "hidden", paddingTop }}>
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src={url}
          />
        </div>
      )
    );
  },
});
