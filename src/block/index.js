const { registerBlockType } = wp.blocks;
const { TextControl, PanelBody } = wp.components;
const { useState } = wp.element;
const { InspectorControls } = wp.blockEditor;

registerBlockType("custom-iframe-block/block", {
  title: "Custom Iframe",
  icon: "media-code",
  category: "common",
  attributes: {
    url: {
      type: "string",
      source: "attribute",
      selector: "iframe",
      attribute: "src",
      default: "",
    },
    aspectRatio: {
      type: "string",
      default: "16/9",
    },
    maxWidth: {
      type: "number",
      default: 750,
    },
  },
  edit: ({ attributes, setAttributes }) => {
    const { url, maxWidth, aspectRatio } = attributes;
    const [newUrl, setNewUrl] = useState(url);

    const validateUrl = value => {
      const urlPattern =
        /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.?&=%]*)*\/?$/i;
      const isValid = urlPattern.test(value);

      if (!isValid) {
        alert(
          "Invalid URL. Please enter a valid URL starting with http:// or https://"
        );
      } else {
        setAttributes({ url: value });
      }
    };

    const calculateHeight = () => {
      const [numerator, denominator] = aspectRatio.split("/");
      const aspectRatioValue = parseFloat(numerator) / parseFloat(denominator);
      return Math.round(maxWidth / aspectRatioValue);
    };

    return (
      <div>
        <InspectorControls>
          <PanelBody title="Iframe Settings">
            <TextControl
              label="Max Width"
              type="number"
              value={maxWidth}
              onChange={value => setAttributes({ maxWidth: Number(value) })}
            />
            <TextControl
              label="Aspect Ratio"
              value={aspectRatio}
              onChange={value => setAttributes({ aspectRatio: value })}
            />
          </PanelBody>
        </InspectorControls>
        <TextControl
          label="Iframe URL"
          value={newUrl}
          onChange={value => setNewUrl(value)}
          onBlur={() => validateUrl(newUrl)}
        />
        {url && (
          <div
            style={{
              position: "relative",
              paddingBottom: `${
                (1 / parseFloat(aspectRatio.split("/")[0])) * 100
              }%`,
              maxWidth: `${maxWidth}px`,
              margin: "0 auto",
            }}>
            <iframe
              src={url}
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
              frameborder="0"
            />
          </div>
        )}
      </div>
    );
  },
  save: ({ attributes }) => {
    const { url, maxWidth, aspectRatio } = attributes;

    if (!url) return null;

    const calculateHeight = () => {
      const [numerator, denominator] = aspectRatio.split("/");
      const aspectRatioValue = parseFloat(numerator) / parseFloat(denominator);
      return Math.round(maxWidth / aspectRatioValue);
    };

    return (
      url && (
        <div
          style={{
            position: "relative",
            paddingBottom: `${
              (1 / parseFloat(aspectRatio.split("/")[0])) * 100
            }%`,
            maxWidth: `${maxWidth}px`,
            margin: "0 auto",
          }}>
          <iframe
            src={url}
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
            frameborder="0"
          />
        </div>
      )
    );
  },
  // Server-side rendering callback
  render_callback: ({ attributes }) => {
    const { url, maxWidth, aspectRatio } = attributes;

    if (!url) return null;

    const calculateHeight = () => {
      const [numerator, denominator] = aspectRatio.split("/");
      const aspectRatioValue = parseFloat(numerator) / parseFloat(denominator);
      return Math.round(maxWidth / aspectRatioValue);
    };

    return (
      <div
        style={{
          position: "relative",
          paddingBottom: `${
            (1 / parseFloat(aspectRatio.split("/")[0])) * 100
          }%`,
          maxWidth: `${maxWidth}px`,
          margin: "0 auto",
        }}>
        <iframe
          src={url}
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          frameborder="0"
        />
      </div>
    );
  },
});
