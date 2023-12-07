const targetNode = document.getElementById("directory-game-main-content");

const config = { attributes: true, childList: true, subtree: true };
const search = ["rerun", "!rr", "[rr]", "(rr)", "[rerun]"];

let skipNext = false;
let className;

const callback = (mutationList, _observer) => {
     if (!className) {
          for (const mutation of mutationList) {
               if (mutation.type === "childList") {
                    for (const added of mutation.addedNodes) {
                         if (added.tagName === "ARTICLE") {
                              className = added.className;
                              return;
                         }
                    }
               }
          }
          return;
     }

     if (skipNext) {
          skipNext = false;
          return;
     }

     const eles = document.getElementsByClassName(className);
     for (const ele of eles) {
          for (const term of search) {
               if (ele.innerHTML.toLowerCase().includes(term)) {
                    ele.parentElement.parentElement.parentElement.parentElement.remove();
               }
          }
     }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
