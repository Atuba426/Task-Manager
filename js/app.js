import { createStore } from "./store.js";
import { reducer } from "./reducer.js";
import { initialState } from "./state.js";
import { createHistoryManager } from "./history.js";
import { renderTasks } from "./ui.js";
import { autosave } from "./autosave.js";
import { initEvents } from "./events.js";

export const store = createStore(initialState, reducer);
const history = createHistoryManager();
//subscribers
store.subscribe(() => {
  renderTasks(store.getState());
});
store.subscribe(() => {
  autosave(store.getState());
});
store.subscribe(() => history.saveSnapShot());
renderTasks(store.getState());
//events
initEvents();

document.getElementById("undo").addEventListener("click", history.undo);
document.getElementById("redo").addEventListener("click", history.redo);
