// let db;

// const request = window.indexedDB.open("budget", 1);

// export function checkforIndexedDb() {
//     if (!window.indexedDB) {
//         console.log("Your browser does not support IndexedDB.");
//         return false;
//     }
//     return true;
// }

// request.onupgradeneeded(function(e) {
//     // Creating an object store and setting autoIncrement value to true
//     const db = e.target.result;
//     db.createObjectStore("pending", { autoIncrement: true });
// };

// request.onsuccess = function(e) {
//     db = e.target.result;

// }

export function useIndexedDb(databaseName, storeName, method, object) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(databaseName, 1);
      let db,
        tx,
        store;
  
      request.onupgradeneeded = function(e) {
        const db = request.result;
        db.createObjectStore(storeName, { keyPath: "_id" });
      };
  
      request.onerror = function(e) {
        console.log("There was an error");
      };
  
      request.onsuccess = function(e) {
        db = request.result;
        tx = db.transaction(storeName, "readwrite");
        store = tx.objectStore(storeName);
  
        db.onerror = function(e) {
          console.log("error");
        };
        if (method === "put") {
          store.put(object);
        }
        if (method === "get") {
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
        }
        tx.oncomplete = function() {
          db.close();
        };
      };
    });
  }