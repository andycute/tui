import {  useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import * as app from "@tauri-apps/api/app";

import { open } from "@tauri-apps/api/dialog";
import { appDir } from "@tauri-apps/api/path";
// import { WebviewWindow } from '@tauri-apps/api/window';

import "./App.css";
import { listen } from "@tauri-apps/api/event";
// import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
// import Counter from "./component/Counter";
// import Post from "./component/Post";


console.log(app);
function App() {
  // const [todo, settodo] = useState<string[]>([]);
  const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");
  // const vr = useRef(null);
  useEffect(() => {
    listen("event-name", (event: any) => {
      console.log(event);
      setGreetMsg(event.payload.message)
    });
  }, [])

  // const rec = async () => {
  //   navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(d => {
  //     const ele = vr.current as unknown as HTMLVideoElement;
  //     ele.srcObject = d
  //   })

  // }
  // const getLocalPreview = async () => {
  //   settodo([...todo, name]);
  // };

  // const permissionGranted = async () => {
  //   let permissionGranted = await isPermissionGranted();
  //   if (!permissionGranted) {
  //     const permission = await requestPermission();
  //     permissionGranted = permission === 'granted';
  //   }
  //   if (permissionGranted) {
  //     sendNotification('Tauri is awesome!');
  //     sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
  //   }
  // }

  // const showwinow = async () => {


  //   // Open a selection dialog for image files
  //   const selected = await open({
  //     directory: true,
  //     filters: [{
  //       name: 'Image',
  //       extensions: ['png', 'jpeg']
  //     }]
  //   });
  //   console.log(selected)


  //   // const webview = new WebviewWindow('my-label', {
  //   //   url: 'https://addpipe.com/media-recorder-api-demo/'
  //   // });
  //   // webview.once('tauri://created', function () {
  //   //   // webview window successfully created

  //   // });
  //   // webview.show()
  //   // webview.once('tauri://error', function (e) {
  //   //   // an error happened creating the webview window
  //   // });


  // }


  // async function greet() {

  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

  //   setGreetMsg(await invoke("greet", { name }));
  // }
  const opendialog = async () => {
    // Open a selection dialog for directories
    const path = await open({
      directory: true,
      multiple: false,
      defaultPath: await appDir(),
    });
    console.log(path)
    await invoke("filecompare", { path })
    // if (Array.isArray(selected)) {
    //   // user selected multiple directories
    // } else if (selected === null) {
    //   // user cancelled the selection
    // } else {
    //   // user selected a single directory
    // }
  };

  // const removetodo = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, i: string, index: number) => {
  //   e.preventDefault();
  //   console.log("🚀 ~ file: App.tsx:87 ~ removetodo ~ target:", e.target);
  //   settodo(todo.filter((_, i) => i != index))
  // }

  // const [src, togglesrc] = useState(true)
  return (
    <div className="container"> 
      {/* <Post onClick={togglesrc} src={src ? 'vite' : 'tauri'} /> */}
      <div className="row">
        <button onClick={opendialog}>
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </button>
        {/* <button onClick={permissionGranted}>
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </button> */}
        {/* <button onClick={showwinow}>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </button> */}
      </div>
      <p>
        {greetMsg}
      </p>
      {/* <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form> */}
      {/* <button type="submit" onClick={getLocalPreview}>rec</button> */}

      {/* {todo.length ? todo.map((i, index) => <li key={i} onClick={(e) => removetodo(e, i, index)}>{i}</li>) : <>没有更多啦</>} */}

    </div>
  );
}

export default App;
