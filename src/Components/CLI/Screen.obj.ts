import * as BABYLON from "babylonjs";
import { Color3 } from "babylonjs";

export const OBJ_Screen = (width: number, height: number, scene: BABYLON.Scene) => {
  // Create a new plane
  const OBJ_plane = BABYLON.MeshBuilder.CreatePlane(
    "screen_plane",
    { width, height },
    scene
  );

  // Create a material for the plane
  const MAT_blank_screen = new BABYLON.StandardMaterial('blank_screen', scene)
  MAT_blank_screen.diffuseColor = new Color3(0, 0, 0);

  // Apply the material to the plane
  OBJ_plane.material = MAT_blank_screen

  // Return the plane with material applied
  return OBJ_plane;
}