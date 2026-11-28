import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import type { SceneMotion } from "./StoryExperience";
import { protectionDetails } from "./story-protection-details";
import { easeBetween, sampleStory } from "./story-timeline";

const finishes = {
  rim: "#c1aa85",
  brace: "#887253",
  collar: "#d7b57e",
};

export default function ProtectionDetails({ motion }: { motion: RefObject<SceneMotion> }) {
  const details = useRef<THREE.InstancedMesh<THREE.CylinderGeometry, THREE.MeshStandardMaterial>>(null);

  useLayoutEffect(() => {
    const mesh = details.current;
    if (!mesh) return;
    const rod = new THREE.Object3D();
    const start = new THREE.Vector3();
    const end = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    const color = new THREE.Color();

    for (const [index, detail] of protectionDetails.entries()) {
      start.set(...detail.start);
      end.set(...detail.end);
      direction.subVectors(end, start);
      rod.position.addVectors(start, end).multiplyScalar(0.5);
      rod.scale.set(detail.radius, direction.length(), detail.radius);
      rod.quaternion.setFromUnitVectors(up, direction.normalize());
      rod.updateMatrix();
      mesh.setMatrixAt(index, rod.matrix);
      mesh.setColorAt(index, color.set(finishes[detail.finish]));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, []);

  useFrame(() => {
    const mesh = details.current;
    if (!mesh) return;
    const { from, to, blend } = sampleStory(motion.current.progress);
    const protection = (from === 4 ? 1 - blend : 0) + (to === 4 ? blend : 0);
    const reveal = easeBetween(protection, 0.78, 0.98);
    mesh.visible = reveal > 0.01;
    mesh.material.opacity = reveal;
  });

  return (
    <instancedMesh ref={details} args={[undefined, undefined, protectionDetails.length]} visible={false}>
      <cylinderGeometry args={[1, 1, 1, 8]} />
      <meshStandardMaterial metalness={0.66} roughness={0.37} transparent depthWrite={false} />
    </instancedMesh>
  );
}
