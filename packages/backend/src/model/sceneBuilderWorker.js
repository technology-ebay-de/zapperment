const { isMainThread, parentPort } = require("worker_threads");
const { Storage } = require("@zapperment/storage");
const SceneBuilder = require("./SceneBuilder");
const { BUILD_SCENE, NEW_SCENE, EXIT } = require("../constants");
const { databaseUrl, useNeuralNetwork } = require("../config");

if (isMainThread) {
  throw new Error(
    "Module sceneBuilderWorker.js may only be used as a worker thread"
  );
}

(async () => {
  const storage = new Storage();
  try {
    await storage.init({ databaseUrl });
  } catch (err) {
    console.error("Error initializing storage in scene builder worker thread");
    console.error(err);
    process.exit(1);
  }
  const sceneBuilder = new SceneBuilder({ storage, useNeuralNetwork });
  await sceneBuilder.init();

  parentPort.on("message", ({ type }) => {
    switch (type) {
      case BUILD_SCENE:
        parentPort.postMessage({
          type: NEW_SCENE,
          data: sceneBuilder.buildNewScene()
        });
        break;
      case EXIT:
        process.exit(0);
        break;
      default:
    }
  });
})();
