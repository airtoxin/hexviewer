import React, {useCallback, useMemo, useState} from "react";
import { css } from "emotion";
import { useDropzone } from "react-dropzone";
import stringReplace from "react-string-replace";

function splitByLength(str: string, length: number) {
  if (!str || !length || length < 1) {
    return [];
  }
  var regexPattern = new RegExp(
    '(?:[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]){1,' + length + '}',
    'g'
  );

  return str.match(regexPattern) || [];
}

const columnCss = css({
  flexGrow: 1,
  height: "100vh"
});

const App: React.FC = () => {
  const [typedArray, setTypedArray] = useState(new Uint8Array());
  const { getRootProps } = useDropzone({
    onDrop: useCallback(([file]) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        setTypedArray(new Uint8Array(fileReader.result as any));
      });
      fileReader.readAsArrayBuffer(file);
    }, [])
  });
  const hexString = useMemo(() => {
    return stringReplace(splitByLength(Array.from(typedArray).map(i => i.toString(16)).join(""), 8).join("\n"), "\n", (match) => (
      <>{match}<br /></>
    ));
  }, [typedArray]);
  const asciiString = useMemo(() => {
    return stringReplace(splitByLength(Array.from(typedArray).map(i => String.fromCharCode(i)).join(""), 4).join("\n"), "\n", (match) => (
      <>{match}<br/></>
    ));
  }, [typedArray]);

  return (
    <div className={css({
      display: "flex"
    })}>
      <div className={columnCss} {...getRootProps()}>
        {hexString}
      </div>
      <div className={columnCss}>
        {asciiString}
      </div>
    </div>
  );
};

export default App;
