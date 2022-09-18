// class L2 {
//     static className = "L2";
  
//     constructor(config) {
//       return tf.regularizers.l1l2(config);
//     }
//   }
//   tf.serialization.registerClass(L2);
  
//   // now load the model
  
//   async function loadModel() {
//     // loads the model
//     model = await tf.loadLayersModel("tfjs_model/model.json");
  
//     // warm start the model. speeds up the first inference
//     model.predict(tf.zeros([1, 224, 224, 3]));
  
//     // return model
//     return model;
//   }
  
//   async function dostuff() {
//     console.log("loading model...");
//     model = await loadModel();
//     console.log(model);
//   }
  
//   dostuff();
  