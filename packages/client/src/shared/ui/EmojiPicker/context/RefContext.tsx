import React from 'react';

export type ElementRef<E extends HTMLElement = HTMLElement> = React.MutableRefObject<E | null>;

type ElementRefs = {
  MainRef: ElementRef<HTMLDivElement>;
  ListRef: ElementRef<HTMLDivElement>;
};

const ElementRefContext = React.createContext<ElementRefs>({
  MainRef: React.createRef(),
  ListRef: React.createRef(),
});

export function useElementMainRef() {
  return React.useContext(ElementRefContext)['MainRef'];
}

export function useElementListRef() {
  return React.useContext(ElementRefContext)['ListRef'];
}

export function RefContextProvider({ children }: { children: React.ReactNode }) {
  const MainRef = React.useRef<HTMLDivElement>(null);
  const ListRef = React.useRef<HTMLDivElement>(null);

  return (
    <ElementRefContext.Provider
      value={{
        MainRef,
        ListRef,
      }}
    >
      {children}
    </ElementRefContext.Provider>
  );
}
