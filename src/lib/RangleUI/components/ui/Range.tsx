import React, {useCallback, useMemo, useRef} from "react";

import useEnv from "../../hooks/useEnv";
import useFlag from "../../hooks/useFlag";
import createClassName from "../../utils/createClassName";
import {fitNumber, limitNumber} from "../../utils/numbers";
import {AnyCallback, rangleColor} from "../../types";

import "./Range.scss";

type PreviewConfig = {
  isDisabled?: boolean;
  position?: "top" | "bottom";
  formatter?: (value: number) => number | string;
};

type OwnProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  previewConfig?: PreviewConfig;
  color?: rangleColor;
  onChange: AnyCallback<number>;
};

const Range: React.FC<OwnProps> = ({
  value,
  min=0,
  max=100,
  step=1,
  label,
  sublabel,
  isDisabled,
  className,
  previewConfig = { isDisabled: false },
  color = "primary",
  onChange
}) => {
  const env = useEnv();
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  //const [trackWidth, setTrackWidth] = useState(0);
  const [isPreviewOpen, openPreview, closePreview] = useFlag();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }

    var value = Number(e.currentTarget.value);
    value = Math.min(max, Math.max(min, value));

    onChange(value);
  }, [onChange, min, max, isDisabled]);

  const handleMouseOver = useCallback(() => {
    openPreview();
  }, [openPreview]);

  const handleMouseLeave = useCallback(() => {
    closePreview();
  }, [closePreview]);

  const handlePreviewUpdate = useCallback((clientX: number) => {
    const preview = previewRef.current;
    const input = inputRef.current;

    if (!preview || !input) {
      return;
    }

    var previewBox = preview.getBoundingClientRect();
    var inputBox = input.getBoundingClientRect();
    var cursorX = limitNumber(clientX - inputBox.x, 0, inputBox.width);
    var left = limitNumber(cursorX - previewBox.width / 2, 0, inputBox.width - previewBox.width);

    var previewValue = Math.round(fitNumber(cursorX, 0, inputBox.width, min, max));
    var formattedValue: number | string;

    if (previewConfig.formatter) {
      formattedValue = previewConfig.formatter(previewValue);
    }

    preview.style.left = left + "px";
    preview.innerText = (formattedValue! ?? previewValue).toString();
  }, [previewRef, inputRef, min, max, previewConfig]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    handlePreviewUpdate(e.clientX);
  }, [handlePreviewUpdate]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    handlePreviewUpdate(e.touches[0].clientX);
  }, [handlePreviewUpdate]);

  const trackWidth = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, max, min]);

  const shouldTouchEvents = !previewConfig.isDisabled;
  const shouldMouseEvents = !previewConfig.isDisabled && !env.isMobile;

  const fullClassName = createClassName(
    "Range",
    className,
    "color-" + color,
    isDisabled && "disabled",
    isPreviewOpen && "preview-open",
    previewConfig.isDisabled && "value-preview-disabled"
  );

  return (
    <div className={fullClassName}>
      {label && (
        <div className="label">
          <div className="title">{label}</div>
          {sublabel && <div className="subtitle">{sublabel}</div>}
        </div>
      )}

      <div
        className="input"
        onMouseOver={shouldMouseEvents && !previewConfig.isDisabled ? handleMouseOver : undefined}
        onMouseLeave={shouldMouseEvents && !previewConfig.isDisabled ? handleMouseLeave : undefined}
        onMouseMove={shouldMouseEvents ? handleMouseMove : undefined}
        onTouchStart={shouldTouchEvents ? handleMouseOver : undefined}
        onTouchEnd={shouldTouchEvents ? handleMouseLeave : undefined}
        onTouchMove={shouldTouchEvents ? handleTouchMove : undefined}
      >
        <div
          className="animation"
          style={{ width: trackWidth + "%" }}
        />

        {!previewConfig.isDisabled && (
          <div
            className="value-preview"
            ref={previewRef}
          />
        )}

        <input
          type="range"
          ref={inputRef}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Range;
