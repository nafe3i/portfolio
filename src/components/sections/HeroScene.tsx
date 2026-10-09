import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";

interface SceneColors {
  accent: string;
  indigo: string;
  violet: string;
}

function useSceneColors(): SceneColors | undefined {
  const [colors, setColors] = useState<SceneColors>();

  useEffect(() => {
    const styles = window.getComputedStyle(document.documentElement);

    setColors({
      accent: styles.getPropertyValue("--accent-primary").trim(),
      indigo: styles.getPropertyValue("--accent-2-from").trim(),
      violet: styles.getPropertyValue("--accent-2-to").trim(),
    });
  }, []);

  return colors;
}

function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(
    () => document.visibilityState === "visible",
  );

  useEffect(() => {
    function updateVisibility() {
      setIsVisible(document.visibilityState === "visible");
    }

    document.addEventListener("visibilitychange", updateVisibility);

    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return isVisible;
}

function FloatingShape({ colors }: { colors: SceneColors }) {
  const group = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y += delta * 0.2;
    group.current.rotation.z += delta * 0.06;
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.16;
  });

  return (
    <group ref={group} rotation={[0.25, -0.4, 0]}>
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color={colors.accent}
          emissive={colors.accent}
          emissiveIntensity={0.22}
          flatShading
          metalness={0.25}
          roughness={0.45}
          transparent
          opacity={0.66}
        />
      </mesh>
      <mesh rotation={[0.9, 0.3, -0.2]} scale={1.3}>
        <torusGeometry args={[0.88, 0.02, 6, 36]} />
        <meshBasicMaterial color={colors.indigo} transparent opacity={0.52} />
      </mesh>
      <mesh rotation={[-0.5, 0.8, 0.4]} scale={0.72}>
        <torusGeometry args={[0.88, 0.015, 6, 32]} />
        <meshBasicMaterial color={colors.violet} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  const colors = useSceneColors();
  const isPageVisible = usePageVisibility();

  if (!colors) {
    return null;
  }

  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ fov: 48, position: [0, 0, 4.2] }}
        dpr={[1, 2]}
        frameloop={isPageVisible ? "always" : "never"}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.85} />
        <pointLight color={colors.accent} intensity={1.4} position={[2, 2, 3]} />
        <FloatingShape colors={colors} />
      </Canvas>
    </div>
  );
}
