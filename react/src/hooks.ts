import * as factory from "../../src/_hook_factory";

export function buildReactStatedrive(data: {
  useEffect: factory.Hooks.useEffect;
  useState: factory.Hooks.useState;
  useMemo: factory.Hooks.useMemo;
  useCallback: factory.Hooks.useCallback;
}) {
  const useSharedState = /*#__PURE__*/ factory.createUseSharedState(
    data.useEffect,
    data.useState
  );

  const useSelector = /*#__PURE__*/ factory.createUseSelector(
    data.useEffect,
    data.useState,
    data.useMemo,
    data.useCallback
  );

  const useSharedStateValue =
    /*#__PURE__*/ factory.createUseSharedStateValue(useSharedState);

  const useSetSharedState =
    /*#__PURE__*/ factory.createUseSetSharedState(useSharedState);
  return {useSharedState, useSelector, useSharedStateValue, useSetSharedState};
}
