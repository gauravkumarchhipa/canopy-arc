export const glassVertex = `
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vLatitude;
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-viewPosition.xyz);
    vLatitude = position.y;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

export const glassFragment = `
  uniform float strength;
  uniform float night;
  uniform float coverage;
  uniform float ior;
  uniform float thickness;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vLatitude;

  float band(float value, float center, float width) {
    float d = (value - center) / width;
    return exp(-d * d);
  }

  void main() {
    vec3 n = normalize(vNormal);
    float facing = max(dot(n, normalize(vView)), 0.0);
    float f0 = pow((ior - 1.0) / (ior + 1.0), 2.0);
    float rim = f0 + (1.0 - f0) * pow(1.0 - facing, 4.0);
    float sweep = mix(-1.23, 1.23, coverage);
    float film = 1.0 - smoothstep(sweep - 0.16, sweep + 0.03, vLatitude);
    float front = band(vLatitude, sweep - 0.095, 0.057) * (1.0 - smoothstep(0.88, 1.0, coverage));
    float inner = band(facing, 0.33, 0.2);
    float softbox = band(n.y + n.x * 0.44, 0.49, 0.105)
      * smoothstep(0.05, 0.48, -n.x + n.y * 0.43) * smoothstep(0.1, 0.64, 1.0 - facing);
    float glint = pow(max(dot(n, normalize(vec3(-0.52, 0.77, 0.33))), 0.0), 64.0);
    float floor = band(n.y + n.x * 0.25, -0.85, 0.08) * (0.35 + 0.65 * rim);
    float rimGlint = band(facing, 0.14, 0.065) * smoothstep(0.2, 0.73, n.y - n.x * 0.52);
    float daylight = 1.0 - night;
    float shadedEdge = band(facing, 0.46, 0.23) * smoothstep(0.05, 0.9, n.x - n.y * 0.32);
    float shine = rim * 0.86 + softbox * (0.74 + daylight * 0.52)
      + glint * 0.81 + floor * 0.58 + rimGlint * (0.7 + daylight * 0.45);
    vec3 shade = mix(vec3(0.099, 0.094, 0.088), vec3(0.32, 0.36, 0.35), night);
    vec3 color = mix(shade, vec3(1.15, 1.12, 1.05) + vec3(daylight * 0.29), clamp(shine * 1.8, 0.0, 1.0));
    float opticalPath = thickness / max(0.24, facing);
    float absorption = 1.0 - exp(-0.55 * opticalPath);
    float opacity = strength * film * clamp(absorption + inner * (0.21 - night * 0.09) + shine * 0.86
      + daylight * shadedEdge * 0.23 + front * 0.24, 0.0, 0.94);
    gl_FragColor = vec4(color, opacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export const reflectionVertex = `
  #include <common>
  #include <morphtarget_pars_vertex>
  uniform float floorY;
  varying float vHeight;
  varying float vSide;
  void main() {
    #include <begin_vertex>
    #include <morphtarget_vertex>
    vHeight = transformed.y - floorY;
    vSide = transformed.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

export const reflectionFragment = `
  uniform float strength;
  varying float vHeight;
  varying float vSide;
  void main() {
    float alpha = strength * exp(-max(vHeight, 0.0) * 5.8);
    vec3 metal = mix(vec3(0.91, 0.54, 0.22), vec3(0.76, 0.72, 0.63), smoothstep(-2.2, 1.8, vSide));
    gl_FragColor = vec4(metal, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;
