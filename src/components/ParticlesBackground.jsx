import { useCallback } from 'react'
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"

const ParticlesBackground = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#22d3ee", "#34d399"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.3,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true
      },
      links: {
        enable: true,
        distance: 150,
        color: "#22d3ee",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "bounce"
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 150,
          links: {
            opacity: 0.5
          }
        }
      }
    },
    background: {
      color: "transparent"
    },
    retina_detect: true
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
      className="absolute inset-0"
    />
  );
};

export default ParticlesBackground;
