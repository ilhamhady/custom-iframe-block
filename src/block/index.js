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
    width: {
      type: "number",
      default: 750,
    },
  },
  edit: ({ attributes, setAttributes }) => {
    const { url, width, aspectRatio } = attributes;
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
      return Math.round(width / aspectRatioValue);
    };

    return (
      <div>
        <InspectorControls>
          <PanelBody title="Iframe Settings">
            <TextControl
              label="Width"
              type="number"
              value={width}
              onChange={value => setAttributes({ width: Number(value) })}
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
          <iframe
            src={url}
            width={width}
            height={calculateHeight()}
            style={{ maxWidth: "100%", height: calculateHeight() }}
          />
        )}
      </div>
    );
  },
  save: ({ attributes }) => {
    const { url, width, aspectRatio } = attributes;

    if (!url) return null;

    const calculateHeight = () => {
      const [numerator, denominator] = aspectRatio.split("/");
      const aspectRatioValue = parseFloat(numerator) / parseFloat(denominator);
      return Math.round(width / aspectRatioValue);
    };

    return (
      <iframe
        src={url}
        width={width}
        height={calculateHeight()}
        style={{ maxWidth: "100%", height: calculateHeight() }}
      />
    );
  },
  // Server-side rendering callback
  render_callback: ({ attributes }) => {
    const { url, width, aspectRatio } = attributes;

    if (!url) return null;

    const calculateHeight = () => {
      const [numerator, denominator] = aspectRatio.split("/");
      const aspectRatioValue = parseFloat(numerator) / parseFloat(denominator);
      return Math.round(width / aspectRatioValue);
    };

    return (
      <iframe
        src={url}
        width={width}
        height={calculateHeight()}
        style={{ maxWidth: "100%", height: calculateHeight() }}
      />
    );
  },
});
