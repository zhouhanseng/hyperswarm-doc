import React, { useRef, useEffect, useState } from "react";
import qr from "qrcode";
import { Button } from "@material-ui/core";

interface QRProps {
  text: string;
  options?: qr.QRCodeRenderersOptions;
  canvasProps?: React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement & HTMLImageElement>,
    HTMLCanvasElement & HTMLImageElement
  >;
}

const cache = {
  get(scope: string, key: string) {
    return sessionStorage.getItem(`${scope}:${key}`);
  },
  set(scope: string, key: string, value: string) {
    return sessionStorage.setItem(`${scope}:${key}`, value);
  },
  remove(scope: string, key: string) {
    return sessionStorage.removeItem(`${scope}:${key}`);
  },
};

const CACHE_SCOPE = "qrcode";

export default function QRCode({ text, options = {}, canvasProps }: QRProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const image = cache.get(CACHE_SCOPE, text);
  const [isCached] = useState(!!image);

  useEffect(() => {
    // Doc: Although useEffect runs after every render cycle, which means we can get ref first time.
    //  But It is the case that ref will only be undefined since it also returns <img />.
    //   So if (!ref.current) return is still necessary.
    if (!ref.current) return;

    qr.toCanvas(ref.current, text, options, (err: Error) => {
      if (err) {
        throw err;
      }
      const dataURL = ref.current?.toDataURL();
      if (dataURL) {
        cache.set(CACHE_SCOPE, text, dataURL);
      }
    });
  }, [options, text]);

  return (
    <>
      {image ? (
        <img src={image} {...canvasProps} />
      ) : (
        <canvas {...canvasProps} ref={ref} />
      )}
      <div className="flex items-center mt-3">
        {isCached ? (
          <>
            <p className="mr-4">Cached image</p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                cache.remove(CACHE_SCOPE, text);
                window.location.reload();
              }}
            >
              Clear Cache
            </Button>
          </>
        ) : (
          <>
            <p className="mr-4">New canvas</p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh Page
            </Button>
          </>
        )}
      </div>
    </>
  );
}
