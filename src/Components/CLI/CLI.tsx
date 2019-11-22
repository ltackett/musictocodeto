import * as React from "react";
import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import Screen, { SceneEventArgs } from "./Screen";

import 'babylonjs-loaders'
import { CTX } from "../../Contexts/Global";
import Spinner, { spinnerStages } from "../CommandLine/Spinner";

let scene: BABYLON.Scene;
let engine: BABYLON.Engine;
let canvas: HTMLCanvasElement;

let linesTexture: GUI.AdvancedDynamicTexture
let screenPlane: BABYLON.AbstractMesh | null
let screenMat: BABYLON.StandardMaterial
let textBlock: GUI.TextBlock

const defaultCursor = '\u2593'
let cursorSwitch = 0
let cursorInterval: any

export const CLI: React.FC = (props: any) => {
  const [cursor, setCursor] = React.useState(defaultCursor)
  const [cmd, setCmd] = React.useState('')

  const ps1 = `${props.bang} ${props.path === '/' ? '' : props.path} ${cmd}`;

  const startCursorInterval = () => {
    cursorInterval = setInterval(() => {
      if (cursorSwitch === 0) {
        setCursor('');
        cursorSwitch = 1
      } else {
        setCursor(defaultCursor)
        cursorSwitch = 0
      }
    }, 500)
  }

  const stopCursorInterval = () => {
    clearInterval(cursorInterval)
  }

  // Cursor Blinking
  React.useEffect(() => {
    if (props.isBooted) {
      startCursorInterval();
    }

    return stopCursorInterval
  }, [props.isBooted])

  // Boot
  React.useEffect(() => {
    props.setSettings({ textOnly: true });
  }, [])

  // Setup textBlock
  React.useEffect(() => {
    textBlock = new GUI.TextBlock('lines_text', props.stdoutLines.join('\n'));
    textBlock.textWrapping = true;
    textBlock.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    textBlock.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    textBlock.fontFamily = "Consolas"
    textBlock.color = "#00FF00"
    textBlock.fontSize = 100

    const padding = 15
    textBlock.paddingTop = padding
    textBlock.paddingRight = padding
    textBlock.paddingBottom = padding
    textBlock.paddingLeft = padding

    return stopCursorInterval
  }, [])

  const applyLinesToScreen = () => {
    const displayedLines = [...props.stdoutLines]
    if (displayedLines.length >= 24) {
      displayedLines.reverse()
      displayedLines.splice(23, 1000)
      displayedLines.reverse()
    }

    if (linesTexture && screenMat && screenPlane) {
      textBlock.text = displayedLines.concat([`${ps1}${props.isCmdRunning ? spinnerStages[props.spinnerStage] : cursor}`]).join('\n')
    }
  }

  const onSceneMount = async (e: SceneEventArgs) => {
    scene = e.scene
    engine = e.engine
    canvas = e.canvas

    scene.clearColor = new BABYLON.Color4(0, 0, 0, 2)

    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.ArcRotateCamera(
      "camera1",
      -Math.PI / 2,
      Math.PI / 2,
      3000,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );

    camera.maxZ = 20000

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(100, 30, -25),
      scene
    );

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.5;

    // Set width an height for plane
    const planeWidth = 4400;
    const planeHeight = planeWidth * 0.66;

    // Load old computer
    BABYLON.SceneLoader.ImportMesh(null, './models/', 'old_computer_no_screen.glb', scene, (meshes) => {
     meshes[0].scaling = new BABYLON.Vector3(15, 15, -15)
     meshes[0].translate(new BABYLON.Vector3(-1, 0, 0), 35)  // X
     meshes[0].translate(new BABYLON.Vector3(0, -1, 0), 170) // Y
     meshes[0].translate(new BABYLON.Vector3(0, 0, 1), 75)   // Z
     meshes[0].rotate(new BABYLON.Vector3(0, 1, 0), Math.PI)

     props.run('boot', false);
    })

    const assetContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync('./models/', 'old_computer_screen.glb', scene)

    assetContainer.addAllToScene()
    const rootMesh =
    screenPlane = scene.getMeshByName('Comp_Screen.002_TerminalMaterial_0')

    if (screenPlane) {
      screenPlane.scaling = new BABYLON.Vector3(-15, -15, -15)
      screenPlane.translate(new BABYLON.Vector3(1, 0, 0), 0.256) // X
      screenPlane.translate(new BABYLON.Vector3(0, 1, 0), 0.819)  // Y
      screenPlane.translate(new BABYLON.Vector3(0, 0, 1), 0.35)  // Z

      linesTexture = GUI.AdvancedDynamicTexture.CreateForMesh(
        screenPlane,
        planeWidth,
        planeHeight
      );

      linesTexture.addControl(textBlock);

      // create material
      screenMat = new BABYLON.StandardMaterial("mat", scene);
      screenMat.emissiveTexture = linesTexture;
      // screenMat.useEmissiveAsIllumination = true
      screenMat.emissiveColor = new BABYLON.Color3(0, 0.15, 0.1);
      screenMat.diffuseColor = new BABYLON.Color3(0, 0, 0);

      // apply material
      screenPlane.material = screenMat;

      applyLinesToScreen()

      // Emissive textures should glow
      const glow = new BABYLON.GlowLayer('glow', scene, {
        mainTextureSamples: 4
      })
    }


    // Run render loop
    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({props})

    props.stdout([ps1, ''])
    props.run(cmd);
    setCmd('');
    (event.target as any).line.value = ""
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCmd(event.target.value);
  }

  const focusInput = (input: HTMLInputElement) => {
    return input && input.focus()
  }

  React.useLayoutEffect(() => {
    applyLinesToScreen()
  }, [props.stdoutLines, props.path, props.isCmdRunning, props.spinnerStage, cmd, cursor])

  return (
    <div>
      {props.isBooted && !props.isCmdRunning &&
        <form onSubmit={handleSubmit}>
          <input type="text" name="line" onChange={handleChange} ref={(input: HTMLInputElement) => focusInput(input)} onBlur={(e) => focusInput(e.target)}/>
          <input type="submit" />
        </form>
      }

      {props.isCmdRunning &&
        <Spinner />
      }

      <Screen
        onSceneMount={onSceneMount}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
}

export default () => <CTX component={CLI} />