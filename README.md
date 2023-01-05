# Statedrive

easy shared state across the entire app

# Concept

Each state is a unique atom to which you can attach event listeners and run state updates.

# Installation

`npm i statedrive` or `yarn add statedrive`

# API

## For [ui-lib](https://github.com/hydrophobefireman/ui-lib)

```js
import {createState} from "statedrive";
```

## For react

```js
import {createState} from "statedrive";
import {buildReactStatedrive} from "statedrive/react";
const {} = buildReactStateDrive(react);
```

everything else is the same.

# Basic Usage

1. Create a state atom
   state.js
   ```js
   import {createState} from "statedrive";
   export const userNameAtom = createState({initialValue: "Foo"});
   ```
2. Use it within a react/ui-lib component
   some-component.js
   ```ts
   import {useSharedState} from "statedrive";
   import {userNameAtom} from "./state.js";
   export function ComponentA() {
     const [name, setName] = useSharedState(userNameAtom);
     return <input value={name} onChange={(e) => setName(e.target.value)} />;
   }
   export function ComponentB() {
     const [name] = useSharedState(userNamaeAtom);
     return <div>You Entered {name}</div>;
   }
   ```
3. Use it within your app elsewhere (any place where hooks don't work)
   util.js
   ```js
   import {get, set} from "statedrive";
   import {userNameAtom} from "./state.js";
   function updateName(newValue) {
     setUserNameAtom, newValue;
   }
   function getName() {
     return get(userNameAtom);
   }
   ```

And that's it, your entire app will be synced to this state and updated whenever needed.
