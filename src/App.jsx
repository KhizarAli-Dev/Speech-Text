import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const { transcript, browserSupportsSpeechRecognition, listening } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-700">
          Speech Recognition is not supported in your browser.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Speech to Text Converter
        </h2>
        <p className="text-gray-600 text-center mb-6">
          A React hook that converts speech from the microphone to text and
          makes it available to your React components.
        </p>

        <div
          onClick={() => setTextToCopy(transcript)}
          className="bg-gray-100 p-4 rounded-md shadow-md mb-6 cursor-pointer hover:bg-gray-200 transition-all"
        >
          <p className="text-gray-700 text-lg">
            {transcript || "Start speaking..."}
          </p>
        </div>

        <div className="flex space-x-4 justify-center items-center">
          <button
            onClick={() => {
              setTextToCopy(transcript);
              setCopied();
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          >
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </button>
          <button
            onClick={startListening}
            className={`bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all ${
              listening ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={listening}
          >
            {listening ? "Listening..." : "Start Listening"}
          </button>
          <button
            onClick={SpeechRecognition.stopListening}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
          >
            Stop Listening
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
