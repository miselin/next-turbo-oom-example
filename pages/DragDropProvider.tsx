import * as React from 'react';
import type { DragDropManager } from 'dnd-core';
import { createDragDropManager } from 'dnd-core';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndContext } from 'react-dnd';

let dndHTML5BackendContext: { dragDropManager: DragDropManager } | null = null;

function getOrCreateDndContext() {
  if (dndHTML5BackendContext) {
    return dndHTML5BackendContext;
  }

  function simpleBackend(manager: DragDropManager) {
    return HTML5Backend(manager);
  }

  const dndContext = {
    dragDropManager: createDragDropManager(simpleBackend),
  };

  dndHTML5BackendContext = dndContext;

  return dndContext;
}

export default function DragDropProvider(props: React.PropsWithChildren<{}>) {
  const dndContextValue = getOrCreateDndContext();

  return (
    <DndContext.Provider value={dndContextValue}>
      {props.children}
    </DndContext.Provider>
  );
}
