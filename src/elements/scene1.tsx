import React from "react";
import {FreeCamera, Vector3, HemisphericLight, MeshBuilder} from "@babylonjs/core"
import {Engine as EngineR, Scene as SceneR, SceneEventArgs} from "react-babylonjs"
import createDebugUI from "../utils/debugUI";
import {useNavigate} from "react-router-dom";
import createSidePanel from "../utils/sideButtonUI";

export default () => {
	const navigate = useNavigate()
	const createScene = (e: SceneEventArgs) => {
		const {canvas, scene} = e;
		const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
		camera.setTarget(Vector3.Zero());
		camera.attachControl(canvas, true);
		const light = new HemisphericLight(
			'light1',
			new Vector3(0, 1, 0),
			scene
		);
		light.intensity = 0.7;
		const sphere = MeshBuilder.CreateSphere(
			'sphere',
			{diameter: 2, segments: 32},
			scene
		);
		const ground = MeshBuilder.CreateGround(
			'ground',
			{width: 6, height: 6},
			scene
		);
		
		const {uiText} = createDebugUI(scene)
		uiText.text = "Teleport to the ground for changing scene\nCurrent scene: 1"
		createSidePanel(scene, [
			{
				text: "Goto scene 2", onClick: () => {
					navigate("/scene2")
				}
			}
		])
		
		scene.createDefaultXRExperienceAsync({
			floorMeshes: [ground]
		}).then(experience => {
			experience.baseExperience.enterXRAsync('immersive-vr', 'local-floor')
			experience.baseExperience.camera.onAfterCameraTeleport.add(() => {
				navigate("/scene2")
			})
		})
	}
	return (
		<EngineR adaptToDeviceRatio>
			<SceneR onSceneMount={createScene}>
			
			</SceneR>
		</EngineR>
	)
}