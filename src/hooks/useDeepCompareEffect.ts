import React from 'react';
import {dequal as deepEqual} from 'dequal';

function checkDeps(deps: any[]) {
  if(!deps || !deps.length){
    throw new Error(
      'useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.',
    )
  }
  if(deps.every(isPrimitive)) {
    throw new Error(
      'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
    )
  }
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}

function useDeepCompareMemoize(value) {
  const ref = React.useRef()
  if (!deepEqual(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

function useDeepCompareEffect(callback: React.EffectCallback, dependencies: any[]) {
  if(process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies)
  }
  React.useEffect(callback, useDeepCompareMemoize(dependencies))
}

export default useDeepCompareEffect
