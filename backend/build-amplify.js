const fs = require("fs");
const path = require("path");

const backendDir = __dirname;
const hostingDir = path.join(backendDir, ".amplify-hosting");
const computeDir = path.join(hostingDir, "compute", "default");
const staticDir = path.join(hostingDir, "static");

console.log("Preparing AWS Amplify Hosting SSR structure for Express...");

// 1. Clean and recreate directories
if (fs.existsSync(hostingDir)) {
  fs.rmSync(hostingDir, { recursive: true, force: true });
}
fs.mkdirSync(computeDir, { recursive: true });
fs.mkdirSync(staticDir, { recursive: true });

// 2. Write deploy-manifest.json
const manifest = {
  version: 1,
  framework: {
    name: "express",
    version: "5.2.1"
  },
  routes: [
    {
      path: "/*",
      target: {
        kind: "Compute",
        src: "default"
      }
    }
  ],
  computeResources: [
    {
      name: "default",
      runtime: "nodejs20.x",
      entrypoint: "index.js"
    }
  ]
};

fs.writeFileSync(
  path.join(hostingDir, "deploy-manifest.json"),
  JSON.stringify(manifest, null, 2)
);
console.log("✓ Created .amplify-hosting/deploy-manifest.json");

// 3. Create dummy file in static directory
fs.writeFileSync(
  path.join(staticDir, "placeholder.txt"),
  "Amplify static asset placeholder"
);
console.log("✓ Created .amplify-hosting/static/placeholder.txt");

// 4. Copy backend source files and directories into compute/default
const itemsToCopy = [
  "index.js",
  "package.json",
  "package-lock.json",
  "middleware",
  "model",
  "schemas",
  "node_modules"
];

for (const item of itemsToCopy) {
  const src = path.join(backendDir, item);
  const dest = path.join(computeDir, item);
  if (fs.existsSync(src)) {
    console.log(`✓ Copying ${item} -> .amplify-hosting/compute/default/${item}`);
    fs.cpSync(src, dest, { recursive: true });
  } else {
    console.warn(`! Item not found to copy: ${item}`);
  }
}

// 5. Inject console environment variables into compute/default/.env
// Note: Amplify Hosting Compute runtime does not automatically expose console env vars.
const knownKeys = [
  "NODE_ENV",
  "PORT",
  "MONGO_URL",
  "MONGODB_URI",
  "FRONTEND_URL",
  "DASHBOARD_URL",
  "ALLOWED_ORIGINS"
];

const systemPrefixes = ["AWS_", "AMPLIFY_", "npm_", "PATH", "USER", "HOME", "LANG", "NODE_"];
const ignoredKeys = ["SHLVL", "TERM", "PWD", "OLDPWD", "_"];

let envContent = "";
const includedKeys = new Set();

for (const key of knownKeys) {
  if (process.env[key]) {
    envContent += `${key}=${process.env[key]}\n`;
    includedKeys.add(key);
  }
}

for (const [key, val] of Object.entries(process.env)) {
  if (
    !includedKeys.has(key) &&
    !systemPrefixes.some((p) => key.startsWith(p)) &&
    !ignoredKeys.includes(key)
  ) {
    envContent += `${key}=${val}\n`;
    includedKeys.add(key);
  }
}

// If local .env exists and we're verifying locally with no env set, copy local .env
if (!envContent && fs.existsSync(path.join(backendDir, ".env"))) {
  envContent = fs.readFileSync(path.join(backendDir, ".env"), "utf8");
}

if (envContent) {
  console.log("✓ Injected environment variables into .amplify-hosting/compute/default/.env");
  fs.writeFileSync(path.join(computeDir, ".env"), envContent);
}

console.log("\n Build complete! .amplify-hosting directory is ready for Amplify deployment.");
